/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],

  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      grey: "#B0B0B0",
      white: "#FFFFFF",
      sub: "#A3A3A3",
      error: "#FC3039",
      border: {
        white: "#ffffff40",
      },
      button: {
        white: "rgba(255, 255, 255, 0.5)",
      },
      overlay: "#00000082",
    },
    extend: {
      backgroundImage: {
        "signup-bg": "url('/images/signup-bg.png')",
        loading:
          "linear-gradient(0deg,rgba(97, 63, 249, 0.1) 33%,rgb(7, 29, 153) 100%)",
      },
      animation: {
        'blink': '1s blink infinite',
      }
    },
  },
  plugins: [],
};
