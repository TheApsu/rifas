/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        danger: "#FF5F40",
        info: {
          100: "#31304D",
          200: "#161A30",
        },
      },
    },
  },
  plugins: [],
};
