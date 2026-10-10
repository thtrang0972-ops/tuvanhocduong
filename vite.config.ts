import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Cấu hình tối giản thuần Vite giúp tương thích 100% với môi trường Vercel mà không bị lỗi kiểu dữ liệu
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
  }
});
