import { heroui } from "@heroui/react";
import colors from "tailwindcss/colors";

export default heroui({
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
        foreground: "#F2F2F2",
      },
    },
  },
});
