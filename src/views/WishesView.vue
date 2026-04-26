<template>
  <main class="wishes" @click="resumeAll">
    <!-- Floating wish strips -->
    <div class="wishes__strips-container" aria-hidden="false">
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
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const boardRef = ref(null)
const boardVisible = ref(false)

const wishTexts = [
  '生日快乐啊！祝你每天都开开心的没有烦恼 💕',
  '一路繁花，自在生长 🌸',
  '你是这世界上独一无二的存在 ✨',
  '愿所有快乐都与你不期而遇 🌈',
  '愿平安喜乐，万事顺意 😊',
  '岁岁平安，年年有今日 🎂',
  '愿你的世界永远温暖明亮 ☀️',
  '保持热爱，奔赴山海 💎',
  '愿你健康快乐，万事顺遂 🍀',
  '你的笑容是世上最美的礼物 🌺',
  '愿你的梦想一一实现 🌟',
  '每一个今天都是最好的你 💫',
  '祝你吃嘛嘛香，健康快乐 🌙',
  '怎么吃都不胖，永远轻松 🧁',
  '我也是狗嘴里吐不出象牙，凑不出来了 😂',
]

const colors = [
  '#f7c5d0', '#d4b8e0', '#b8e0d4', '#fad4b4', '#b4d4f0', '#f8e8b0'
]

const strips = wishTexts.map((text, i) => ({
  id: i,
  text,
  paused: false,
  style: {
    top: `${(i * 7 + 5) % 85 + 5}%`,
    animationDuration: `${14 + (i % 7) * 2}s`,
    animationDelay: `-${(i * 3.2) % 16}s`,
    background: colors[i % colors.length],
    opacity: 0.88,
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
  right: -340px;
  padding: 0.4rem 1.2rem;
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  white-space: nowrap;
  box-shadow: var(--shadow-sm);
  animation: floatAcross var(--dur, 16s) linear infinite;
  cursor: pointer;
  pointer-events: all;
  transition: transform 0.3s, box-shadow 0.3s, opacity 0.3s;
  z-index: 1;
}

.wishes__strip--paused {
  animation-play-state: paused;
  transform: scale(1.12) !important;
  box-shadow: var(--shadow-lg);
  opacity: 1 !important;
  z-index: 20;
}

.wishes__board-wrap {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 560px;
}

.wishes__board {
  padding: var(--space-10) var(--space-8);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  text-align: center;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
}

.wishes__board-title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--accent);
}

.wishes__board-hint {
  font-size: var(--font-size-sm);
  color: var(--text-muted);
  letter-spacing: 0.03em;
}

@media (max-width: 640px) {
  .wishes__board { padding: var(--space-8) var(--space-5); min-height: 180px; }
}

/* 深色模式 - 祝福条背景适配 */
[data-theme="dark"] .wishes__strip {
  /* 将原有的亮色背景覆盖为半透明深色，保留原有模糊质感 */
  background: rgba(40, 28, 50, 0.75) !important;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(212, 136, 156, 0.3);
  color: #f0dce8; /* 确保文字明亮 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

[data-theme="dark"] .wishes__strip--paused {
  background: rgba(60, 40, 70, 0.9) !important;
  backdrop-filter: blur(12px);
  border-color: var(--accent);
}

/* 动画定义（同上） */
@keyframes floatAcross {
  0% {
    right: -340px;
    transform: translateX(0);
  }
  100% {
    right: 110%;
    transform: translateX(0);
  }
}
</style>