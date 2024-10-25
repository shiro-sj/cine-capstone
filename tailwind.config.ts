import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/[object Object].js"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily:{
        'formulaBold': ['FormulaCondensedBold'],
        'formulaLight': ['FormulaCondensedLight'],
        'departureMono': ['DepartureMono'],
      },

      container:{
        center:true,
      }
    },
  },
  plugins: [nextui()],
};
export default config;
