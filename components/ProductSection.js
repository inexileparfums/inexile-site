'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const products = [
  {
    image: '/farewell.png',
    alt: 'Farewell to Arms — IN EXILE Parfums',
    name: 'Farewell to Arms',
    type: 'Eau de Parfum',
    size: '30ML / 1 FL OZ',
    price: '$150',
    notes: [
      { label: 'Top', notes: 'Rum Vapor, Coriander, Cardamom' },
      { label: 'Heart', notes: 'Tobacco, Vanilla, Tonka Bean, Orris' },
      { label: 'Base', notes: 'Amber Woods, Benzoin, Soft Smoke, Musk' },
    ],
    buttonId: 'buy_btn_1TjPwCGnelqq65wAmtlYwyIK',
    publishableKey: 'pk_live_51Tfa1rGnelqq65wAzaOPZjkPyrS1trmRkgRR49Kh8ajbAoFKzCsgM7ZL8Hcwl1J3XdQ1UtaJADrjYwo99q6Mzw8k00SFe5ppZN',
  },
  {
    image: '/IEPLM.jpg',
    alt: 'Limoncello Musk — IN EXILE Parfums',
    name: 'Limoncello Musk',
    type: 'Eau de Parfum',
    size: '30ML / 1 FL OZ',
    price: '$150',
    notes: [
      { label: 'Top', notes: 'Calabrian Lemon, Litsea Cubeba, Lime' },
      { label: 'Heart', notes: 'Limoncello, Cream' },
      { label: 'Base', notes: 'Vanilla, Amber, Musk' },
    ],
    buttonId: 'buy_btn_1UNzI5Gnelqq65wAh4F47nkr',
    publishableKey: 'pk_live_51Tfa1rGnelqq65wAzaOPZjkPyrS1trmRkgRR49Kh8ajbAoFKzCsgM7ZL8Hcwl1J3XdQ1UtaJADrjYwo99q6Mzw8k00SFe5ppZN',
  },
]

function ProductCard({ product, visible, delay }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'clamp(24px, 4vh, 40px)',
      flex: '1 1 300px',
      maxWidth: '500px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    }}>
      {/* Image */}
      <div style={{ width: '100%' }}>
        <Image
          src={product.image}
          alt={product.alt}
          width={1080}
          height={1080}
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
      </div>

      {/* Text */}
      <div style={{ textAlign: 'center', width: '100%' }}>
        <h2 style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', letterSpacing: '0.16em', fontWeight: 500, color: '#E8E6E3', textTransform: 'uppercase', marginBottom: '8px' }}>
          {product.name}
        </h2>
        <p style={{ fontSize: 'clamp(9px, 1vw, 11px)', letterSpacing: '0.18em', color: '#6B6866', textTransform: 'uppercase', fontWeight: 400, marginBottom: '4px' }}>
          {product.type}
        </p>
        <p style={{ fontSize: 'clamp(9px, 1vw, 11px)', letterSpacing: '0.18em', color: '#6B6866', textTransform: 'uppercase', fontWeight: 400, marginBottom: '16px' }}>
          {product.size}
        </p>
        <p style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', letterSpacing: '0.08em', color: '#E8E6E3', fontWeight: 300, marginBottom: 'clamp(20px, 3vh, 36px)' }}>
          {product.price}
        </p>

        <div style={{ borderTop: '1px solid #1E1D1B', paddingTop: 'clamp(20px, 3vh, 32px)', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: 'clamp(24px, 4vh, 40px)' }}>
          {product.notes.map(({ label, notes }) => (
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

      {/* Stripe button */}
      <stripe-buy-button
        buy-button-id={product.buttonId}
        publishable-key={product.publishableKey}
      />
    </div>
  )
}

export default function ProductSection() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="relative z-10"
      style={{
        padding: 'clamp(80px, 14vh, 140px) clamp(24px, 6vw, 80px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(60px, 10vh, 100px)',
      }}
    >
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 'clamp(40px, 6vw, 80px)',
        width: '100%',
        maxWidth: '1100px',
      }}>
        {products.map((product, i) => (
          <ProductCard
            key={product.name}
            product={product}
            visible={visible}
            delay={i * 0.15}
          />
        ))}
      </div>
    </section>
  )
}
