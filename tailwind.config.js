const defaultColors = require("tailwindcss/colors");
const COLORS = {
  primary: {
    100: "#A6BB8D",
    200: "#61876E",
    300: "#3C6255",
    400: "#EAE7B1",
  },
  greyscale: {
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#F1F5F9",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
  }
}
function genarateColorTDS() {
  var colors = [];
  for (const colorName in COLORS) {
    for (const colorOpacity in COLORS[colorName]) {
      colors.push(`${colorName}-${colorOpacity}`);
    }
  }
  if (COLORTAIWIND.length > 0) {
    for (let index = 0; index < COLORTAIWIND.length; index++) {
      const colorName = COLORTAIWIND[index];
      if (defaultColors[colorName])
        for (const colorOpacity in defaultColors[colorName]) {
          colors.push(`${colorName}-${colorOpacity}`);
        }
    }
  }
  var prefixs = [
    "ring",
    "bg",
    "border",
    "text",
    "focus:bg",
    "focus:border",
    "hover:border",
    "hover:bg",
    "disabled:bg",
    "disabled:border",
    "dark:bg",
    "dark:text",
    "dark:border",
    "dark:group-hover:text",
    "dark:hover:bg",
    "dark:hover:text",
  ];

  var result = [];
  for (let index = 0; index < prefixs.length; index++) {
    const prefix = prefixs[index];
    for (let colorIndex = 0; colorIndex < colors.length; colorIndex++) {
      const color = colors[colorIndex];
      result.push(prefix + "-" + color);
    }
  }

  return result;
}

module.exports = {
  content: ["./src/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  jit: true,
  darkMode: "media",
  theme: {
    screens: {
      'mobile': '414px',
      // => @media (min-width: 414px) { ... }
      'tablet': '834px',
      // => @media (min-width: 834px) { ... }
      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }
      'desktop': '1920px',
      // => @media (min-width: 1920px) { ... }
    },
    extend: {
      colors: {
        ...COLORS
      },
      boxShadow: {
        'sideBar': '10px 10px 50px 0px rgba(100, 116, 139, 0.04)',
      },
      ringColor: {
        ...COLORS,
      },
      borderColor: {
        ...COLORS,
      },
      placeholderColor: {
        ...COLORS,
      },
      fontSize: {
        'caption-1': ['12px', '16px'],
        'caption-2': ['14px', '20px'],

        'body-1': ['14px', '18px'],
        'body-2': ['16px', '22px'],
        'body-3': ['16px', '24px'],

        'button': ['16px', '20px'],

        'title-1': ['14px', '18px'],
        'title-2': ['16px', '22px'],
        'title-3': ['20px', '26px'],
        'title-4': ['20px', '26px'],
        'title-5': ['24px', '40px'],
        'title-6': ['32px', '40px'],

        'heading-1': ['42px', '48px'],
        'heading-3': ['54px', '64px'],
        'heading-4': ['64px', '48px'],
        'heading-5': ['42px', '48px'],
        'heading-2': ['48px', '40px'],
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif']
      },
      backgroundImage: {
        'intro': "url('/src/img/bg_intro.png')",
      },
      animation: {
        'header': 'spin 300ms ease-in-out infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};