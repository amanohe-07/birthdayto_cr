<template>
  <div class="page-wrapper">
    <!-- Floating decorations -->
    <div class="deco deco-1" aria-hidden="true">🌸</div>
    <div class="deco deco-2" aria-hidden="true">⭐</div>
    <div class="deco deco-3" aria-hidden="true">💕</div>
    <div class="deco deco-4" aria-hidden="true">🎈</div>
    <div class="deco deco-5" aria-hidden="true">✨</div>

    <section class="hero">
      <div class="hero-content">
        <div class="badge animate-fade-up">为特殊的日子庆祝!</div>

        <h1 class="hero-title animate-fade-up delay-100">
          Happy Birthday,<br>
          <span
            class="gradient-text hero-cr"
            @click="easterEggOpen = true"
            title="点我有惊喜！"
          >CR!</span>
          <span class="cake-icon">🎂</span>
        </h1>

        <p class="hero-subtitle animate-fade-up delay-200">
          又一年的精彩——为你和所有美好的未来干杯 🥳
        </p>

        <!-- Countdown -->
        <div class="countdown-wrapper animate-fade-up delay-300">
          <p class="countdown-label">{{ countdownMessage }}</p>
          <div v-if="isBirthday" class="birthday-today">
            <span class="birthday-today-text">🎂 Happy Birthday, CR! 🎂</span>
            <span class="birthday-today-badge">今天就是你的生日！</span>
          </div>
          <div v-else class="countdown-grid">
            <div class="countdown-unit">
              <span class="countdown-value">{{ pad(timeLeft.days) }}</span>
              <span class="countdown-name">天</span>
            </div>
            <div class="countdown-sep">:</div>
            <div class="countdown-unit">
              <span class="countdown-value">{{ pad(timeLeft.hours) }}</span>
              <span class="countdown-name">时</span>
            </div>
            <div class="countdown-sep">:</div>
            <div class="countdown-unit">
              <span class="countdown-value">{{ pad(timeLeft.minutes) }}</span>
              <span class="countdown-name">分</span>
            </div>
            <div class="countdown-sep">:</div>
            <div class="countdown-unit">
              <span class="countdown-value">{{ pad(timeLeft.seconds) }}</span>
              <span class="countdown-name">秒</span>
            </div>
          </div>
        </div>

        <!-- Main nav buttons -->
        <div class="hero-buttons animate-fade-up delay-400">
          <RouterLink to="/wishes" class="btn btn-primary">祝福</RouterLink>
          <RouterLink to="/photos" class="btn btn-secondary">照片墙</RouterLink>
          <RouterLink to="/letter" class="btn btn-outline">信</RouterLink>
        </div>

        <!-- Feature entry capsules -->
        <!-- 剩下三个改成和上面三个一样的样式 -->
        <div class="hero-buttons animate-fade-up delay-400">
          <RouterLink to="/wishlist" class="btn btn-primary2">心愿</RouterLink>
          <RouterLink to="/cake" class="btn btn-secondary2">戳蛋糕</RouterLink>
          <RouterLink to="/fortune" class="btn btn-outline2">运势</RouterLink>
        </div>
      </div>
    </section>

    <EasterEggModal v-model="easterEggOpen" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import EasterEggModal from '../components/EasterEggModal.vue'

const easterEggOpen = ref(false)
const timeLeft = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })
let timer = null

function getNextMayFirst() {
  const now = new Date()
  const year = now.getFullYear()
  const target = new Date(year, 4, 1, 0, 0, 0)
  if (target <= now) target.setFullYear(year + 1)
  return target
}

function updateCountdown() {
  const now = new Date()
  const target = getNextMayFirst()
  const diff = target - now
  if (diff <= 0) {
    timeLeft.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return
  }
  timeLeft.value = {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  }
}

const isBirthday = computed(() => {
  const now = new Date()
  return now.getMonth() + 1 === 5 && now.getDate() === 1
})

const countdownMessage = computed(() => {
  if (isBirthday.value) return '🎉 今天就是你的生日！'
  const target = getNextMayFirst()
  return `⏳ 距离 ${target.getFullYear()} 年 5 月 1 日`
})

function pad(n) {
  return String(n).padStart(2, '0')
}

onMounted(() => {
  updateCountdown()
  timer = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.page-wrapper {
  min-height: calc(100vh - 60px);
  background: var(--gradient-hero);
  position: relative;
  overflow: hidden;
}

.deco {
  position: absolute;
  font-size: 2.5rem;
  pointer-events: none;
  animation: floatSlow 4s ease-in-out infinite;
  user-select: none;
  z-index: 0;
}
.deco-1 { top: 12%; left: 8%; animation-delay: 0s; }
.deco-2 { top: 18%; right: 10%; animation-delay: 0.5s; font-size: 2rem; }
.deco-3 { bottom: 30%; left: 6%; animation-delay: 1s; font-size: 2rem; }
.deco-4 { bottom: 35%; right: 8%; animation-delay: 1.5s; }
.deco-5 { top: 55%; right: 4%; animation-delay: 0.7s; font-size: 1.5rem; }

.hero {
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.25rem 4rem;
}

.hero-content {
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.badge {
  display: inline-block;
  background: var(--bg-card);
  color: var(--accent);
  font-size: var(--font-size-sm);
  font-weight: 700;
  padding: 0.35rem 1.1rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  margin-bottom: 1rem;
  letter-spacing: 0.03em;
}

.hero-title {
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 900;
  line-height: 1.1;
  margin: 0.75rem 0;
  color: var(--text-primary);
}

.gradient-text {
  background: linear-gradient(90deg, var(--color-pink-deep), var(--color-lavender-deep), var(--color-pink-deep));
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s linear infinite;
}

.hero-cr {
  cursor: pointer;
  display: inline-block;
  transition: transform var(--transition-base);
}
.hero-cr:hover { transform: scale(1.06); }

.cake-icon {
  display: inline-block;
  animation: floatSlow 2s ease-in-out infinite;
  margin-left: 0.25rem;
  -webkit-text-fill-color: initial;
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.15rem);
  color: var(--text-secondary);
  margin-bottom: 1.75rem;
  line-height: 1.7;
}

.countdown-wrapper {
  background: var(--bg-card);
  border-radius: var(--radius-md);
  padding: 1.25rem 2rem;
  margin: 0 auto 1.5rem;
  display: inline-block;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(6px);
}

.countdown-label {
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 0.875rem;
  letter-spacing: 0.03em;
}

.countdown-grid {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.countdown-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 58px;
}

.countdown-value {
  font-size: clamp(2rem, 5vw, 2.8rem);
  font-weight: 900;
  color: var(--accent);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.countdown-name {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 0.2rem;
}

.countdown-sep {
  font-size: 2rem;
  font-weight: 900;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.birthday-today {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.birthday-today-text {
  font-size: clamp(1.4rem, 4vw, 2rem);
  font-weight: 800;
  color: var(--accent);
  animation: glow 2s ease-in-out infinite;
}

.birthday-today-badge {
  background: var(--accent);
  color: #fff;
  padding: 0.25rem 1rem;
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.65rem 1.5rem;
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: 700;
  font-family: var(--font-family);
  text-decoration: none;
  transition: all var(--transition-base);
  cursor: pointer;
  border: none;
  white-space: nowrap;
}

.btn-primary {
  background: var(--accent);
  color: #fff;
  box-shadow: var(--shadow-sm);
}
.btn-primary:hover {
  opacity: 0.88;
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  background: var(--color-lavender);
  color: var(--text-primary);
  box-shadow: var(--shadow-sm);
}
.btn-secondary:hover {
  opacity: 0.88;
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-outline {
  background: transparent;
  color: var(--text-secondary);
  border: 1.5px solid var(--border-color);
}
.btn-outline:hover {
  background: var(--bg-card);
  color: var(--accent);
  transform: translateY(-2px);
}

.btn-primary2 {
  background: var(--color-lavender-deep);
  color: #fff;
  box-shadow: var(--shadow-sm);
}
.btn-primary2:hover {
  opacity: 0.88;
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-secondary2 {
  background: var(--color-pink-deep);
  color: var(--text-primary);
  box-shadow: var(--shadow-sm);
}
.btn-secondary2:hover {
  opacity: 0.88;
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-outline2 {
  background: transparent;
  color: var(--text-secondary);
  border: 1.5px solid var(--border-color);
}
.btn-outline2:hover {
  background: var(--bg-card);
  color: var(--accent);
  transform: translateY(-2px);
}

.feature-capsules {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;
  margin-top: 0.5rem;
}

.capsule-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 1.1rem;
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: 600;
  font-family: var(--font-family);
  text-decoration: none;
  color: var(--text-secondary);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
  white-space: nowrap;
  backdrop-filter: blur(6px);
}

.capsule-btn:hover {
  color: var(--accent);
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.capsule-icon { font-size: 0.95rem; }

.animate-fade-up { animation: fadeInUp 0.6s ease both; }
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-400 { animation-delay: 0.4s; }
.delay-500 { animation-delay: 0.5s; }

@media (max-width: 480px) {
  .hero { padding: 2rem 1rem 3rem; }
  .countdown-wrapper { padding: 1rem 1.25rem; }
  .countdown-unit { min-width: 48px; }
  .feature-capsules { gap: 0.5rem; }
}
</style>
