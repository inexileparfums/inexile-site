'use client'
import { useEffect, useRef } from 'react'

export default function DitherBackground() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let t = 0

    const resize = () => {
      canvas.width = Math.ceil(window.innerWidth / 3)
      canvas.height = Math.ceil(window.innerHeight / 3)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouse = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }
    window.addEventListener('mousemove', onMouse)

    const noise = (x, y, t) => {
      const s = Math.sin(x * 0.8 + t * 0.3) * Math.cos(y * 0.6 - t * 0.2)
      const s2 = Math.sin(x * 1.6 - t * 0.15) * Math.sin(y * 1.2 + t * 0.25)
      const s3 = Math.cos(x * 0.4 + y * 0.5 + t * 0.1)
      return (s + s2 * 0.5 + s3 * 0.25) / 1.75
    }

    const LEVELS = 5
    const render = () => {
      t += 0.015
      const w = canvas.width
      const h = canvas.height
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const imageData = ctx.createImageData(w, h)
      const data = imageData.data

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const nx = x / w
          const ny = y / h

          // Mouse ripple
          const dx = nx - mx
          const dy = ny - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          const ripple = Math.sin(dist * 18 - t * 3) * 0.06 * Math.max(0, 1 - dist * 3)

          let n = noise(nx * 5, ny * 5, t) + ripple
          n = (n + 1) / 2 // 0..1

          // Ordered dither matrix 4x4
          const bayer = [
            [ 0, 8, 2,10],
            [12, 4,14, 6],
            [ 3,11, 1, 9],
            [15, 7,13, 5],
          ]
          const bx = x % 4
          const by = y % 4
          const threshold = bayer[by][bx] / 16

          const quantized = Math.floor(n * LEVELS + threshold) / LEVELS
          const clamped = Math.max(0, Math.min(1, quantized))

          // Map to near-black palette — base ~#0A0A0A, max ~#1A1A1C
          const base = 10
          const range = 16
          const val = Math.round(base + clamped * range)

          const idx = (y * w + x) * 4
          data[idx] = val
          data[idx + 1] = val
          data[idx + 2] = Math.round(val * 1.05)
          data[idx + 3] = 255
        }
      }

      ctx.putImageData(imageData, 0, 0)
      animRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        imageRendering: 'pixelated',
      }}
    />
  )
}
