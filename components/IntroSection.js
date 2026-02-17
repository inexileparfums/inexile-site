'use client'
import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'

export default function IntroSection() {
  const controls = useAnimation()
  const [logoMoved, setLogoMoved] = useState(false)

  useEffect(() => {
    const timer = setTimeout(async () => {
      await controls.start({
        y: -80,
        scale: 0.18,
        opacity: 0.88,
        transition: {
          duration: 1.6,
          ease: [0.76, 0, 0.24, 1],
        },
      })
      setLogoMoved(true)
    }, 1800)
    return () => clearTimeout(timer)
  }, [controls])

  return (
    <>
      {/* Fixed logo bar after animation — full-width background prevents text bleed-through */}
      {logoMoved && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 50,
            backgroundColor: '#0A0A0A',
            borderBottom: '1px solid #1A1918',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '16px 0',
            pointerEvents: 'none',
          }}
        >
          <Image
            src="/logo.png"
            alt="IN EXILE"
            width={100}
            height={50}
            style={{ objectFit: 'contain', opacity: 0.85 }}
          />
        </motion.div>
      )}

      {/* Intro screen */}
      <section className="relative flex items-center justify-center" style={{ height: '100svh', minHeight: '600px' }}>
        {!logoMoved && (
          <motion.div
            animate={controls}
            initial={{ opacity: 1, scale: 1, y: 0 }}
            style={{ transformOrigin: 'center center' }}
          >
            <Image
              src="/logo.png"
              alt="IN EXILE"
              width={700}
              height={350}
              priority
              style={{ objectFit: 'contain', width: '75vw', maxWidth: '700px', height: 'auto' }}
            />
          </motion.div>
        )}
      </section>
    </>
  )
}
