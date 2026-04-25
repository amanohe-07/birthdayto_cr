# 🎂 Happy Birthday, CR!

A pure-frontend Vue 3 birthday celebration website — immersive, animated, and made with 💕

## ✨ Features

| Feature | Details |
|---|---|
| **5 Pages** | Home, Wishes, Photos (collage), Letter, Easter Egg |
| **Countdown Timer** | Auto-counts down to next May 1st each year (永久倒计时) |
| **Dark / Light Mode** | Soft night macaron dark theme, persisted to `localStorage` |
| **Scroll Reveal** | Cards & sections fade-up as you scroll |
| **Floating Particles** | Colorful birthday confetti in the background |
| **Mouse Glow** | Subtle radial glow follows your cursor (desktop only) |
| **Page Transitions** | Smooth fade + scale between routes |
| **Easter Egg B** | Click the 🎂 button 5 times to trigger a confetti explosion |
| **Easter Egg D** | Time Capsule — write & save messages via `localStorage` |
| **Collage Photos** | 12 local photos displayed in a playful collage layout |
| **Responsive** | Mobile-first, works on phone / tablet / desktop |

## 🛠 Tech Stack

- **Vue 3** (Composition API, `<script setup>`)
- **Vue Router 4** (hash mode)
- **Vite 5**
- **Native CSS** (no SCSS / Tailwind / UI libraries)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build
```

Requires **Node.js ≥ 18** (tested with v24.13.0).

## 📁 Project Structure

```
src/
├── main.js                 # App entry
├── router/index.js         # Vue Router routes
├── App.vue                 # Root layout: nav, particles, mouse glow, dark mode
├── assets/
│   ├── main.css            # Global design system (CSS variables, typography, animations)
│   └── photos/             # 01.svg – 12.svg (replace with real .jpg/.png photos)
└── views/
    ├── HomeView.vue        # Hero + countdown timer
    ├── WishesView.vue      # Birthday wish card wall
    ├── PhotosView.vue      # Collage photo layout
    ├── LetterView.vue      # Long-form letter with scroll progress
    └── EasterEggView.vue   # Hidden cake trigger + time capsule
```

## 🖼 Adding Real Photos

Replace the placeholder SVG files in `src/assets/photos/` with your real images:

```
src/assets/photos/01.jpg
src/assets/photos/02.jpg
...
src/assets/photos/12.jpg
```

Then update the `photos` array in `PhotosView.vue` to use the correct extension:
```js
// Change .svg to .jpg (or .png) in the photos array
const photos = [ '01.jpg', '02.jpg', ... ]
```

## 🎨 Customizing Content

- **Text & wishes** → edit the arrays in `WishesView.vue`
- **Letter content** → edit `LetterView.vue`
- **Color scheme** → edit CSS variables in `src/assets/main.css` (`:root` and `[data-theme="dark"]`)
- **Birthday date** → change `new Date(year, 4, 1, ...)` in `HomeView.vue` (month index 4 = May)

## 📱 Design System

| Token | Value |
|---|---|
| Primary (pink) | `#FFB7C5` |
| Secondary (mint) | `#B5EAD7` |
| Accent (peach) | `#FFDAC1` |
| Purple | `#C7CEEA` |
| Border radius (card) | `16px` |
| Border radius (button) | `50px` |
| Font | Nunito (Google Fonts) |

## License

MIT — feel free to customize for your own birthday projects 🎉