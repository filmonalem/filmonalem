/** @type {import('tailwindcss').Config} */
const FormKitVariants = require('@formkit/themes/tailwindcss')
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/tailwind-theme.js"
  ],
  theme: {
    extend: {
      textOpacity: ['dark']
    },
    // darkMode: 'class',
  },
  plugins: [FormKitVariants,
    require('@tailwindcss/forms'),
  
  ],
}

