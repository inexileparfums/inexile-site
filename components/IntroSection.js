'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function IntroSection() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.div
        animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : -10 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 50,
          backgroundColor: '#0A0A0A',
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
          width={120}
          height={40}
          style={{ objectFit: 'contain', opacity: 0.85 }}
        />
      </motion.div>

      <section
        className="relative flex items-center justify-center"
        style={{ height: '100svh', minHeight: '600px' }}
      >
        <motion.div
          animate={{ opacity: scrolled ? 0 : 1, scale: scrolled ? 0.92 : 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/logo.png"
            alt="IN EXILE"
            width={1200}
            height={400}
            priority
            style={{ objectFit: 'contain', width: '75vw', maxWidth: '900px', height: 'auto' }}
          />
        </motion.div>
      </section>
    </>
  )
}
```

**`components/SignupSection.js`** — find this line and delete it:
```
borderTop: '1px solid #1E1D1B',
```

**`components/AboutSection.js`** — find this line and delete it:
```
borderTop: '1px solid #1E1D1B',
