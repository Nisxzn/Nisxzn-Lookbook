'use client'

import { useRef, useEffect } from 'react'
import { useMediaQuery } from '@/lib/hooks'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DESIGN_TOKENS } from '@/lib/config/designTokens'
import { Pill } from '@/lib/ui/Pill'
import { SectionShell } from '@/lib/ui/SectionShell'

gsap.registerPlugin(ScrollTrigger)

const { typography, colors, fonts, spacing, motion } = DESIGN_TOKENS

const navLinks = [
  { label: 'HOME', href: '#top' },
  { label: 'ABOUT ME', href: '#about' },
  { label: 'WORK', href: '#work' },
]

const socialLinks = [
  { label: 'INSTAGRAM', href: 'https://www.instagram.com/nisxzn/', external: false, aria: 'Nithish on Instagram' },
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/nithishparameswaran/', external: true, aria: 'Nithish on LinkedIn' },
  { label: 'GITHUB', href: 'https://github.com/nisxzn', external: true, aria: 'Nithish on GitHub' },
  { label: 'LEETCODE', href: 'https://leetcode.com/u/nithishparameswaran', external: true, aria: 'Nithish on LeetCode' },
]

const labelStyle = {
  fontFamily: fonts.label,
  fontSize: typography.labelSmall.fontSize,
  fontWeight: typography.labelSmall.fontWeight,
  letterSpacing: typography.labelSmall.letterSpacing,
  textTransform: 'uppercase',
  color: colors.textSecondary,
} as const

function FooterLink({
  href,
  children,
  style,
  target,
  rel,
  ariaLabel,
}: {
  href: string
  children: React.ReactNode
  style?: React.CSSProperties
  target?: string
  rel?: string
  ariaLabel?: string
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      style={{
        // inline-flex + minHeight gives a 44px touch target (was inline-block,
        // ~35px tall — under the mobile tap-target guideline).
        display: 'inline-flex',
        alignItems: 'center',
        minHeight: '44px',
        paddingBottom: spacing.smallGap,
        borderBottom: `1px solid ${colors.text}`,
        color: colors.text,
        textDecoration: 'none',
        transition: `opacity ${motion.base} ${motion.easeStandard}, transform ${motion.base} ${motion.easeStandard}`,
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '0.6'
        e.currentTarget.style.transform = 'translateX(6px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '1'
        e.currentTarget.style.transform = 'none'
      }}
    >
      {children}
    </a>
  )
}

const navLinkStyle = {
  fontFamily: fonts.label,
  fontSize: typography.label.fontSize,
  fontWeight: typography.label.fontWeight,
  letterSpacing: typography.label.letterSpacing,
  textTransform: 'uppercase',
} as const

const contactLinkStyle = {
  fontFamily: fonts.display,
  fontSize: typography.footerEmail.fontSize,
  fontWeight: typography.footerEmail.fontWeight,
  lineHeight: typography.footerEmail.lineHeight,
} as const

export function Connect() {
  const isMobile = useMediaQuery('(max-width: 1024px)')
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const finePrintRef = useRef<HTMLDivElement>(null)
  const wordmarkRef = useRef<HTMLHeadingElement>(null)

  // Connect block reveals: left rises, right follows, fine print last.
  // NITHISH wordmark slides down from the top + fades, scrubbed to scroll,
  // while its sticky wrapper keeps it pinned as the page settles.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const reveal = (el: HTMLElement | null, delay: number) => {
        if (!el) return
        gsap.set(el, { opacity: 0, y: 60 })
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1.6,
          delay,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none reverse' },
        })
      }
      reveal(leftRef.current, 0)
      reveal(rightRef.current, 0.15)
      reveal(finePrintRef.current, 0.3)

      // NITHISH — per-letter wave + fadeInDown, same as the Hero "About Me".
      if (wordmarkRef.current) {
        gsap.set(wordmarkRef.current.querySelectorAll('span'), { opacity: 0, y: -80 })
        gsap.to(wordmarkRef.current.querySelectorAll('span'), {
          opacity: 1,
          y: 0,
          ease: 'power3.out',
          duration: 1.8,
          stagger: 0.16,
          scrollTrigger: {
            trigger: wordmarkRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <SectionShell as="footer" id="connect" isMobile={isMobile} background={colors.background}>
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '40px' : spacing.xxlargeGap,
            borderBottom: `1px solid ${colors.borderAlt}`,
            paddingBottom: spacing.largeGap,
          }}
        >
          {/* Left — heading + nav */}
          <div ref={leftRef} style={{ flex: 1 }}>
            <div style={{ marginBottom: spacing.mediumGap }}>
              <Pill>Available for work</Pill>
            </div>
            <h2
              style={{
                fontFamily: fonts.display,
                fontSize: typography.footerHeading.fontSize,
                fontWeight: typography.footerHeading.fontWeight,
                lineHeight: typography.footerHeading.lineHeight,
                color: colors.text,
                margin: `0 0 ${spacing.mediumGap}`,
              }}
            >
              Let&apos;s Connect
            </h2>
            <p
              style={{
                fontFamily: fonts.body,
                fontSize: typography.projectDescription.fontSize,
                lineHeight: typography.projectDescription.lineHeight,
                color: colors.textSecondary,
                maxWidth: '380px',
                margin: `0 0 ${spacing.largeGap}`,
              }}
            >
              I build intelligent systems and creative digital experiences.
            </p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: spacing.mediumGap, alignItems: 'flex-start' }}>
              {navLinks.map((link) => (
                <FooterLink key={link.label} href={link.href} style={navLinkStyle}>
                  {link.label}
                </FooterLink>
              ))}
            </nav>
          </div>

          {/* Right — contact */}
          <div ref={rightRef} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: spacing.largeGap }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.tinyGap, alignItems: 'flex-start' }}>
              <span style={labelStyle}>Email</span>
              <FooterLink href="mailto:nithishparameswaran2005@gmail.com" style={contactLinkStyle}>
                nithishparameswaran2005@gmail.com
              </FooterLink>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.tinyGap, alignItems: 'flex-start' }}>
              <span style={labelStyle}>Phone</span>
              <FooterLink href="tel:+919843043429" style={contactLinkStyle}>
                +91 98430-43429
              </FooterLink>
            </div>

            <div
              style={{
                border: `1px solid ${colors.borderAlt}`,
                padding: spacing.mediumGap,
                display: 'flex',
                flexDirection: 'column',
                gap: spacing.mediumGap,
              }}
            >
              <span style={labelStyle}>Follow</span>
              <div style={{ display: 'flex', gap: spacing.largeGap, flexWrap: 'wrap' }}>
                {socialLinks.map((link) => (
                  <FooterLink
                    key={link.label}
                    href={link.href}
                    style={navLinkStyle}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    ariaLabel={link.aria}
                  >
                    {link.label}
                  </FooterLink>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer fine print */}
        <div
          ref={finePrintRef}
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '12px' : undefined,
            justifyContent: 'space-between',
            paddingTop: spacing.mediumGap,
            fontFamily: fonts.mono,
            fontSize: typography.labelSmall.fontSize,
            color: colors.textMuted,
          }}
        >
          <span>© 2026</span>
          <span>Based in Coimbatore</span>
          <span>Designed &amp; crafted by Nithish Parameswaran</span>
          <a
            href="#top"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              minHeight: '44px',
              color: 'inherit',
              textDecoration: 'none',
              transition: `opacity ${motion.base} ${motion.easeStandard}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.6'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1'
            }}
          >
            Back to top ↑
          </a>
        </div>
      </SectionShell>

      {/* Giant footer wordmark — per-letter wave + fadeInDown on scroll, same as "About Me". */}
      <div style={{ overflow: 'hidden', background: colors.background, padding: `${spacing.mediumGap} 0` }}>
        <h2
          ref={wordmarkRef}
          style={{
            fontFamily: fonts.heroDisplay,
            fontSize: 'clamp(64px, 22vw, 300px)',
            fontWeight: 900,
            lineHeight: 0.8,
            letterSpacing: '-4px',
            textAlign: 'center',
            color: colors.text,
            margin: -20,
            willChange: 'transform, opacity',
          }}
        >
          {'NITHISH'.split('').map((char, i) => (
            <span key={i} style={{ display: 'inline-block' }}>{char}</span>
          ))}
          <span className="sr-only"> Nithish Parameswaran</span>
        </h2>
      </div>
    </>
  )
}
