const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage:{
        'hero-bg': "url('./assets/blog.jpg')",
      }
    },
  },
  plugins: [
    flowbite.plugin(),
    // require('daisyui'),
  ],
}