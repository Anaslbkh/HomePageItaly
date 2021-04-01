module.exports = {
  theme: {
    screens: {
      sm: '770px',
      md: '990px',
      lg: '1190px',
      xl: '1190px',
      '2xl': '1190px',
    },
    container: {
      padding: '25px',
    },
    extend: {
      colors: {
        primary: {
          500: '#f6682f',
          600: '#f2500f',
          700: '#e84a0a',
          800: '#9f3207'
        },
        blue: {
          300: '#23b0fd',
          500: '#0983f0',
          700: '#397fb8',
          900: '#091f2f'
        },
        gray: {
          200: '#f3f3f3',
          300: '#eee',
          500: '#d2d2d2',
          600: '#848f96',
          700: '#828282'
        }
      },
      transformOrigin: {
        navTop: '10% 10%',
        navBottom: '10% 90%',
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
    ],
    options: {
      safelist: {
        standard: [
          // (responsive) margin and padding utils
          /[p|m][t|r|b|l|x|y]?-([0-9]+(\.[0-9])?|px|auto)$/,
          // font size utilities
          /^text-([0-9]?[xsgl].?$|base)$/,
          // sizing utilities
          '/[h|w]-/',
        ],
      }
    }
  }
}
