/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        reaction: "travel 2s ease-in-out 1 forwards",
      },
      keyframes: {
        travel: {
          "0%": {
            transform: "translate(0, -50px)",
            rotate: "var(--starting-angle)",
            scale: "0",
            opacity: "0",
          },
          "5%": {
            scale: "0.1",
            opacity: "0.2",
          },
          "40%": {
            opacity: "1",
            scale: "0.3",
          },
          "60%": {
            opacity: "1",
          },
          "100%": {
            transform: "translate(0, -80px)",
            scale: "1.5",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};
