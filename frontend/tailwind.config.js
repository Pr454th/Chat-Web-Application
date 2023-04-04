/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#1a202c",
        "primary-dark": "#0a0c10",
        secondary: "#4a5568",
        "secondary-dark": "#2d3748",
      },
    },
  },
  plugins: [],
};
