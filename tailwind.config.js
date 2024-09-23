/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: '2.25rem',
              fontWeight: '700',
              color: '#333',
            },
            h2: {
              fontSize: '1.875rem',
              fontWeight: '600',
              color: '#444',
            },
            // Add more customizations as needed
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};