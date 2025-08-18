import type { Config } from 'tailwindcss'
import { ResolvableTo, KeyValuePair, PluginAPI } from 'tailwindcss/types/config'
import tailwindForms from '@tailwindcss/forms'
import tailwindTypography from '@tailwindcss/typography'
import tailwindAspectRatio from '@tailwindcss/aspect-ratio'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import tailwindClipPath from 'tailwind-clip-path'

export default {
  variants: {
    extend: {
      backgroundColor: ['responsive', 'hover', 'focus', 'disabled'],
    },
  },
  darkMode: 'class',
  content: [
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './component/**/*.{js,ts,jsx,tsx,mdx}',
    './public/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './layout/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      clipPath: {
        close: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
        'slide-top-down': 'polygon(0 0, 100% 0, 100% 100%, 0% 100%);',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shake: {
          '0%, 100%': {
            transform: 'translateX(0)',
          },
          '10%, 30%, 50%, 70%, 90%': {
            transform: 'translateX(-10px)',
          },
          '20%, 40%, 60%, 80%': {
            transform: 'translateX(10px)',
          },
        },
        tada: {
          '0%': {
            transform: 'scale3d(1, 1, 1)',
          },
          '10%, 20%': {
            transform: 'scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)',
          },
          '30%, 50%, 70%, 90%': {
            transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
          },
          '40%, 60%, 80%': {
            transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)',
          },
          '100%': {
            transform: 'scale3d(1, 1, 1)',
          },
        },
        spin: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        floatUp: {
          '0%': {
            transform: 'translate(-0%, 0) scale(1)',
            opacity: '0.3',
          },
          '50%': { opacity: '1' },
          '100%': {
            transform: 'translate(-20%, -100%) scale(1.2)',
            opacity: '0',
          },
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
        bounce: 'bounce 1s infinite',
        float: 'float 2s ease-in-out infinite',
        shake: 'shake 0.6s ease-in-out 0.25s 1',
        rotate: 'rotate 2s linear infinite',
        floatUp: 'floatUp 5s ease-in-out infinite',
        tada: 'tada 1.5s ease-in-out 0.25s 1',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {},
      colors: {
        primary: 'rgba(var(--primary))',
        secondary: 'rgba(var(--secondary))',
        complementary: 'rgba(var(--complementary))',
        textcolor: 'rgba(var(--textcolor))',
        error: 'rgba(var(--error))',
        warning: 'rgba(var(--warning))',
        success: 'rgba(var(--success))',
        info: 'rgba(var(--info))',
        dark: 'rgba(var(--dark))',
        light: 'rgba(var(--light))',
        'footer-grey': 'rgba(var(--footer-grey))',
        'ghost-white': 'rgba(var(--ghost-white))',
        'fade-error': 'rgba(var(--fade-error))',
      },
      translate: ['group-hover', 'hover'] as unknown as ResolvableTo<KeyValuePair<string, string>>,
    },
  },
  plugins: [
    tailwindForms,
    tailwindTypography,
    tailwindAspectRatio,
    tailwindClipPath,
    function ({ addUtilities }: PluginAPI) {
      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none' /* IE and Edge */,
          'scrollbar-width': 'none' /* Firefox */,
          '&::-webkit-scrollbar': {
            display: 'none' /* Safari and Chrome */,
          },
        },
      })
    },
  ],
} satisfies Config
