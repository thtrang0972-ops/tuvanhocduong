import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // ⬅️ Dòng này bắt buộc phải có để Vercel nhận diện đúng đường dẫn file giao diện
  build: {
    outDir: 'dist',
  },
});
