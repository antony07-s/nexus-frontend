/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#191919",
          soft: "#232323",
          panel: "#262624",
        },
        brass: {
          DEFAULT: "#b3894a",
          light: "#d8b578",
          dark: "#8a6631",
        },
        ivory: "#f3f0e8",
        mute: "#9c9891",
        signal: "#5fb8a3", // IT/tech accent, used sparingly against brass
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
