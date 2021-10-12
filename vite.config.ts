import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import envCompatible from 'vite-plugin-env-compatible';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [react(), tsconfigPaths(), envCompatible()]
});
