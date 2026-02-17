'use client'
import { useEffect, useRef } from 'react'

export default function ParallaxTexture() {
  const ref = useRef(null)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (ref.current) {
            const offset = window.scrollY * 0.03
            ref.current.style.transform = `translateY(${offset}px)`
          }
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      ref={ref}
      className="bg-texture"
      aria-hidden="true"
    />
  )
}
