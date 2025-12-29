
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // 强制替换 process.env 为字符串，防止浏览器端访问 process 报错
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild'
  }
});
