import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        border: "var(--border)",
        input: "var(--input-background)",
        ring: "var(--ring)",
      },
      borderColor: {
        DEFAULT: "var(--border)",
      },
      ringColor: {
        DEFAULT: "var(--ring)",
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--foreground)',
            h1: {
              color: 'var(--primary)',
            },
            h2: {
              color: 'var(--primary)',
            },
            h3: {
              color: 'var(--primary-foreground)',
            },
            strong: {
              color: 'var(--primary-foreground)',
            },
            a: {
              color: 'var(--primary)',
              '&:hover': {
                color: 'var(--primary-hover)',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  safelist: [
    {
      pattern: /^(bg|text|border|ring)-(primary|secondary|accent|muted)(-foreground)?$/,
      variants: ['hover', 'focus', 'active', 'disabled'],
    },
    {
      pattern: /^(bg|text|border|ring)-(primary|secondary|accent|muted)\/\d+$/,
      variants: ['hover', 'focus', 'active'],
    },
  ],
};

export default config; 