import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/birthdayto_cr/', // 适配GitHub Pages子路径，正确
  plugins: [vue()],
})