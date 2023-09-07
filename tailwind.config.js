/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./node_modules/flowbite/**/*.{js,ts}"
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        'dark': '#252525',
        'darken': '#0A0909',
        'orange': '#ED7A3C',
        'light': '#E2E2E9',
      },
      gridTemplateColumns: {
        'auto-grid':'repeat(auto-fit, minmax(300px,1fr))',
    }
    }
  },
  plugins: [require('flowbite/plugin'), require('flowbite-typography'),],
}

