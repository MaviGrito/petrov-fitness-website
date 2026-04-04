/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'brand-black': '#000000',
        'brand-white': '#FFFFFF',
        'brand-yellow': '#e1c340',
        'brand-blue': '#163853',
      },
      fontFamily: {
        heading: ['Montserrat', 'Bebas Neue', 'sans-serif'],
        body: ['Open Sans', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
