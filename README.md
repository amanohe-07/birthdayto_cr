# 🎂 Happy Birthday, CR!

一个给 CR 的生日祝福小站，基于 **Vite + Vue 3 + Vue Router**，样式使用项目内的 CSS 设计系统（无第三方 UI 库）。

## ✨ 页面与功能

| 页面 / 功能 | 路由 | 说明 |
|---|---|---|
| 🎬 开屏 | - | 初次进入展示全屏漂浮元素，点击进入站点 |
| 🏠 首页 | `/` | 倒计时到每年 **5 月 1 日**；当天进入会显示生日状态；点击标题里的 **CR** 触发彩蛋弹窗 |
| 💌 祝福条 | `/wishes` | 祝福语以“漂浮条”方式横向飘过；点击单条可暂停/放大，再点空白恢复 |
| 📸 照片墙 | `/photos` | 拍立得拼贴风；支持在页面内添加/删除照片；自动保存到 localStorage |
| ✉️ 信 | `/letter` | 长信阅读页（带滚动进度条） |
| ✨ 心愿单 | `/wishlist` | 添加/勾选/删除心愿，localStorage 持久化 |
| 🎂 戳蛋糕 | `/cake` | 点击蛋糕触发抖动+粒子效果，并记录点击次数（localStorage） |
| 🔮 今日运势 | `/fortune` | 翻牌式今日运势；按日期生成固定结果；**5 月 1 日**当天固定“大吉” |
| 🌙 深浅色切换 | - | 顶部按钮切换主题，偏好写入 localStorage |
| 🎵 背景音乐 | - | 右下角按钮播放/暂停；用户首次交互后尝试自动播放（浏览器可能拦截） |

> 路由使用 Hash 模式（`createWebHashHistory`），更适合纯静态部署。

## 🚀 开发与构建

环境建议：Node.js 18+。

安装依赖并启动开发服务器：

```bash
npm install
npm run dev
```

生产构建与本地预览：

```bash
npm run build
npm run preview
```

构建产物在 `dist/`，可直接用任意静态服务器托管。

## 🖼️ 照片替换 / 添加

本项目支持两种方式：

### 方式 A：替换默认内置照片（推荐做成“开箱即用”的照片墙）

默认会从 `src/assets/photos/` 读取 12 张图片，文件名为：

```
01.png ~ 12.png
```

你可以直接替换这些文件内容（保留文件名），刷新即可生效。

### 方式 B：页面内上传照片（会写入 localStorage）

在照片墙底部点击“添加照片”即可选择本地图片；添加/删除会自动保存到 localStorage。

注意：localStorage 容量有限（并且图片会以 base64 形式存储），如果图片很大可能会存不下或变卡，建议上传前先压缩。

## 🎵 替换背景音乐

将音乐文件放到：

```
src/assets/audio/bg.mp3
```

音乐会在用户点击进入站点后尝试自动播放；如果浏览器策略阻止自动播放，用户仍可手动点右下角按钮播放。

## 🧩 个性化修改入口

- 修改站点标题：`index.html` 的 `<title>`
- 修改开屏文案：`src/components/SplashScreen.vue`
- 修改首页倒计时目标日（当前为 5/1）：`src/views/HomeView.vue`
- 修改彩蛋内容：`src/components/EasterEggModal.vue`
- 修改祝福语条内容：`src/views/WishesView.vue` 里的 `wishTexts`
- 修改信件内容：`src/views/LetterView.vue`
- 修改心愿单上限/存储 key：`src/views/WishlistView.vue`
- 修改蛋糕互动与计数：`src/views/CakeView.vue`
- 修改运势等级/文案/生日当天逻辑：`src/views/FortuneView.vue`
- 修改主题色/间距/圆角/动画：`src/assets/styles/design.css`

## 💾 本地持久化（localStorage）

项目使用 localStorage 做轻量持久化，常见 key：

- `cr_theme`：深浅色主题
- `cr_wishlist`：心愿单
- `cr_cake_count`：戳蛋糕次数
- `cr_photos`：照片墙（包含用户上传的图片数据）

如果想“恢复初始状态”，清空站点的 localStorage 即可。

## 📁 目录结构（核心部分）

```
src/
	assets/
		audio/bg.mp3
		photos/01.png ~ 12.png
		styles/design.css
		svg/tarot.svg
		ttf/handwriting.ttf
	components/
		SplashScreen.vue
		NavBar.vue
		MusicPlayer.vue
		EasterEggModal.vue
	views/
		HomeView.vue
		WishesView.vue
		PhotosView.vue
		LetterView.vue
		WishlistView.vue
		CakeView.vue
		FortuneView.vue
	router/index.js
	main.js
	App.vue
```

## 📦 部署提示

- 路由是 Hash 模式，部署到任意静态托管（GitHub Pages / Netlify / Vercel / 服务器 Nginx）一般无需额外后端重写规则。
- 如果部署到“子路径”（例如 GitHub Pages 的 `https://<user>.github.io/<repo>/`），需要保证 Vite 的 `base` 设置正确；本项目已在 `vite.config.js` 配置为相对路径（`base: './'`），可直接用于 GitHub Pages。

### GitHub Pages（推荐：GitHub Actions 自动部署）

仓库已包含工作流：`.github/workflows/deploy-pages.yml`，会在每次 push 到 `main` 时自动构建并部署到 GitHub Pages。

1. 推送代码到 GitHub 的 `main` 分支
2. 在 GitHub 仓库页面进入 `Settings` → `Pages`
3. `Build and deployment` 里把 `Source` 设置为 `GitHub Actions`
4. 等待 `Actions` 里名为 “Deploy to GitHub Pages” 的 workflow 跑完

部署完成后地址通常是：`https://<user>.github.io/<repo>/`

### Vercel

本项目路由使用 Hash 模式（`createWebHashHistory`），部署到 Vercel 不需要额外的重写规则。

1. 登录 Vercel → `Add New...` → `Project`
2. 选择该 GitHub 仓库并导入
3. Framework 选择 `Vite`（一般会自动识别）
4. Build Command：`npm run build`
5. Output Directory：`dist`

然后点击 Deploy 即可。
