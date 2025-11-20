import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'uw-red': '#c5050c',
        'uw-gray': '#282728',
        'uw-gold': '#FFC72C',
      },
    },
  },
  plugins: [],
};
export default config;

