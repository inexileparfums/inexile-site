'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function ProductSection() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const fadeIn = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transition: `opacity 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
  })

  return (
    <section
      ref={ref}
      className="relative z-10"
      style={{
        padding: 'clamp(80px, 14vh, 140px) clamp(24px, 6vw, 80px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(40px, 6vh, 64px)',
      }}
    >
      {/* Product image */}
      <div style={{
        ...fadeIn(0),
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        width: '100%',
        maxWidth: '540px',
      }}>
        <Image
          src="/farewell.png"
          alt="Farewell to Arms — IN EXILE Parfums"
          width={1080}
          height={1080}
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
      </div>

      {/* Text block */}
      <div style={{ ...fadeIn(0.3), textAlign: 'center', maxWidth: '400px' }}>

        <h2 style={{ fontSize: 'clamp(20px, 3vw, 30px)', letterSpacing: '0.16em', fontWeight: 500, color: '#E8E6E3', textTransform: 'uppercase', marginBottom: '8px' }}>
          Farewell to Arms
        </h2>

        <p style={{ fontSize: 'clamp(9px, 1vw, 11px)', letterSpacing: '0.18em', color: '#6B6866', textTransform: 'uppercase', fontWeight: 400, marginBottom: '4px' }}>
          Eau de Parfum
        </p>

        <p style={{ fontSize: 'clamp(9px, 1vw, 11px)', letterSpacing: '0.18em', color: '#6B6866', textTransform: 'uppercase', fontWeight: 400, marginBottom: '20px' }}>
          30ML / 1 FL OZ
        </p>

        <p style={{ fontSize: 'clamp(22px, 3vw, 32px)', letterSpacing: '0.08em', color: '#E8E6E3', fontWeight: 300, marginBottom: 'clamp(28px, 4vh, 48px)' }}>
          $150
        </p>

        <div style={{ borderTop: '1px solid #1E1D1B', paddingTop: 'clamp(24px, 4vh, 40px)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { label: 'Top', notes: 'Rum Vapor, Coriander, Cardamom' },
            { label: 'Heart', notes: 'Tobacco, Vanilla, Tonka Bean, Orris' },
            { label: 'Base', notes: 'Amber Woods, Benzoin, Soft Smoke, Musk' },
          ].map(({ label, notes }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <p style={{ fontSize: 'clamp(8px, 0.9vw, 10px)', letterSpacing: '0.20em', color: '#4A4846', textTransform: 'uppercase', fontWeight: 400 }}>
                {label}
              </p>
              <p style={{ fontSize: 'clamp(10px, 1.2vw, 13px)', letterSpacing: '0.10em', color: '#9A9895', textTransform: 'uppercase', fontWeight: 300 }}>
                {notes}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stripe buy button */}
      <div style={fadeIn(0.5)}>
        <stripe-buy-button
          buy-button-id="buy_btn_1TjPwCGnelqq65wAmtlYwyIK"
          publishable-key="pk_live_51Tfa1rGnelqq65wAzaOPZjkPyrS1trmRkgRR49Kh8ajbAoFKzCsgM7ZL8Hcwl1J3XdQ1UtaJADrjYwo99q6Mzw8k00SFe5ppZN"
        />
      </div>
    </section>
  )
}
