'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DESIGN_TOKENS } from '@/lib/config/designTokens'
import { useMediaQuery } from '@/lib/hooks'
import { OpeningQuote } from './OpeningQuote'
import { AboutNarrative } from './AboutNarrative'
import { Skills } from './Skills'

gsap.registerPlugin(ScrollTrigger)

const { colors } = DESIGN_TOKENS

export function Story() {
  const isMobile = useMediaQuery('(max-width: 1024px)')
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Refs for pinning and parallax
  const quoteSectionRef = useRef<HTMLDivElement>(null)
  const quoteInnerRef = useRef<HTMLDivElement>(null)
  
  const aboutNarrativeSectionRef = useRef<HTMLDivElement>(null)
  const aboutNarrativeInnerRef = useRef<HTMLDivElement>(null)
  
  const skillsSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(max-width: 1024px)').matches) return

    const ctx = gsap.context(() => {
      // 1. Pin OpeningQuote so AboutNarrative wipes over it
      if (quoteSectionRef.current) {
        ScrollTrigger.create({
          trigger: quoteSectionRef.current,
          start: 'top top',
          end: 'bottom top',
          pin: true,
          pinSpacing: false, // AboutNarrative will scroll right over it
        })
      }

      // Parallax OpeningQuote out as AboutNarrative scrolls in.
      // Drifts down, scales back, and fades so it recedes behind the incoming slide.
      if (quoteInnerRef.current && aboutNarrativeSectionRef.current) {
        gsap.to(quoteInnerRef.current, {
          y: '30vh',
          scale: 0.94,
          opacity: 0.35,
          ease: 'none',
          scrollTrigger: {
            trigger: aboutNarrativeSectionRef.current,
            start: 'top bottom',
            end: 'top top',
            scrub: 1,
          },
        })
      }

      // 2. Pin AboutNarrative so Skills wipes over it
      // AboutNarrative is tall, so we pin it when its BOTTOM reaches the viewport bottom
      if (aboutNarrativeSectionRef.current && skillsSectionRef.current) {
        ScrollTrigger.create({
          trigger: aboutNarrativeSectionRef.current,
          start: 'bottom bottom',
          endTrigger: skillsSectionRef.current,
          end: 'bottom bottom',
          pin: true,
          pinSpacing: false,
        })
      }

      // Parallax AboutNarrative out as Skills scrolls in — same recede treatment.
      if (aboutNarrativeInnerRef.current && skillsSectionRef.current) {
        gsap.to(aboutNarrativeInnerRef.current, {
          y: '30vh',
          scale: 0.94,
          opacity: 0.35,
          ease: 'none',
          scrollTrigger: {
            trigger: skillsSectionRef.current,
            start: 'top bottom',
            end: 'top top',
            scrub: 1,
          },
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} style={{ background: colors.darkBg, color: colors.darkText }}>
      
      {/* --- SLIDE 1: Opening Quote --- */}
      <div
        ref={quoteSectionRef}
        style={{
          height: isMobile ? 'auto' : '100vh',
          minHeight: isMobile ? '60vh' : undefined,
          padding: isMobile ? '80px 0' : undefined,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 0,
          background: colors.darkBg,
          overflow: 'hidden',
        }}
      >
        <div ref={quoteInnerRef} style={{ maxWidth: '1000px', width: '100%', padding: isMobile ? '0 24px' : '0 64px' }}>
          <OpeningQuote />
        </div>
      </div>

      {/* --- SLIDE 2: About Narrative --- */}
      <div
        ref={aboutNarrativeSectionRef}
        style={{
          position: 'relative',
          zIndex: 1,
          background: colors.darkBg,
          minHeight: '100vh',
        }}
      >
        <div 
          ref={aboutNarrativeInnerRef} 
          style={{ 
            maxWidth: '1000px',
            margin: '0 auto',
            padding: isMobile ? '64px 24px' : '120px 64px',
            background: colors.darkBg
          }}
        >
          <AboutNarrative />
        </div>
      </div>

      {/* --- SLIDE 3: Skills --- */}
      <div 
        ref={skillsSectionRef}
        style={{ 
          position: 'relative', 
          zIndex: 2, 
          background: colors.darkBg 
        }}
      >
        <Skills />
      </div>

    </section>
  )
}