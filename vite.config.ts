import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Super-Brain-Game/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  define: {
    'process.env': process.env
  }
});
