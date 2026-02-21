/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ROOTSTORY Herbal Color Palette
        herb: {
          50: '#E7F6E0',   // leaf white
          100: '#D4F1C4',
          200: '#B8E6A3',
          300: '#9CDB82',
          400: '#80D061',
          500: '#32B768',  // primary herb green
          600: '#2A9D56',
          700: '#228344',
          800: '#1A6932',
          900: '#124F20',
        },
        mint: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4CC47A',  // mint accent
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        earth: {
          50: '#F6EFC2',   // earth cream
          100: '#F2E8A8',
          200: '#EDE18E',
          300: '#E8DA74',
          400: '#E3D35A',
          500: '#DECC40',
          600: '#C2B636',
          700: '#A6A02C',
          800: '#8A8A22',
          900: '#6E7418',
        },
        amber: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FFC857',  // certification amber
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        blockchain: {
          50: '#F8F5FF',
          100: '#F0E8FF',
          200: '#E0C3FC',  // pastel blockchain
          300: '#D1A8FF',
          400: '#C28DFF',
          500: '#B372FF',
          600: '#A457FF',
          700: '#953CFF',
          800: '#8621FF',
          900: '#7706FF',
        },
        sand: {
          50: '#FEFDFB',
          100: '#FDF9F3',
          200: '#FBF3E7',
          300: '#F9EDDB',
          400: '#F7E7CF',
          500: '#F5E1C3',
          600: '#DDCAB0',
          700: '#C5B39D',
          800: '#AD9C8A',
          900: '#958577',
        },
        'herbal-green': '#32B768',
        'neutral-warm': '#F5F5F4',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Nunito', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'drift': 'drift 8s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'leaf-float': 'leafFloat 10s ease-in-out infinite',
        'blockchain-pulse': 'blockchainPulse 3s ease-in-out infinite',
        'ripple': 'ripple 0.6s ease-out',
        'shimmer-badge': 'shimmerBadge 2s ease-in-out infinite',
        'glow-soft': 'glowSoft 3s ease-in-out infinite alternate',
        'organic-drift': 'organicDrift 12s ease-in-out infinite',
        'text-shimmer': 'textShimmer 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateX(0px) translateY(0px)' },
          '25%': { transform: 'translateX(5px) translateY(-5px)' },
          '50%': { transform: 'translateX(-3px) translateY(-8px)' },
          '75%': { transform: 'translateX(-5px) translateY(-3px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(50, 183, 104, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(50, 183, 104, 0.6)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        leafFloat: {
          '0%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-15px) rotate(5deg)' },
          '50%': { transform: 'translateY(-10px) rotate(-3deg)' },
          '75%': { transform: 'translateY(-20px) rotate(2deg)' },
          '100%': { transform: 'translateY(0px) rotate(0deg)' },
        },
        blockchainPulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        shimmerBadge: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glowSoft: {
          '0%': { boxShadow: '0 0 20px rgba(50, 183, 104, 0.2)' },
          '100%': { boxShadow: '0 0 40px rgba(50, 183, 104, 0.4)' },
        },
        organicDrift: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(20px, -10px) rotate(1deg)' },
          '50%': { transform: 'translate(-10px, -20px) rotate(-1deg)' },
          '75%': { transform: 'translate(-20px, 10px) rotate(0.5deg)' },
        },
        textShimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backgroundImage: {
        'gradient-herbal': 'linear-gradient(135deg, #E7F6E0 0%, #4CC47A 50%, #F6EFC2 100%)',
        'gradient-mint': 'linear-gradient(135deg, #F0FDF4 0%, #4CC47A 100%)',
        'gradient-earth': 'linear-gradient(135deg, #F6EFC2 0%, #FFC857 100%)',
        'gradient-blockchain': 'linear-gradient(135deg, #E0C3FC 0%, #B372FF 100%)',
        'gradient-hero': 'radial-gradient(circle at 30% 40%, #32B768 0%, #E7F6E0 60%, #FFD580 100%)',
        'gradient-hero-overlay': 'linear-gradient(135deg, rgba(231,246,224,0.8) 0%, rgba(76,196,122,0.3) 30%, rgba(246,239,194,0.6) 70%, rgba(255,213,128,0.4) 100%)',
        'gradient-card': 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
        'gradient-glass': 'rgba(255,255,255,0.7)',
        'gradient-section': 'radial-gradient(ellipse at top, rgba(231,246,224,0.4) 0%, rgba(255,255,255,0.1) 50%, rgba(246,239,194,0.3) 100%)',
        'gradient-organic': 'radial-gradient(ellipse at 20% 80%, rgba(50,183,104,0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(255,213,128,0.1) 0%, transparent 50%)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
