import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['react-icons/md', 'react-icons/fa', 'react-icons/cg'],
  },
  server: {
    watch: {
      usePolling: false,
      ignored: ['**/node_modules/**'],
    },
  },
  plugins: [tailwindcss(), tanstackRouter({ target: 'react', autoCodeSplitting: true }), react()],
});
