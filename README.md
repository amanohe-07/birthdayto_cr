# 🎂 Happy Birthday, CR!

一个为 CR 打造的生日祝福网页，基于 **Vite + Vue 3**，纯原生 CSS，无第三方 UI 库。

## ✨ 功能一览

| 功能 | 说明 |
|------|------|
| 🎬 开屏动画 | 每次打开均有全屏漂浮元素+字幕，点击进入 |
| 🎵 背景音乐 | 右下角音乐按钮，点击播放/暂停 |
| 🏠 首页 | 永久倒计时（到当年或下一年 05-01，过后自动重置到下一年）+ 生日当天特殊状态 |
| 🎊 彩蛋 | 点击首页标题中的 **CR** 字样弹出彩蛋弹窗 |
| ✨ 心愿清单 | 添加/勾选/删除心愿，localStorage 持久化 |
| 🎂 戳一戳 | 点击蛋糕触发弹跳+粒子动画，记录投喂次数 |
| 🔮 今日运势 | 根据日期生成每日运势，生日当天固定大吉 |
| 💌 祝福页 | 留言板 + 祝福语句缓慢飘过（类弹幕） |
| 📸 照片墙 | 拼贴风，随机旋转/错位/胶带效果 |
| ✉️ 长信 | 滚动逐段显示的手写信件 |
| 🌙 深浅色 | 全站 CSS 变量深浅色切换 |

## 🚀 快速开始

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

## 🖼️ 如何替换照片

将 12 张照片命名为 `01.jpg` 到 `12.jpg`，放入以下目录：

```
src/assets/photos/01.jpg
src/assets/photos/02.jpg
...
src/assets/photos/12.jpg
```

- 支持 `.jpg` / `.png` / `.webp` 等格式（修改 `PhotosView.vue` 中的扩展名即可）
- 照片比例建议 **3:4**（竖向），横向照片也可正常显示（object-fit: cover）
- 未放置照片时会显示马卡龙渐变色占位块

## 🎵 如何替换背景音乐

将背景音乐文件放入：

```
src/assets/audio/bg.mp3
```

- 格式建议 **MP3**，文件大小建议 5MB 以内
- 当前为占位空文件，替换后刷新页面即可生效
- 音乐会在用户首次交互（点击进入）后自动开始播放

## 📁 项目结构

```
src/
├── assets/
│   ├── audio/bg.mp3          # 背景音乐（替换此文件）
│   ├── photos/01~12.jpg      # 照片墙图片（替换这些文件）
│   └── styles/design.css     # 全局设计系统（颜色/字体/动效）
├── components/
│   ├── SplashScreen.vue      # 开屏动画
│   ├── NavBar.vue            # 导航栏
│   ├── MusicPlayer.vue       # 音乐播放器
│   ├── EasterEggModal.vue    # 彩蛋弹窗
│   ├── WishList.vue          # 心愿清单
│   ├── CakeInteraction.vue   # 蛋糕互动
│   └── FortuneSign.vue       # 今日运势签
├── views/
│   ├── HomeView.vue          # 首页
│   ├── WishesView.vue        # 祝福页
│   ├── PhotosView.vue        # 照片墙
│   └── LetterView.vue        # 长信
└── router/index.js           # 路由配置
```

## 🎨 个性化修改

- **修改文字内容**：直接编辑各 `.vue` 文件中的文案
- **修改颜色主题**：编辑 `src/assets/styles/design.css` 中的 CSS 变量
- **修改生日日期**：在 `HomeView.vue` 和 `FortuneSign.vue` 中搜索 `05` 和 `01`
- **修改祝福语**：编辑 `WishesView.vue` 中的 `wishTexts` 数组
- **修改运势描述**：编辑 `FortuneSign.vue` 中的 `descs` 数组
