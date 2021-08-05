const plugin = require('tailwindcss/plugin')

module.exports = {
    theme: {
        screens: {
            sm: '770px',
            md: '990px',
            lg: '1190px',
            xl: '1190px',
            '2xl': '1190px'
        },
        container: {
            padding: '25px'
        },
        extend: {
            fontSize: {
                md: '.9rem',
                lg: '1.25rem',
                xl: ['1.25rem', '1.2'],
                '2xl': ['1.625rem', '1.2'],
                '3xl': ['1.875rem', '1.2']
            },
            transitionProperty: {
                'bg-ease': 'background .3s ease'
            },
            spacing: {
                '7/10': '70%',
                8.5: '2.125rem',
                12: '3.125rem',
                24: '6.25rem',
                26: '6.5rem'
            },
            colors: {
                primary: {
                    500: '#f6682f',
                    600: '#f2500f',
                    700: '#e84a0a',
                    800: '#9f3207'
                },
                blue: {
                    100: '#e4f5ff',
                    300: '#23b0fd',
                    500: '#0983f0',
                    550: '#0876d7',
                    700: '#397fb8',
                    750: '#23527c',
                    900: '#091f2f'
                },
                gray: {
                    200: '#f3f3f3',
                    300: '#eee',
                    500: '#d2d2d2',
                    600: '#848f96',
                    700: '#828282',
                    800: '#555'
                }
            },
            lineHeight: {
                11: '2.5rem',
                12: '3rem',
                13: '3.5rem'
            },
            transformOrigin: {
                navTop: '10% 10%',
                navBottom: '10% 90%'
            },
            width: {
                1000: '1000px'
            }
        },
        fontFamily: {
            sans: ['"Roboto"', 'sans-serif'],
            heading: ['"Bree Serif"', 'serif']
        },
        boxShadow: {
            dropdown: '0 6px 12px rgb(0 0 0 / 18%)',
            button: 'inset 0 -2px 0 0 rgba(0, 0, 0, 0.2)',
            buttonhover: 'inset 0 -2px 0 0 #828282',
            input: 'inset 0 3px 0 0 hsla(0,0%,82.4%,.4)'
        }
    },
    variants: {
        extend: {
            borderRadius: ['first']
        }
    },
    plugins: [
        plugin(function({ addBase, addComponents, theme }) {
            addBase({
                table: { lineHeight: theme('lineHeight.loose') },
                a: { color: theme('colors.blue.700') }
            })

            addComponents({
                '.breadcrumb': {
                    lineHeight: theme('lineHeight.loose')
                },
                'h1, h2, h3, h4, h5, h6': {
                    marginBottom: '10px'
                },
                'a:hover': {
                    color: theme('colors.blue.750'),
                    textDecoration: 'underline'
                }
            })
        })
    ],
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
        ],
        options: {
            safelist: [
                // font-size
                'font-heading',
                'text-2xl',
                'text-base',
                'text-lg',

                'md:text-3xl',
                'md:text-2xl',
                'md:text-xl',

                // sizing
                'w-full',

                'lg:float-left',
                'lg:w-1/12',
                'lg:w-3/12',
                'lg:w-5/12',
                'lg:w-6/12',
                'lg:w-7/12',
                'lg:w-9/12',
                'lg:w-11/12',
                'md:w-10/12',
                'md:w-2/12',
                'md:w-4/12',
                'md:w-5/12',
                'md:w-6/12',
                'md:w-7/12',
                'md:w-8/12',
                'md:w-12/12',
                'md:w-full',
                'sm:w-1/2',
                'sm:w-10/12',

                // margin/padding
                '-mx-6',
                'mb-6',
                'mr-2',
                'mx-auto',
                'mx-6',

                'md:mb-12',
                'md:mx-auto',
                'sm:mx-auto',

                'p-3',
                'pb-3.5',
                'pt-2',
                'pt-6',
                'px-3.5',
                'px-6',
                'px-10',
                'py-12',
                'pt-12',
                'pb-12',
                'pl-8',

                'list-decimal',
                'list-disc',

                'md:pt-12',
                'md:py-24',
                'md:pt-24',
                'md:pb-24',
                'lg:px-0',

                // (responsive) design
                'flex',
                'flex-wrap',

                'md:float-left',

                'md:block',

                // other
                'focus:bg-primary-700',
                'hover:bg-primary-600',
                'hover:no-underline',
                'hover:text-white',
                'Inline-block',
                'rounded',
                'shadow-button',
                'text-white',
            ]
        }
    }
}