import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // Enable source maps for debugging
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        // Other compression options
      },
      mangle: false // Disable mangling to avoid potential issues
    }
  }
});