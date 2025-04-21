/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  // I'VE ADDED COMPONENTS CONTENT HERE TO THE ARRAY, read below:
  // The content array tells Tailwind CSS where to look for class names in your project. Initially it's only for ./app. It says:
  // - Look inside the app folder,
  // - Check all subfolders (**/*),
  // - Include files that end with .js, .jsx, .ts, or .tsx.
  // Tailwind will only generate styles for the class names it finds in these files. If a file is not listed here, Tailwind will ignore it.

  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#030014",
        secondary: "#151312",
        light: {
          100: "#D6c6ff",
          200: "#a8b5db",
          300: "#9ca4ab",
        },
        dark: {
          100: "#221f3d",
          200: "#0f0d23",
        },
        accent: "#AB8BFF",
      },
    },
  },
  plugins: [],
};
