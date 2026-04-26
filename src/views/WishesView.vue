<template>
  <main class="wishes" @click="resumeAll">
    <div class="wishes__strips-container" aria-hidden="true">
      <div
        v-for="strip in strips"
        :key="strip.id"
        class="wishes__strip"
        :class="{ 'wishes__strip--paused': strip.paused }"
        :style="strip.style"
        @click.stop="toggleStrip(strip)"
      >
        {{ strip.text }}
      </div>
    </div>

    <div class="wishes__board-wrap" ref="boardRef">
      <div class="wishes__board glass card reveal-hidden" :class="{ 'reveal-visible': boardVisible }">
        <h2 class="wishes__board-title">💌 祝福留言板</h2>
        <ul class="wishes__board-list">
          <li v-for="(w, i) in wishes" :key="i" class="wishes__board-item" :style="{ animationDelay: `${i * 0.08}s` }">
            <span class="wishes__board-dot">💗</span>
            {{ w }}
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const boardRef = ref(null)
const boardVisible = ref(false)

const wishTexts = [
  'CR 生日快乐！愿你永远被温柔相待 💕',
  '愿你的每一天都像今天一样美好 🌸',
  '你是这世界上独一无二的存在 ✨',
  '愿所有快乐都与你不期而遇 🌈',
  '生日快乐，愿你笑口常开 😊',
  '岁岁平安，年年有今日 🎂',
  '愿你的世界永远温暖明亮 ☀️',
  '你值得所有最好的东西 ��',
  '愿你健康快乐，万事顺遂 🍀',
  '你的笑容是世上最美的礼物 🌺',
  '愿你的梦想一一实现 🌟',
  '每一个今天都是最好的你 💫',
  '愿风调雨顺，诸事如意 🌙',
]

const wishes = [...wishTexts]

const colors = [
  '#f7c5d0', '#d4b8e0', '#b8e0d4', '#fad4b4', '#b4d4f0', '#f8e8b0'
]

const strips = wishTexts.map((text, i) => ({
  id: i,
  text,
  paused: false,
  style: {
    top: `${(i * 7 + 5) % 85 + 5}%`,
    animationDuration: `${12 + (i % 7) * 2}s`,
    animationDelay: `-${(i * 3) % 15}s`,
    background: colors[i % colors.length],
    opacity: 0.85,
    zIndex: 1,
  },
}))

function toggleStrip(strip) {
  strip.paused = !strip.paused
}

function resumeAll() {
  strips.forEach(s => { s.paused = false })
}

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) boardVisible.value = true },
    { threshold: 0.15 }
  )
  if (boardRef.value) observer.observe(boardRef.value)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.wishes {
  min-height: calc(100vh - 60px);
  background: var(--gradient-hero);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-8) var(--space-4);
}

.wishes__strips-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.wishes__strip {
  position: absolute;
  right: -320px;
  padding: 0.4rem 1.2rem;
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  white-space: nowrap;
  box-shadow: var(--shadow-sm);
  animation: floatAcross var(--dur, 14s) linear infinite;
  cursor: pointer;
  pointer-events: all;
  transition: transform 0.3s, box-shadow 0.3s, opacity 0.3s;
  z-index: 1;
}

.wishes__strip--paused {
  animation-play-state: paused;
  transform: scale(1.08);
  box-shadow: var(--shadow-lg);
  opacity: 1 !important;
  z-index: 10;
}

.wishes__board-wrap {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 600px;
}

.wishes__board {
  padding: var(--space-8) var(--space-6);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}

.wishes__board-title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--accent);
  text-align: center;
  margin-bottom: var(--space-6);
}

.wishes__board-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.wishes__board-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  color: var(--text-primary);
  font-size: var(--font-size-base);
  line-height: 1.6;
  animation: fadeInUp 0.5s ease both;
  padding: var(--space-2) 0;
  border-bottom: 1px solid var(--border-color);
}

.wishes__board-item:last-child { border-bottom: none; }

.wishes__board-dot {
  flex-shrink: 0;
  margin-top: 2px;
}

@media (max-width: 640px) {
  .wishes__board { padding: var(--space-5) var(--space-4); }
}
</style>
