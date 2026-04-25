<template>
  <main class="home">
    <div class="home__bg-shapes">
      <span v-for="s in bgShapes" :key="s.id" class="home__bg-shape" :style="s.style">{{ s.char }}</span>
    </div>

    <section class="home__hero">
      <h1 class="home__heading">
        Happy Birthday,
        <span
          class="home__cr"
          @click="easterEggOpen = true"
          title="点我有惊喜！"
        >CR</span>! 🎂
      </h1>
      <p class="home__sub">2006.05.01 出生 · 与世界相遇</p>
    </section>

    <section class="home__countdown-section" :class="{ 'home__countdown--birthday': isBirthday }">
      <div v-if="isBirthday" class="home__birthday-banner">
        <div class="home__birthday-text">🎂 Happy Birthday, CR!</div>
        <span class="home__birthday-badge">今天就是你的生日！</span>
      </div>
      <div v-else class="home__countdown">
        <div class="home__countdown-box" v-for="unit in countdown" :key="unit.label">
          <span class="home__countdown-num">{{ unit.value }}</span>
          <span class="home__countdown-label">{{ unit.label }}</span>
        </div>
      </div>
    </section>

    <section class="home__cards">
      <div class="home__card card">
        <WishList />
      </div>
      <div class="home__card card">
        <CakeInteraction />
      </div>
      <div class="home__card card">
        <FortuneSign />
      </div>
    </section>

    <EasterEggModal v-model="easterEggOpen" />
  </main>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import WishList from '../components/WishList.vue'
import CakeInteraction from '../components/CakeInteraction.vue'
import FortuneSign from '../components/FortuneSign.vue'
import EasterEggModal from '../components/EasterEggModal.vue'

const easterEggOpen = ref(false)
const now = ref(new Date())
let timer = null

onMounted(() => {
  timer = setInterval(() => { now.value = new Date() }, 1000)
})
onUnmounted(() => clearInterval(timer))

const isBirthday = computed(() => {
  return now.value.getMonth() + 1 === 5 && now.value.getDate() === 1
})

const countdown = computed(() => {
  const target = new Date(now.value.getFullYear(), 4, 1)
  if (target <= now.value) target.setFullYear(now.value.getFullYear() + 1)
  const diff = target - now.value
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  return [
    { value: String(days).padStart(2, '0'), label: '天' },
    { value: String(hours).padStart(2, '0'), label: '时' },
    { value: String(minutes).padStart(2, '0'), label: '分' },
    { value: String(seconds).padStart(2, '0'), label: '秒' },
  ]
})

const chars = ['🌸', '✨', '💕', '⭐', '🦋', '💫']
const bgShapes = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  char: chars[i % chars.length],
  style: {
    left: `${(i * 11 + 5) % 90 + 5}%`,
    top: `${(i * 17 + 8) % 80 + 10}%`,
    fontSize: `${1 + (i % 3) * 0.4}rem`,
    animationDuration: `${4 + (i % 4)}s`,
    animationDelay: `${i * 0.5}s`,
    opacity: 0.2 + (i % 4) * 0.05,
  },
}))
</script>

<style scoped>
.home {
  min-height: calc(100vh - 60px);
  background: var(--gradient-hero);
  padding: var(--space-8) var(--space-4) var(--space-16);
  position: relative;
  overflow: hidden;
}

.home__bg-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.home__bg-shape {
  position: absolute;
  animation: floatSlow var(--dur, 5s) ease-in-out infinite;
}

.home__hero {
  text-align: center;
  padding: var(--space-12) var(--space-4) var(--space-8);
  animation: fadeInUp 0.7s ease;
  position: relative;
  z-index: 1;
}

.home__heading {
  font-size: clamp(var(--font-size-3xl), 7vw, var(--font-size-5xl));
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.2;
  margin-bottom: var(--space-4);
}

.home__cr {
  cursor: pointer;
  background: linear-gradient(90deg, var(--color-pink-deep), var(--color-lavender-deep), var(--color-pink-deep));
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s linear infinite;
  display: inline-block;
  transition: transform var(--transition-base);
}

.home__cr:hover {
  transform: scale(1.05);
}

.home__sub {
  color: var(--text-secondary);
  font-size: var(--font-size-lg);
  letter-spacing: 0.04em;
}

.home__countdown-section {
  display: flex;
  justify-content: center;
  margin-bottom: var(--space-10);
  position: relative;
  z-index: 1;
}

.home__countdown--birthday {
  animation: pulse 2s ease-in-out infinite;
  border-radius: var(--radius-xl);
}

.home__birthday-banner {
  text-align: center;
  padding: var(--space-6) var(--space-8);
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-md);
}

.home__birthday-text {
  font-size: clamp(var(--font-size-2xl), 5vw, var(--font-size-4xl));
  font-weight: 800;
  color: var(--accent);
  animation: glow 2s ease-in-out infinite;
}

.home__birthday-badge {
  display: inline-block;
  margin-top: var(--space-2);
  background: var(--accent);
  color: #fff;
  padding: 0.25rem 1rem;
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
}

.home__countdown {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
  justify-content: center;
}

.home__countdown-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  padding: var(--space-4) var(--space-6);
  min-width: 72px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
}

.home__countdown-num {
  font-size: clamp(var(--font-size-2xl), 5vw, var(--font-size-4xl));
  font-weight: 800;
  color: var(--accent);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.home__countdown-label {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  margin-top: 0.25rem;
}

.home__cards {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-5);
  position: relative;
  z-index: 1;
}

.home__card {
  padding: var(--space-5);
  min-height: 280px;
}

@media (max-width: 768px) {
  .home__cards { grid-template-columns: 1fr; }
  .home__card { min-height: 240px; }
}

@media (max-width: 480px) {
  .home__countdown-box { padding: var(--space-3) var(--space-4); min-width: 60px; }
}
</style>
