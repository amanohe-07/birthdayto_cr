import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 往往以子路径形式托管：https://<user>.github.io/<repo>/
  // 使用相对 base 可避免写死 repo 名，适用于任意子路径部署。
  base: '/birthdayto_cr/',
  plugins: [vue()],
})
