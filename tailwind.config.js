/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        Sora: ["Sora-Regular", "sans-serif"],
        "Sora-bold": ["Sora-Bold", "sans-serif"],
        "Sora-extrabold": ["Sora-ExtraBold", "sans-serif"],
        "Sora-medium": ["Sora-Medium", "sans-serif"],
        "Sora-semibold": ["Sora-SemiBold", "sans-serif"],
        "Sora-light": ["Sora-Light", "sans-serif"],
        "Sora-extralight": ["Sora-ExtraLight", "sans-serif"],
        "Sora-thin": ["Sora-Thin", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#C67C4E",
          100: "#F9F2ED",
          200: "#EDD6C8",
        },

        black: {
          DEFAULT: "#313131",
          100: "#E3E3E3",
        },
        lightGrey: "#A2A2A2",
        offWhite: "#F9F9F9",
        danger: "#F75555",
        "alt-grey": "hsla(0, 0%, 93%, 0.35)",
      },
    },
  },
  plugins: [],
};
