/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: "rgb(var(--border))",
        input: "rgb(var(--input))",
        ring: "rgb(var(--ring))",
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        primary: ({ opacityValue }) => opacityValue ? `rgb(var(--primary) / ${opacityValue})` : "rgb(var(--primary))",
        "primary-foreground": ({ opacityValue }) => opacityValue ? `rgb(var(--primary-foreground) / ${opacityValue})` : "rgb(var(--primary-foreground))",
        secondary: ({ opacityValue }) => opacityValue ? `rgb(var(--secondary) / ${opacityValue})` : "rgb(var(--secondary))",
        "secondary-foreground": ({ opacityValue }) => opacityValue ? `rgb(var(--secondary-foreground) / ${opacityValue})` : "rgb(var(--secondary-foreground))",
        destructive: ({ opacityValue }) => opacityValue ? `rgb(var(--destructive) / ${opacityValue})` : "rgb(var(--destructive))",
        "destructive-foreground": ({ opacityValue }) => opacityValue ? `rgb(var(--destructive-foreground) / ${opacityValue})` : "rgb(var(--destructive-foreground))",
        muted: ({ opacityValue }) => opacityValue ? `rgb(var(--muted) / ${opacityValue})` : "rgb(var(--muted))",
        "muted-foreground": ({ opacityValue }) => opacityValue ? `rgb(var(--muted-foreground) / ${opacityValue})` : "rgb(var(--muted-foreground))",
        accent: ({ opacityValue }) => opacityValue ? `rgb(var(--accent) / ${opacityValue})` : "rgb(var(--accent))",
        "accent-foreground": ({ opacityValue }) => opacityValue ? `rgb(var(--accent-foreground) / ${opacityValue})` : "rgb(var(--accent-foreground))",
        popover: ({ opacityValue }) => opacityValue ? `rgb(var(--popover) / ${opacityValue})` : "rgb(var(--popover))",
        "popover-foreground": ({ opacityValue }) => opacityValue ? `rgb(var(--popover-foreground) / ${opacityValue})` : "rgb(var(--popover-foreground))",
        card: ({ opacityValue }) => opacityValue ? `rgb(var(--card) / ${opacityValue})` : "rgb(var(--card))",
        "card-foreground": ({ opacityValue }) => opacityValue ? `rgb(var(--card-foreground) / ${opacityValue})` : "rgb(var(--card-foreground))",
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: `calc(var(--radius) - 4px)`,
      },
      fontFamily: {
        sans: ["Inter", "Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};
