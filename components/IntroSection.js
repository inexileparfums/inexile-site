'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'

export default function IntroSection() {
  const controls = useAnimation()
  const [logoMoved, setLogoMoved] = useState(false)

  useEffect(() => {
    const timer = setTimeout(async () => {
      await controls.start({
        y: -60,
        scale: 0.52,
        opacity: 0.88,
        transition: {
          duration: 1.4,
          ease: [0.76, 0, 0.24, 1],
        },
      })
      setLogoMoved(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [controls])

  return (
    <>
      {/* Fixed logo mark after animation */}
      {logoMoved && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="fixed top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          style={{ width: '80px' }}
        >
          <Image src="/logo.png" alt="IN EXILE" width={80} height={40} style={{ objectFit: 'contain', opacity: 0.85 }} />
        </motion.div>
      )}

      {/* Intro screen */}
      <section className="relative flex items-center justify-center" style={{ height: '100svh', minHeight: '600px' }}>
        {!logoMoved && (
          <motion.div
            animate={controls}
            initial={{ opacity: 1, scale: 1, y: 0 }}
            className="flex flex-col items-center gap-6"
            style={{ transformOrigin: 'center center' }}
          >
            <Image
              src="/logo.png"
              alt="IN EXILE"
              width={180}
              height={90}
              priority
              style={{ objectFit: 'contain' }}
            />
          </motion.div>
        )}
      </section>
    </>
  )
}
