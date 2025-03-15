import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

console.log("Test deploy");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
})
