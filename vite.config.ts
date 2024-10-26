import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from '@svgr/rollup'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }]
  },
  // optimizeDeps: {
  //   include: ['@emotion/react', '@emotion/styled']
  // },
  server: {
    open: true,
    host: true, // Cho phép truy cập từ các thiết bị trong mạng LAN
    port: 5173
  }
})
