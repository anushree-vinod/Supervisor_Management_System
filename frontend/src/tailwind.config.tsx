import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import flowbite from "flowbite/plugin";

const config: Config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [forms, flowbite], // Use imported plugins instead of require()
};

export default config;
