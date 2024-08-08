/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "custom-sm": "2px 2px 4px rgba(0, 255, 0)",
        "custom-lg": "10px 10px 20px rgba(0, 0, 0, 0.5)",
      },
      colors: {
        primary: "#00296C",
        "primary-var": "#001536",
        "primary-var-2": "#003791",
        "primary-var-3": "#2a73e8",
        secondary: "#D0002A",
        "secondary-var": "#c70a30",
      },
      screens: {
        sm: "480px",
        md: "900px",
        lg: "1200px",
        xs: "300px",
        "md-latest": "1060px",
        "xs-popular": "458px",
        "sm-latest": "700px",
        "sm-nav": "800px",
      },

      lineClamp: {
        2: "2",
        6: "6"
      }
    },
  },
  plugins: [],
};
