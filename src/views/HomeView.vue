<template>
  <div class="page-wrapper">
    <section class="hero">
      <!-- Decorations -->
      <div class="deco deco-1" aria-hidden="true">🌸</div>
      <div class="deco deco-2" aria-hidden="true">⭐</div>
      <div class="deco deco-3" aria-hidden="true">💕</div>
      <div class="deco deco-4" aria-hidden="true">🎈</div>
      <div class="deco deco-5" aria-hidden="true">✨</div>

      <div class="hero-content">
        <div class="badge animate-fade-up" style="opacity:0">🎉 It's your special day!</div>

        <h1 class="hero-title animate-fade-up delay-100" style="opacity:0">
          Happy Birthday,<br>
          <span class="gradient-text">CR!</span>
          <span class="cake-icon">🎂</span>
        </h1>

        <p class="hero-subtitle animate-fade-up delay-200" style="opacity:0">
          Another year of being absolutely amazing — here's to you and everything wonderful coming your way 🥳
        </p>

        <!-- Countdown -->
        <div class="countdown-wrapper animate-fade-up delay-300" style="opacity:0">
          <p class="countdown-label">
            {{ countdownMessage }}
          </p>
          <div class="countdown-grid">
            <div class="countdown-unit">
              <span class="countdown-value">{{ pad(timeLeft.days) }}</span>
              <span class="countdown-name">days</span>
            </div>
            <div class="countdown-sep">:</div>
            <div class="countdown-unit">
              <span class="countdown-value">{{ pad(timeLeft.hours) }}</span>
              <span class="countdown-name">hours</span>
            </div>
            <div class="countdown-sep">:</div>
            <div class="countdown-unit">
              <span class="countdown-value">{{ pad(timeLeft.minutes) }}</span>
              <span class="countdown-name">mins</span>
            </div>
            <div class="countdown-sep">:</div>
            <div class="countdown-unit">
              <span class="countdown-value">{{ pad(timeLeft.seconds) }}</span>
              <span class="countdown-name">secs</span>
            </div>
          </div>
        </div>

        <!-- Nav buttons -->
        <div class="hero-buttons animate-fade-up delay-400" style="opacity:0">
          <RouterLink to="/wishes" class="btn btn-primary">💌 Wishes</RouterLink>
          <RouterLink to="/photos" class="btn btn-secondary">📸 Photos</RouterLink>
          <RouterLink to="/letter" class="btn btn-outline">✉️ Letter</RouterLink>
          <RouterLink to="/easter-egg" class="btn btn-outline">🥚 Secret</RouterLink>
        </div>
      </div>
    </section>

    <!-- Info strip -->
    <section class="info-strip">
      <div class="container">
        <div class="info-cards">
          <div class="info-card animate-fade-up delay-100" style="opacity:0">
            <span class="info-icon">💖</span>
            <p>Made with lots of love for CR</p>
          </div>
          <div class="info-card animate-fade-up delay-200" style="opacity:0">
            <span class="info-icon">🎊</span>
            <p>Celebrate the amazing person you are</p>
          </div>
          <div class="info-card animate-fade-up delay-300" style="opacity:0">
            <span class="info-icon">🌟</span>
            <p>Here's to a year full of joy</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const timeLeft = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })
let timer = null

function getNextMayFirst() {
  const now = new Date()
  const year = now.getFullYear()
  const target = new Date(year, 4, 1, 0, 0, 0) // May 1 = month index 4
  if (target <= now) {
    target.setFullYear(year + 1)
  }
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

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  timeLeft.value = { days, hours, minutes, seconds }
}

const countdownMessage = computed(() => {
  const now = new Date()
  const target = getNextMayFirst()
  const year = target.getFullYear()
  return `⏳ Counting down to May 1st, ${year}!`
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
.hero {
  position: relative;
  min-height: calc(100vh - var(--nav-height));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 3rem 1.25rem;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.hero-title {
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 900;
  line-height: 1.1;
  margin: 1rem 0;
  position: relative;
}

.cake-icon {
  display: inline-block;
  animation: wiggle 2s ease-in-out infinite;
  margin-left: 0.25rem;
}

@keyframes wiggle {
  0%, 100% { transform: rotate(-8deg); }
  50% { transform: rotate(8deg); }
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.7;
}

/* Countdown */
.countdown-wrapper {
  background: var(--bg-card);
  border-radius: var(--radius-md);
  padding: 1.5rem 2rem;
  margin: 1.5rem auto;
  display: inline-block;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
}

.countdown-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 1rem;
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
  min-width: 60px;
}

.countdown-value {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  color: var(--color-primary);
  line-height: 1;
}

.countdown-name {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 0.25rem;
}

.countdown-sep {
  font-size: 2rem;
  font-weight: 900;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

/* Decorations */
.deco {
  position: absolute;
  font-size: 2.5rem;
  pointer-events: none;
  animation: float-deco 4s ease-in-out infinite;
  user-select: none;
}

.deco-1 { top: 12%; left: 8%;  animation-delay: 0s; }
.deco-2 { top: 18%; right: 10%; animation-delay: 0.5s; font-size: 2rem; }
.deco-3 { bottom: 25%; left: 6%; animation-delay: 1s; font-size: 2rem; }
.deco-4 { bottom: 30%; right: 8%; animation-delay: 1.5s; }
.deco-5 { top: 50%; right: 4%; animation-delay: 0.7s; font-size: 1.5rem; }

@keyframes float-deco {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%       { transform: translateY(-16px) rotate(10deg); }
}

/* Buttons */
.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 2rem;
}

/* Info strip */
.info-strip {
  padding: 2rem 0 4rem;
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.25rem;
}

.info-card {
  background: var(--bg-card);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  text-align: center;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  transition: transform 0.3s ease;
}

.info-card:hover { transform: translateY(-4px); }

.info-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.75rem;
}

.info-card p {
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 0.95rem;
}
</style>
