
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // 注入 API_KEY
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
    // 提供基础的 process.env 对象支持
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
  },
  server: {
    hmr: {
      overlay: false // 忽略非关键性错误弹窗
    }
  }
});
