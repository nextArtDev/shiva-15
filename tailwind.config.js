/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        farsi: ['var(--font-sans)', ...fontFamily.sans],
        farsiFarhang: ['var(--font-far)', ...fontFamily.sans],
        farsiRokh: ['var(--font-rokh)', ...fontFamily.sans],
        farsiAdad: ['var(--font-adad)', ...fontFamily.sans],
      },
      colors: {
        // background: '#1d1d1d',
        background: 'gray-900',
        transparent: 'transparent',
        'off-white': '#f7f8f8',
        'transparent-white': 'rgba(255, 255, 255, 0.08)',
        grey: '#858699',
        'grey-dark': '#222326',
        'primary-text': '#b4bcd0',
      },
      backgroundImage: {
        'primary-gradient':
          'linear-gradient(92.88deg, rgb(69, 94, 181) 9.16%, rgb(86, 67, 204) 43.89%, rgb(103, 63, 215) 64.72%)',
        'page-gradient':
          'radial-gradient(ellipse 80% 50% at 50% -20%,rgba(120,119,198,0.3), transparent)',
        'hero-gradient':
          'radial-gradient(ellipse 50% 80% at 20% 40%,rgba(93,52,221,0.1),transparent), radial-gradient(ellipse 50% 80% at 80% 50%,rgba(120,119,198,0.15),transparent)',
        'hero-glow':
          'conic-gradient(from 230.29deg at 51.63% 52.16%, rgb(36, 0, 255) 0deg, rgb(0, 135, 255) 67.5deg, rgb(108, 39, 157) 198.75deg, rgb(24, 38, 163) 251.25deg, rgb(54, 103, 196) 301.88deg, rgb(105, 30, 255) 360deg)',
        'glow-lines':
          'linear-gradient(var(--direction),#9d9bf2 0.43%,#7877c6 14.11%,rgba(120,119,198,0) 62.95%)',
        'radial-faded':
          'radial-gradient(circle at bottom center,var(--color),transparent 70%)',
        'glass-gradient':
          'linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'lines-gradient':
          // 'linear-gradient(transparent,rgb(36, 0, 255),rgb(108, 39, 157),rgb(105, 30, 255),transparent)',
          // 'linear-gradient(#24e0ff,#f0a,rgb(105, 30, 255),#e2e603)',
          'linear-gradient(to bottom, #ff0076 11%, #e2e603 46%, #590fb7 92%)',
      },
      boxShadow: {
        primary: 'rgba(80, 63, 205, 0.5) 0px 1px 40px',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        gradient: {
          to: {
            backgroundPosition: 'var(--bg-size) 0',
          },
        },
        'service-line': {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(15deg)' },
        },
        'fade-in': {
          from: { opacity: 0, transform: 'translateY(-10px)' },
          to: { opacity: 1, transform: 'none' },
        },
        'image-rotate': {
          '0%': { transform: 'rotateX(25deg)' },
          '25%': { transform: 'rotateX(25deg) scale(0.9)' },
          '60%': { transform: 'none' },
          '100%': { transform: 'none' },
        },
        'image-glow': {
          '0%': {
            opacity: 0,
            'animation-timing-function': 'cubic-bezier(0.74,0.25,0.76,1)',
          },
          '10%': {
            opacity: 1,
            'animation-timing-function': 'cubic-bezier(0.12,0.01,0.08,0.99)',
          },
          '100%': {
            opacity: 0.2,
          },
        },
        'sketch-lines': {
          '0%': { 'stroke-dashoffset': 1 },
          '50%': { 'stroke-dashoffset': 0 },
          '99%': { 'stroke-dashoffset': 0 },
          '100%': { visiblity: 'hidden' },
        },
        'glow-line-horizontal': {
          '0%': { opacity: 0, transform: 'translateX(0)' },
          '5%': { opacity: 1, transform: 'translateX(0)' },
          '90%': { opacity: 1 },
          '100%': { opacity: 0, transform: 'translateX(min(60vw, 45rem))' },
        },
        'glow-line-vertical': {
          '0%': { opacity: 0, transform: 'translateY(0)' },
          '5%': { opacity: 1, transform: 'translateY(0)' },
          '90%': { opacity: 1 },
          '100%': { opacity: 0, transform: 'translateY(min(1vw, 5rem))' },
        },

        zap: {
          '0%, 9%, 11%, 100% ': {
            fill: 'transparent',
          },
          '10%': {
            fill: 'white',
          },
        },
        bounce: {
          '50%': {
            transform: 'scale(0.98)',
          },
        },
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        gradient: 'gradient 8s linear infinite',
        'spin-slow': 'spin 5s linear infinite',
        'service-line': 'service-line 15s linear infinite',
        'fade-in': 'fade-in 1000ms var(--animation-delay, 0ms) ease forwards',
        'image-rotate': 'image-rotate 2000ms ease-in-out forwards',
        'image-glow': 'image-glow 4100ms 1000ms ease-out forwards',
        'sketch-lines': 'sketch-lines 1200ms ease-out forwards',
        'glow-line-horizontal':
          'glow-line-horizontal var(--animation-duration) ease-in forwards',
        'glow-line-vertical':
          'glow-line-vertical var(--animation-duration) ease-in forwards',
        zap: 'zap 2250ms calc(var(--index) * 20ms) linear infinite',
        bounce: '240ms ease 0s 1 running bounce',
      },
    },
  },
  plugins: [],
}
