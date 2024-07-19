import { colors } from './src/public/colors';

export default {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: colors,
      screens: {
        desktop: '1280px',
      },
      fontFamily: {
        inter: ['Inter'],
        cinzel: ['Cinzel'],
        'cinzel-decorative': ['Cinzel Decorative'],
      },
      keyframes: {
        scale: {
          from: { transform: 'scale(0)' },
          to: { transform: 'scale(1)' },
        },
        'scale-x': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
        'scale-x-out': {
          from: { transform: 'scaleX(1)' },
          to: { transform: 'scaleX(0)' },
        },
        'scale-y': {
          from: { transform: 'scaleY(0)' },
          to: { transform: 'scaleY(1)' },
        },
        'slide-up': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
        'slide-down': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(100%)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'pulse-online': {
          '50%': { opacity: '70%' },
        },
      },
      animation: {
        scale: 'scale 0.3s ease-in',
        'scale-x': 'scale-x 0.3s ease-in',
        'scale-x-out': 'scale-x-out 0.3s ease-in',
        'scale-y': 'scale-y 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out forwards',
        'slide-down': 'slide-down 0.3s ease-out forwards',
        'fade-in': 'fade-in 0.3s ease-in-out',
        'pulse-online': 'pulse-online 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      typography: ({ theme }) => ({
        primary: {
          css: {
            '--tw-prose-body': theme('colors.primary[950]'),
            '--tw-prose-headings': theme('colors.primary[950]'),
            '--tw-prose-lead': theme('colors.primary[700]'),
            '--tw-prose-links': theme('colors.primary[500]'),
            '--tw-prose-bold': theme('colors.primary[900]'),
            '--tw-prose-counters': theme('colors.primary[600]'),
            '--tw-prose-bullets': theme('colors.primary[400]'),
            '--tw-prose-hr': theme('colors.primary[300]'),
            '--tw-prose-quotes': theme('colors.primary[900]'),
            '--tw-prose-quote-borders': theme('colors.primary[300]'),
            '--tw-prose-captions': theme('colors.primary[700]'),
            '--tw-prose-code': theme('colors.primary[900]'),
            '--tw-prose-pre-code': theme('colors.primary[100]'),
            '--tw-prose-pre-bg': theme('colors.primary[900]'),
            '--tw-prose-th-borders': theme('colors.primary[300]'),
            '--tw-prose-td-borders': theme('colors.primary[200]'),
            '--tw-prose-invert-body': theme('colors.primary[200]'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-lead': theme('colors.primary[300]'),
            '--tw-prose-invert-links': theme('colors.white'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.primary[400]'),
            '--tw-prose-invert-bullets': theme('colors.primary[600]'),
            '--tw-prose-invert-hr': theme('colors.primary[700]'),
            '--tw-prose-invert-quotes': theme('colors.primary[100]'),
            '--tw-prose-invert-quote-borders': theme('colors.primary[700]'),
            '--tw-prose-invert-captions': theme('colors.primary[400]'),
            '--tw-prose-invert-code': theme('colors.white'),
            '--tw-prose-invert-pre-code': theme('colors.primary[300]'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.primary[600]'),
            '--tw-prose-invert-td-borders': theme('colors.primary[700]'),
            '.ck-editor__editable.ck-content .todo-list .todo-list__label > span[contenteditable=false] > input[checked]::before':
              {
                // Checkbox CKEditor
                backgroundColor: colors.primary[900] + ' !important',
                borderColor: colors.primary[900] + ' !important',
              },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
