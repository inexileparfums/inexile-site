/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}','./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: { colors: { 'brand-bg': '#0A0A0A', 'brand-text': '#E8E6E3', 'brand-dim': '#6B6866', 'brand-line': '#1E1D1B' } } },
  plugins: [],
}
