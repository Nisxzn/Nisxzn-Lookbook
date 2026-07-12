'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const RING_SIZE = 28   // outer ring diameter (px)
const DOT_SIZE  = 6    // inner dot diameter (px)

// Spring config: ring trails with a premium, silky lag
const SPRING = { stiffness: 260, damping: 30, mass: 0.6 }

type CursorState = 'default' | 'hover' | 'click'

export function CustomCursor() {
  const rawX  = useMotionValue(-200)
  const rawY  = useMotionValue(-200)

  // Dot follows exactly — no spring on the dot so it never drifts from the pointer
  const dotX  = useMotionValue(-200)
  const dotY  = useMotionValue(-200)

  // Ring trails behind with spring physics
  const ringX = useSpring(rawX, SPRING)
  const ringY = useSpring(rawY, SPRING)

  const [state, setState]   = useState<CursorState>('default')
  const [visible, setVisible] = useState(false)
  const isTouch = useRef(false)

  useEffect(() => {
    // Bail out on touch-primary devices
    if (window.matchMedia('(hover: none)').matches) {
      isTouch.current = true
      return
    }

    const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]'

    const move = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const enter = () => setVisible(true)
    const leave = () => setVisible(false)

    const mousedown = () => setState('click')
    const mouseup   = () => {
      // Revert to hover if still over an interactive element
      const el = document.elementFromPoint(rawX.get(), rawY.get())
      setState(el?.closest(INTERACTIVE) ? 'hover' : 'default')
    }

    // Detect hover over interactive elements via delegation
    const overEl = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      setState(el.closest(INTERACTIVE) ? 'hover' : 'default')
    }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mousemove', overEl, { passive: true })
    window.addEventListener('mouseenter', enter, { passive: true })
    window.addEventListener('mouseleave', leave, { passive: true })
    window.addEventListener('mousedown', mousedown, { passive: true })
    window.addEventListener('mouseup', mouseup, { passive: true })

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousemove', overEl)
      window.removeEventListener('mouseenter', enter)
      window.removeEventListener('mouseleave', leave)
      window.removeEventListener('mousedown', mousedown)
      window.removeEventListener('mouseup', mouseup)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isTouch.current) return null

  // Derived ring scale per state
  const ringScale = state === 'click' ? 0.6 : state === 'hover' ? 1.55 : 1
  const ringOpacity = visible ? 1 : 0
  const dotOpacity  = visible ? 1 : 0

  return (
    <>
      {/* Global: hide native cursor + inject inline to avoid flash */}
      <style dangerouslySetInnerHTML={{ __html: `
        *, *::before, *::after { cursor: none !important; }
      `}} />

      {/* ── Outer ring — lags behind with spring ── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top:  0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width:  RING_SIZE,
          height: RING_SIZE,
          borderRadius: '50%',
          border: '1.5px solid #fff',
          backgroundColor: 'transparent',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 2147483647,
          opacity: ringOpacity,
          willChange: 'transform',
        }}
        animate={{ scale: ringScale }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />

      {/* ── Inner dot — no lag, pixel-perfect ── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top:  0,
          left: 0,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width:  DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: '50%',
          backgroundColor: '#fff',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 2147483647,
          opacity: dotOpacity,
          willChange: 'transform',
        }}
        animate={{ scale: state === 'click' ? 0.5 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
    </>
  )
}
