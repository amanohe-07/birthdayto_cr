<template>
  <div class="cake-wrap">
    <h3 class="cake-title">🎂 戳一戳</h3>
    <div class="cake-container" @click="pokeIt" ref="cakeRef">
      <div class="cake-svg-wrap" :class="{ 'cake-svg--shake': shaking }">
        <svg viewBox="0 0 120 120" width="110" height="110" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="60" cy="100" rx="48" ry="8" fill="#f0c8d0" opacity="0.6"/>
          <rect x="18" y="68" width="84" height="32" rx="10" fill="#f7c5d0"/>
          <rect x="18" y="68" width="84" height="10" rx="5" fill="#e8a0b0"/>
          <rect x="32" y="42" width="56" height="28" rx="8" fill="#d4b8e0"/>
          <rect x="32" y="42" width="56" height="10" rx="5" fill="#b89ed0"/>
          <circle cx="38" cy="68" r="5" fill="#fff" opacity="0.8"/>
          <circle cx="60" cy="68" r="5" fill="#fff" opacity="0.8"/>
          <circle cx="82" cy="68" r="5" fill="#fff" opacity="0.8"/>
          <rect x="47" y="28" width="6" height="16" rx="3" fill="#fad4b4"/>
          <rect x="67" y="28" width="6" height="16" rx="3" fill="#b8e0d4"/>
          <ellipse cx="50" cy="26" rx="3" ry="5" fill="#ffb830" opacity="0.9"/>
          <ellipse cx="70" cy="26" rx="3" ry="5" fill="#ff9040" opacity="0.9"/>
          <ellipse cx="50" cy="25" rx="1.5" ry="3" fill="#fff5b0" opacity="0.8"/>
          <ellipse cx="70" cy="25" rx="1.5" ry="3" fill="#fff5b0" opacity="0.8"/>
          <text x="24" y="88" font-size="10" opacity="0.7">⭐</text>
          <text x="82" y="88" font-size="10" opacity="0.7">⭐</text>
          <text x="50" y="58" font-size="8" opacity="0.6">✨</text>
        </svg>
      </div>
      <span
        v-for="p in particles"
        :key="p.id"
        class="cake-particle"
        :style="p.style"
      >{{ p.char }}</span>
    </div>
    <p class="cake-count">已投喂 {{ pokeCount }} 次 💕</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const shaking = ref(false)
const pokeCount = ref(0)
const particles = ref([])
const cakeRef = ref(null)
const particleChars = ['⭐','✨','💕','🌸','💫','🍬']

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
  const count = 8 + Math.floor(Math.random() * 5)
  const newParticles = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 360 + Math.random() * 20
    const dist = 50 + Math.random() * 40
    const tx = Math.cos((angle * Math.PI) / 180) * dist
    const ty = Math.sin((angle * Math.PI) / 180) * dist - 20
    const id = Date.now() + i
    return {
      id,
      char: particleChars[i % particleChars.length],
      style: {
        '--tx': `${tx}px`,
        '--ty': `${ty}px`,
        fontSize: `${0.7 + Math.random() * 0.6}rem`,
        animation: `starPop 0.8s ease-out forwards`,
        animationDelay: `${i * 0.03}s`,
      },
    }
  })
  particles.value = [...particles.value, ...newParticles]
  setTimeout(() => {
    const ids = new Set(newParticles.map(p => p.id))
    particles.value = particles.value.filter(p => !ids.has(p.id))
  }, 1200)
}

onMounted(loadCount)
</script>

<style scoped>
.cake-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  height: 100%;
}

.cake-title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--text-primary);
  align-self: flex-start;
}

.cake-container {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 130px;
  height: 130px;
  flex: 1;
}

.cake-svg-wrap {
  transition: transform 0.1s;
  user-select: none;
}

.cake-svg--shake {
  animation: shake 0.6s ease;
}

.cake-container:hover .cake-svg-wrap {
  transform: scale(1.05);
}

.cake-particle {
  position: absolute;
  top: 50%;
  left: 50%;
  pointer-events: none;
  display: inline-block;
  transform-origin: center;
}

.cake-count {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  text-align: center;
}
</style>
