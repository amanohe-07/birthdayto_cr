import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(() => {
  // Vercel 默认部署在域名根路径：base 应为 '/'
  // GitHub Pages 项目页部署在子路径：base 应为 '/<repo>/'
  const isGitHubPages = process.env.DEPLOY_TARGET === 'github-pages'
  const repoName = process.env.REPO_NAME || 'birthdayto_cr'

  return {
    base: isGitHubPages ? `/${repoName}/` : '/',
    plugins: [vue()],
  }
})