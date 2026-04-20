'use client'
import { useEffect, useRef } from 'react'

export default function DitherBackground() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl')
    if (!gl) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouse = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: 1 - e.clientY / window.innerHeight
      }
    }
    window.addEventListener('mousemove', onMouse)

    const vert = `
      attribute vec2 a_pos;
      void main() { gl_Position = vec4(a_pos, 0, 1); }
    `
    const frag = `
      precision mediump float;
      uniform vec2 u_res;
      uniform float u_time;
      uniform vec2 u_mouse;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1,0));
        float c = hash(i + vec2(0,1));
        float d = hash(i + vec2(1,1));
        return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_res;
        vec2 p = uv * 4.0;

        float n = noise(p + u_time * 0.05);
        n += 0.5 * noise(p * 2.0 + u_time * 0.08);
        n += 0.25 * noise(p * 4.0 - u_time * 0.06);
        n /= 1.75;

        // Mouse interaction
        float dist = length(uv - u_mouse);
        float ripple = sin(dist * 20.0 - u_time * 2.0) * 0.04;
        n += ripple * smoothstep(0.3, 0.0, dist);

        // Dither
        float pixelSize = 3.0;
        vec2 pixelUV = floor(gl_FragCoord.xy / pixelSize) * pixelSize;
        float dither = hash(pixelUV + u_time * 0.01);
        float levels = 4.0;
        n = floor(n * levels + dither) / levels;

        // Base color near #0A0A0A — very dark with subtle variation
        float base = 0.038;
        float val = base + n * 0.022;

        gl_FragColor = vec4(val, val, val * 1.02, 1.0);
      }
    `

    const compile = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }

    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)

    const pos = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uMouse = gl.getUniformLocation(prog, 'u_mouse')

    const render = () => {
      timeRef.current += 0.016
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, timeRef.current)
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
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
        opacity: 0.85,
      }}
    />
  )
}
