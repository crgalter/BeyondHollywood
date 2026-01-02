/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Deep Foundations
                'midnight-canvas': '#0a0a0f',
                'cinema-noir': '#12121a',
                'slate-theater': '#1a1a2e',

                // Accents
                'indie-crimson': '#e94560',
                'festival-coral': '#ff6b81',
                'arthouse-gold': '#f4a261',
                'international-teal': '#2a9d8f',
                'hidden-gem-purple': '#9d4edd',
                'lowbudget-green': '#06ffa5',
                'documentary-blue': '#118ab2',

                // Neutrals
                'silver-screen': '#f1f1f1',
                'subtitle-gray': '#b0b0b0',
                'review-gray': '#6c757d',

                // Legacy support
                primary: '#1a1a2e',
                secondary: '#16213e',
                accent: '#e94560',
                highlight: '#0f3460',
                background: '#0d0d0d',
            },
            fontFamily: {
                display: ['Playfair Display', 'Georgia', 'serif'],
                heading: ['Montserrat', 'Helvetica Neue', 'sans-serif'],
                body: ['Inter', 'Open Sans', 'sans-serif'],
                sans: ['Inter', 'Open Sans', 'sans-serif'],
            },
            fontSize: {
                'hero': 'clamp(3rem, 8vw, 6rem)',
                'display': 'clamp(2.5rem, 6vw, 4.5rem)',
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
            },
            boxShadow: {
                'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
                'md': '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
                'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
                'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.6)',
                '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
                'glow-accent': '0 0 20px rgba(233, 69, 96, 0.3), 0 0 40px rgba(233, 69, 96, 0.15)',
                'glow-gold': '0 0 20px rgba(244, 162, 97, 0.4)',
            },
            backdropBlur: {
                'glass': '12px',
            },
            transitionTimingFunction: {
                'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
                'cinematic': 'cubic-bezier(0.65, 0, 0.35, 1)',
            },
            animation: {
                'shimmer': 'shimmer 2s infinite linear',
                'fade-in': 'fadeIn 0.5s ease-out',
            },
            keyframes: {
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
}
