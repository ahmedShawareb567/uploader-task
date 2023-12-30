/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "16px",
        screens: {
          lg: "1200px",
        },
      },

      fontSize: {
        xxs: ["10px", "12px"],
      },
      fontFamily: {
        base: ["Roboto", "sans-serif"],
      },
      screens: {
        xs: "400px",
      },
      colors: {},
      borderRadius: {
        xl: "22px",
        "2xl": "28px",
      },
    },
  },
  plugins: [],
};
