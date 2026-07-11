'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { DESIGN_TOKENS } from '@/lib/config/designTokens'

const { images } = DESIGN_TOKENS

// Canvas is client-only — load without SSR
const InfiniteGallery = dynamic(
  () => import('./InfiniteGallery').then((m) => m.InfiniteGallery),
  { ssr: false }
)

const skillImages = [
  // Languages (Indices 0-3)
  { src: '/images/java.png' },
  { src: '/images/python.png' },
  { src: '/images/cpp.png' },
  { src: '/images/javascript.png' },
  // Frameworks (Indices 4-5)
  { src: '/images/tailwind.png' },
  { src: '/images/react.png' },
  // Database (Indices 6-8)
  { src: '/images/postgres.png' },
  { src: '/images/mongodb.png' },
  // Version control
  { src: '/images/git.png' },
];

// Titles crossfade as you scroll; each centers on the given image index.
const galleryTitles = ['Languages', 'Frameworks', 'Database', 'Version Control'];
const galleryTitleStops = [0, 4, 6, 8];

// vh of scroll per image. Taller = slower, more cinematic pass (camera travel
// is fixed; this just spreads it over more scroll). Mobile gets more so each
// image lingers. Breakpoint matches the rest of the site (1024px).
const VH_PER_IMAGE_DESKTOP = 68
const VH_PER_IMAGE_MOBILE = 90
const MOBILE_BREAKPOINT = 1024

export function Skills() {
  const [vhPerImage, setVhPerImage] = useState(VH_PER_IMAGE_DESKTOP)

  useEffect(() => {
    const handleResize = () => {
      setVhPerImage(
        window.innerWidth < MOBILE_BREAKPOINT
          ? VH_PER_IMAGE_MOBILE
          : VH_PER_IMAGE_DESKTOP
      )
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <InfiniteGallery
      images={skillImages}
      headings={galleryTitles}
      headingStops={galleryTitleStops}
      zSpacing={6}
      vhPerImage={vhPerImage}
    />
  )
}
