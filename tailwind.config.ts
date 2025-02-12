import type { Config } from "tailwindcss"

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#333537",
        background: "#f4f4f5",
        accent: "#f4e8df",
        backgroundLight: "#fdfcfc",
      },
    },
  },
  plugins: [],
} satisfies Config
