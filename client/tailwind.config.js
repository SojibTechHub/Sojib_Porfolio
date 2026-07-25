export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                dark: { bg: '#0A0A0F', surface: '#111118', surface2: '#0d0d15', border: '#1e1e2e', accent: '#818CF8', text: '#F1F5F9', muted: '#64748B' },
                light: { bg: '#FAFAFA', surface: '#FFFFFF', surface2: '#F8F7FF', border: '#E2E8F0', accent: '#6366F1', text: '#0F172A', muted: '#64748B' },
                success: { DEFAULT: '#22C55E', light: '#16A34A' },
                warning: '#F59E0B',
            },
            fontFamily: {
                display: ['"Clash Display"', 'sans-serif'],
                heading: ['"Plus Jakarta Sans"', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            fontSize: {
                '2xs': '12px',
                'xs': '14px',
                'sm': '16px',
                'base': '18px',
                'lg': '20px',
                'xl': '24px',
                '2xl': '30px',
                '3xl': '36px',
                '4xl': '48px',
                '5xl': '60px',
                '6xl': '72px',
            },
            backdropBlur: { xs: '2px' },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'spin-slow': 'spin 8s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
            },
        },
    },
    plugins: [],
};
