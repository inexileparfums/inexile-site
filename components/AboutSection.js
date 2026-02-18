'use client'
import { useEffect, useRef } from 'react'

const paragraphs = [
  'Ian Chambers is the founder and perfumer of IN EXILE. Born in Santa Monica and based in Los Angeles, his work is shaped by a lifelong connection to music, independence, and the instinct to create something lasting.',
  'Before perfumery, he worked in music marketing and artist management, helping build and support artists driven by their own vision. That experience instilled a lasting respect for authorship — and the understanding that the most meaningful work is created outside expectation.',
  'He is entirely self-taught. His approach is deliberate and uncompromising, guided by intuition, discipline, and an obsession with material itself. Each composition is developed independently, without adherence to convention, trend, or external influence.',
  'IN EXILE was born from the belief that identity is forged through creation. Perfumery became both craft and language... a way to give form to something invisible, yet permanent.',
  'Every fragrance is composed as an object of presence. A reflection of endurance. A declaration of self-definition.',
]

export default function AboutSection() {
  const refs = useRef([])
  const labelRef = useRef(null)

  useEffect(() => {
    const els = [labelRef.current, ...refs.current].filter(Boolean)
    const observers = els.map((el, i) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => el.classList.add('revealed'), i * 120)
            }
          })
        },
        { threshold: 0.25, rootMargin: '0px 0px -40px 0px' }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <section
      className="relative z-10"
      style={{
        padding: 'clamp(80px, 14vh, 160px) clamp(24px, 6vw, 80px) clamp(100px, 18vh, 200px)',
      }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <p
          ref={labelRef}
          className="manifesto-line"
          style={{
            fontSize: 'clamp(9px, 1vw, 11px)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#6B6866',
            marginBottom: 'clamp(32px, 5vh, 56px)',
            fontWeight: 400,
          }}
        >
          About the Perfumer
        </p>

        {paragraphs.map((p, i) => (
          <p
            key={i}
            ref={(el) => (refs.current[i] = el)}
            className="manifesto-line"
            style={{
              fontSize: 'clamp(13px, 1.5vw, 16px)',
              letterSpacing: '0.03em',
              lineHeight: 1.85,
              color: '#B0AEAB',
              fontWeight: 300,
              marginBottom: 'clamp(20px, 3.5vh, 36px)',
            }}
          >
            {p}
          </p>
        ))}

        <div
          style={{
            marginTop: 'clamp(48px, 8vh, 96px)',
            paddingTop: 'clamp(24px, 4vh, 40px)',
            borderTop: '1px solid #1A1918',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(9px, 1vw, 10px)',
              letterSpacing: '0.14em',
              color: '#3A3836',
              textTransform: 'uppercase',
            }}
          >
            © {new Date().getFullYear()} In Exile Parfums — Los Angeles, California — All Rights Reserved
          </p>
        </div>
      </div>
    </section>
  )
}
