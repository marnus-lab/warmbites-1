import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      // --- 新增：代理配置开始 ---
      proxy: {
        '/coze-api': {
          target: 'https://api.coze.cn', // Coze 的真实地址
          changeOrigin: true,            // 允许跨域
          rewrite: (path) => path.replace(/^\/coze-api/, ''), // 去掉前端请求路径中的 /coze-api
        }
      }
      // --- 新增：代理配置结束 ---
    },
    plugins: [react()],
    define: {
      // 如果你不再使用 Gemini，这部分其实可以删掉，但保留着也不影响 Coze 的运行
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
