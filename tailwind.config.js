/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          btn_color: 'oklch(0.945 0.129 101.54)',
          btn_hover_color: 'oklch(82.8% 0.189 84.429)',
        },
        fontFamily: {
          sans: ["Manrope", "sans-serif"],
        },
      },
    },
    plugins: [],
  };
  