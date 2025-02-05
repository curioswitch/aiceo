import { heroui } from "@heroui/theme";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@heroui/theme/dist/components/(avatar|button|card|chip|dropdown|image|input|link|navbar|select|spacer|spinner|ripple|menu|popover|listbox|scroll-shadow).js",
  ],
  darkMode: ["class"],
  plugins: [
    heroui({
      addCommonColors: true,
      themes: {
        light: {
          colors: {
            primary: {
              ...colors.green,
              DEFAULT: "#008774",
            },
            secondary: {
              ...colors.pink,
              DEFAULT: "#EF8F7A",
            },
            background: "#FFE791",
            foreground: "#F7F7F7",
          },
        },
      },
    }),
    typography,
  ],
  theme: {
    // This app is mostly a landing page with a simple profile editor, so
    // it should be best to constrain the width to smaller sizes than
    // Tailwind's default. Some landing page recommendations mention 960px
    // so we go with it for now as the max size.
    screens: {
      sm: "640px",
      md: "748px",
      lg: "960px",
    },
  },
} satisfies Config;

export default config;
