/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./App.tsx"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        tally: {
          primary: "#785DC3",
          background: "#F7F5F3",
          groupBg: "#F0E8E2",
          groupCircles: "#E6DFD8",
          text: "#000000",
          textSecondary: "#808080",
          red: "#EAB180",
          green: "#B3E59D",
          textOnPrimary: "#C9BEE7",
        },
      },
    },
  },
  plugins: [],
};
