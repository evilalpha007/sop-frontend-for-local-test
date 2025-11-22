import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/library/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      rotate: {
        "y-180": "rotateY(180deg)",
        "y-360": "rotateY(360deg)",
      },
      fontFamily: {
        raleway: ["var(--font-raleway)"],
        roboto: ["var(--font-roboto)"],
      },
      colors: {
        theme: {
          black: "#141213",
          "off-golden": "#977858",
          "light-golden": "#C7A57A",
          "green-gray": "#9E997C",
          "brown-gray": "#764E2A",
          gray: "#616161",
          "off-white": "#ECECEC",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};

export default config;
