<template>
  <div class="page-wrapper">
    <div class="feature-page">
      <RouterLink to="/" class="back-btn">← 返回首页</RouterLink>

      <div class="feature-header">
        <h1 class="feature-title">🎂 戳一戳蛋糕</h1>
        <p class="feature-sub">点击蛋糕，虽然没什么用哈哈</p>
      </div>

      <div class="cake-stage">
        <div
          class="cake-container"
          @click="pokeIt"
        >
          <div class="cake-svg-wrap" :class="{ 'cake-svg--shake': shaking }">
            <svg viewBox="0 0 140 140" width="180" height="180" xmlns="http://www.w3.org/2000/svg">
              <!-- Shadow -->
              <ellipse cx="70" cy="118" rx="52" ry="9" fill="#f0c8d0" opacity="0.5"/>
              <!-- Bottom tier -->
              <rect x="14" y="78" width="112" height="38" rx="12" fill="#f7c5d0"/>
              <rect x="14" y="78" width="112" height="14" rx="7" fill="#e8a0b0"/>
              <!-- Cream dots on bottom tier -->
              <circle cx="34" cy="97" r="6" fill="#fff" opacity="0.85"/>
              <circle cx="70" cy="97" r="6" fill="#fff" opacity="0.85"/>
              <circle cx="106" cy="97" r="6" fill="#fff" opacity="0.85"/>
              <!-- Top tier -->
              <rect x="34" y="48" width="72" height="32" rx="10" fill="#d4b8e0"/>
              <rect x="34" y="48" width="72" height="12" rx="6" fill="#b89ed0"/>
              <!-- Stars on top tier -->
              <text x="48" y="68" font-size="10" opacity="0.7">⭐</text>
              <text x="84" y="68" font-size="10" opacity="0.7">⭐</text>
              <!-- Candles -->
              <rect x="53" y="30" width="8" height="20" rx="4" fill="#fad4b4"/>
              <rect x="79" y="30" width="8" height="20" rx="4" fill="#b8e0d4"/>
              <!-- Flames -->
              <ellipse cx="57" cy="28" rx="4" ry="6" fill="#ffb830" opacity="0.9"/>
              <ellipse cx="83" cy="28" rx="4" ry="6" fill="#ff9040" opacity="0.9"/>
              <ellipse cx="57" cy="27" rx="2" ry="4" fill="#fff5b0" opacity="0.85"/>
              <ellipse cx="83" cy="27" rx="2" ry="4" fill="#fff5b0" opacity="0.85"/>
              <!-- Sparkle decorations -->
              <text x="20" y="72" font-size="10" opacity="0.6">✨</text>
              <text x="104" y="72" font-size="10" opacity="0.6">✨</text>
              <text x="60" y="44" font-size="8" opacity="0.6">💫</text>
            </svg>
          </div>

          <!-- Particles -->
          <span
            v-for="p in particles"
            :key="p.id"
            class="cake-particle"
            :style="p.style"
          >{{ p.char }}</span>
        </div>

        <div class="cake-feedback">
          <p class="cake-hint" v-if="pokeCount === 0">点击蛋糕 →</p>
          <p class="cake-count" v-else>已经戳了 <strong>{{ pokeCount }}</strong> 次</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const shaking = ref(false)
const pokeCount = ref(0)
const particles = ref([])
const particleChars = ['⭐', '✨', '💕', '🌸', '💫', '🍬', '🎊']

function loadCount() {
  try { pokeCount.value = parseInt(localStorage.getItem('cr_cake_count') || '0') } catch (e) {}
}

function saveCount() {
  try { localStorage.setItem('cr_cake_count', String(pokeCount.value)) } catch (e) {}
}

function pokeIt() {
  pokeCount.value++
  saveCount()
  triggerShake()
  spawnParticles()
}

function triggerShake() {
  shaking.value = true
  setTimeout(() => { shaking.value = false }, 600)
}

function spawnParticles() {
  const count = 10 + Math.floor(Math.random() * 6)
  const newParticles = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 360 + Math.random() * 20
    const dist = 55 + Math.random() * 50
    const tx = Math.cos((angle * Math.PI) / 180) * dist
    const ty = Math.sin((angle * Math.PI) / 180) * dist - 20
    const id = Date.now() + i
    return {
      id,
      char: particleChars[i % particleChars.length],
      style: {
        '--tx': `${tx}px`,
        '--ty': `${ty}px`,
        fontSize: `${0.8 + Math.random() * 0.7}rem`,
        animation: 'starPop 0.9s ease-out forwards',
        animationDelay: `${i * 0.03}s`,
      },
    }
  })
  particles.value = [...particles.value, ...newParticles]
  setTimeout(() => {
    const ids = new Set(newParticles.map(p => p.id))
    particles.value = particles.value.filter(p => !ids.has(p.id))
  }, 1400)
}

onMounted(loadCount)
</script>

<style scoped>
.page-wrapper {
  min-height: calc(100vh - 60px);
  background: var(--gradient-hero);
  padding: 2rem 1.25rem 4rem;
}

.feature-page {
  max-width: 500px;
  margin: 0 auto;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: var(--font-size-sm);
  font-weight: 600;
  padding: 0.4rem 0.75rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  transition: all var(--transition-base);
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-sm);
}
.back-btn:hover {
  color: var(--accent);
  border-color: var(--accent);
  transform: translateX(-2px);
}

.feature-header {
  text-align: center;
  margin-bottom: 2.5rem;
  animation: fadeInUp 0.6s ease both;
}

.feature-title {
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  font-weight: 900;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.feature-sub {
  color: var(--text-secondary);
  font-size: var(--font-size-base);
}

.cake-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  animation: fadeInUp 0.6s ease 0.1s both;
}

.cake-container {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 220px;
  height: 220px;
  border-radius: var(--radius-xl);
  background: var(--bg-card);
  border: 1.5px solid var(--border-color);
  box-shadow: var(--shadow-md);
  transition: box-shadow var(--transition-base), transform var(--transition-fast);
  user-select: none;
}

.cake-container:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-3px);
}

.cake-container:active {
  transform: scale(0.97);
}

.cake-svg-wrap {
  transition: transform 0.1s;
}

.cake-svg--shake {
  animation: shake 0.6s ease;
}

.cake-particle {
  position: absolute;
  top: 50%;
  left: 50%;
  pointer-events: none;
  display: inline-block;
  transform-origin: center;
}

.cake-feedback {
  text-align: center;
}

.cake-hint {
  font-size: var(--font-size-base);
  color: var(--text-muted);
}

.cake-count {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
}
.cake-count strong {
  color: var(--accent);
  font-size: var(--font-size-xl);
}
</style>
