'use client'
import { useState } from 'react'

export default function SignupSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="join"
      className="relative z-10"
      style={{
        padding: 'clamp(80px, 14vh, 160px) clamp(24px, 6vw, 80px)',
      }}
    >
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <p
          style={{
            fontSize: 'clamp(9px, 1vw, 11px)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#6B6866',
            marginBottom: 'clamp(24px, 4vh, 40px)',
            fontWeight: 400,
          }}
        >
          In Exile Parfums — Los Angeles
        </p>

        <h2
          style={{
            fontSize: 'clamp(20px, 3.5vw, 34px)',
            letterSpacing: '0.10em',
            fontWeight: 300,
            color: '#E8E6E3',
            marginBottom: 'clamp(8px, 1.5vh, 14px)',
            textTransform: 'uppercase',
          }}
        >
          First to Know.
        </h2>

        <p
          style={{
            fontSize: 'clamp(12px, 1.4vw, 15px)',
            letterSpacing: '0.03em',
            lineHeight: 1.75,
            color: '#7A7876',
            marginBottom: 'clamp(32px, 5vh, 56px)',
            fontWeight: 300,
          }}
        >
          The first compositions are in development. Leave your email to receive notification when they are ready — nothing more.
        </p>

        {status === 'success' ? (
          <p
            style={{
              fontSize: 'clamp(11px, 1.3vw, 14px)',
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: '#9A9895',
            }}
          >
            Noted. You will hear from us.
          </p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '0' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={status === 'loading'}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid #2E2D2B',
                  padding: 'clamp(12px, 2vh, 18px) 0',
                  fontSize: 'clamp(13px, 1.5vw, 16px)',
                  letterSpacing: '0.06em',
                  color: '#E8E6E3',
                  fontFamily: 'IBM Plex Sans, sans-serif',
                  fontWeight: 300,
                  minHeight: '52px',
                }}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid #2E2D2B',
                  padding: 'clamp(12px, 2vh, 18px) 0 clamp(12px, 2vh, 18px) clamp(20px, 3vw, 40px)',
                  fontSize: 'clamp(9px, 1vw, 11px)',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: status === 'loading' ? '#4A4946' : '#E8E6E3',
                  cursor: status === 'loading' ? 'wait' : 'pointer',
                  fontFamily: 'IBM Plex Sans, sans-serif',
                  fontWeight: 400,
                  whiteSpace: 'nowrap',
                  transition: 'color 0.3s',
                }}
              >
                {status === 'loading' ? '...' : 'Submit'}
              </button>
            </div>
            {status === 'error' && (
              <p style={{ fontSize: '11px', color: '#6B6866', marginTop: '12px', letterSpacing: '0.06em' }}>
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  )
}
