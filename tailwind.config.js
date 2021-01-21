module.exports = {
    theme: {
        extend: {
            colors: {
                primary: {
                    500: '#f6682f',
                    600: '#f2500f',
                    700: '#e84a0a',
                    800: '#9f3207',
                },
                blue: {
                    500: '#0983f0',
                    700: '#397fb8',
                    900: '#091f2f',
                },
                gray: {
                    200: '#f3f3f3',
                    500: '#d2d2d2',
                    700: '#828282',
                }
            }
        },
        fontFamily: {
            'sans': ['"Roboto"', 'sans-serif'],
            'heading': ['"Bree Serif"', 'serif'],
        },
        boxShadow: {
            button: 'inset 0 -2px 0 0 rgba(0, 0, 0, 0.2)',
            input: 'inset 0 3px 0 0 hsla(0,0%,82.4%,.4)'
        }
    },
    variants: {},
    plugins: [],
    purge: {
        enabled: process.env.NODE_ENV === 'production',
        content: [
        'components/**/*.vue',
        'layouts/**/*.vue',
        'pages/**/*.vue',
        'plugins/**/*.js',
        'nuxt.config.js',
        // TypeScript
        'plugins/**/*.ts',
        'nuxt.config.ts'
        ]
    }
}