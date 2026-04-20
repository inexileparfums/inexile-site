'use client'
import { useEffect, useState, useRef, useMemo, useCallback } from 'react'

const srOnly = {
  position: 'absolute', width: '1px', height: '1px',
  padding: 0, margin: '-1px', overflow: 'hidden',
  clip: 'rect(0,0,0,0)', border: 0
}

export default function DecryptedText({
  text,
  speed = 54,
  maxIterations = 10,
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%-',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'view',
}) {
  const [displayText, setDisplayText] = useState(text)
  const [isAnimating, setIsAnimating] = useState(false)
  const [revealedIndices, setRevealedIndices] = useState(new Set())
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isDecrypted, setIsDecrypted] = useState(false)
  const containerRef = useRef(null)
  const intervalRef = useRef(null)

  const availableChars = useMemo(() => {
    return useOriginalCharsOnly
      ? Array.from(new Set(text.split(''))).filter(c => c !== ' ')
      : characters.split('')
  }, [useOriginalCharsOnly, text, characters])

  const shuffleText = useCallback((originalText, currentRevealed) => {
    return originalText.split('').map((char, i) => {
      if (char === ' ') return ' '
      if (currentRevealed.has(i)) return originalText[i]
      return availableChars[Math.floor(Math.random() * availableChars.length)]
    }).join('')
  }, [availableChars])

  const triggerDecrypt = useCallback(() => {
    setRevealedIndices(new Set())
    setDisplayText(shuffleText(text, new Set()))
    setIsDecrypted(false)
    setIsAnimating(true)
  }, [text, shuffleText])

  useEffect(() => {
    if (!isAnimating) return
    intervalRef.current = setInterval(() => {
      setRevealedIndices(prev => {
        if (prev.size < text.length) {
          const next = new Set(prev)
          next.add(prev.size)
          setDisplayText(shuffleText(text, next))
          return next
        } else {
          clearInterval(intervalRef.current)
          setIsAnimating(false)
          setIsDecrypted(true)
          setDisplayText(text)
          return prev
        }
      })
    }, speed)
    return () => clearInterval(intervalRef.current)
  }, [isAnimating, text, speed, shuffleText])

  useEffect(() => {
    if (animateOn !== 'view') return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          triggerDecrypt()
          setHasAnimated(true)
        }
      })
    }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' })
    const el = containerRef.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [animateOn, hasAnimated, triggerDecrypt])

  useEffect(() => {
    setDisplayText(shuffleText(text, new Set()))
  }, [])

  return (
    <span ref={containerRef} style={{ display: 'inline-block', whiteSpace: 'pre-wrap' }} className={parentClassName}>
      <span style={srOnly}>{text}</span>
      <span aria-hidden="true">
        {displayText.split('').map((char, i) => {
          const revealed = revealedIndices.has(i) || (!isAnimating && isDecrypted)
          return (
            <span key={i} className={revealed ? className : encryptedClassName}>
              {char}
            </span>
          )
        })}
      </span>
    </span>
  )
}
