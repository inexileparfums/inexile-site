'use client'
import { useEffect, useState } from 'react'

export default function ScrollControls() {
  const [show, setShow] = useState(false)
  const [atBottom, setAtBottom] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      setShow(scrolled > window.innerHeight * 0.5)
      setAtBottom(scrolled > maxScroll - 200)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToJoin = () => {
    document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const btnStyle = {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'IBM Plex Sans, sans-serif',
    fontSize: '10px',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: '#4A4846',
    padding: '8px 0',
    transition: 'color 0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'clamp(20px, 3vh, 36px)',
        right: 'clamp(20px, 3vw, 40px)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '6px',
        opacity: show ? 1 : 0,
        pointerEvents: show ? 'auto' : 'none',
        transition: 'opacity 0.6s',
      }}
    >
      {atBottom ? (
        <button
          onClick={scrollToTop}
          style={btnStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#9A9895')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#4A4846')}
        >
          <span style={{ fontSize: '11px' }}>↑</span> Top
        </button>
      ) : (
        <button
          onClick={scrollToJoin}
          style={btnStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#9A9895')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#4A4846')}
        >
          <span style={{ fontSize: '11px' }}>↓</span> Join the List
        </button>
      )}
    </div>
  )
}
