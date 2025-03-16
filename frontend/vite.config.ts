import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }: { mode: string }) => {
  // Load environment variables based on the current mode (development/production)
  const env = loadEnv(mode, process.cwd());

  // You can directly use `process.env` after loading the environment variables
  process.env = { ...process.env, ...env };

  return defineConfig({
    plugins: [react()],
    // Use the loaded environment variables for base path
    base: process.env.VITE_DEBUG === 'false' ? '/Supervisor_Management_System/' : '/',
  });
};