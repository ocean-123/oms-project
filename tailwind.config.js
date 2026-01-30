/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        graceBlue: "#0B5ED7",   // Primary Blue
        graceGreen: "#2DBE60"   // Accent Green
      }
    }
  },
  plugins: [],
};
