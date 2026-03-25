/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            // Calming color palette - blues and purples, avoiding jarring reds
            colors: {
                space: {
                    900: '#0a0a1a', // Deep space background
                    800: '#12122a',
                    700: '#1a1a3a',
                    600: '#22224a',
                },
                cosmic: {
                    blue: '#4F8FFF',
                    purple: '#8B5CF6',
                    indigo: '#6366F1',
                    violet: '#A78BFA',
                    cyan: '#22D3EE',
                },
                glass: {
                    light: 'rgba(255, 255, 255, 0.08)',
                    medium: 'rgba(255, 255, 255, 0.12)',
                    border: 'rgba(255, 255, 255, 0.18)',
                },
            },
            // Accessible, readable fonts
            fontFamily: {
                display: ['Outfit', 'system-ui', 'sans-serif'],
                body: ['Inter', 'system-ui', 'sans-serif'],
            },
            // Large, friendly border radius
            borderRadius: {
                xl: '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
            },
            // Smooth animations
            animation: {
                'twinkle': 'twinkle 3s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite',
            },
            keyframes: {
                twinkle: {
                    '0%, 100%': { opacity: 0.3 },
                    '50%': { opacity: 1 },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                glow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(99, 102, 241, 0.6)' },
                },
            },
            // Backdrop blur for glassmorphism
            backdropBlur: {
                xs: '2px',
                sm: '4px',
                md: '12px',
                lg: '24px',
                xl: '40px',
            },
        },
    },
    plugins: [],
};
