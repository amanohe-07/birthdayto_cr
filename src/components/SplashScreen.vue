<template>
  <div
    class="splash"
    :class="{ 'splash--leaving': leaving }"
    @click="handleEnter"
  >
    <div class="splash__shapes">
      <span v-for="s in shapes" :key="s.id" class="splash__shape" :style="s.style">{{ s.char }}</span>
    </div>

    <div class="splash__center">
      <div class="splash__line1">Hi CR ✨</div>
      <div class="splash__line2">今天也要被温柔包围。</div>
      <button class="splash__btn" @click.stop="handleEnter">点击进入</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['enter'])
const leaving = ref(false)

const chars = ['✨', '🌸', '💕', '⭐', '🍬', '💫', '🌙', '🦋', '🍭', '💗']
const shapes = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  char: chars[i % chars.length],
  style: {
    left: `${Math.random() * 90 + 5}%`,
    top: `${Math.random() * 90 + 5}%`,
    fontSize: `${Math.random() * 1.2 + 0.8}rem`,
    animationDelay: `${Math.random() * 3}s`,
    animationDuration: `${Math.random() * 3 + 3}s`,
    opacity: Math.random() * 0.5 + 0.3,
  },
}))

function handleEnter() {
  if (leaving.value) return
  leaving.value = true
  setTimeout(() => emit('enter'), 500)
}
</script>

<style scoped>
.splash {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--gradient-splash);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.splash--leaving {
  opacity: 0;
  transform: scale(0.96);
  pointer-events: none;
}

.splash__shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.splash__shape {
  position: absolute;
  animation: floatSlow var(--dur, 5s) ease-in-out infinite;
  animation-delay: var(--delay, 0s);
}

.splash__center {
  position: relative;
  z-index: 1;
  text-align: center;
  animation: fadeInScale 0.8s ease 0.2s both;
}

.splash__line1 {
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: 700;
  color: #fff;
  text-shadow: 0 2px 12px rgba(200, 100, 120, 0.4);
  margin-bottom: 0.5rem;
  animation: fadeInUp 0.7s ease 0.3s both;
}

.splash__line2 {
  font-size: clamp(1rem, 3vw, 1.4rem);
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2.5rem;
  letter-spacing: 0.05em;
  animation: fadeInUp 0.7s ease 0.5s both;
}

.splash__btn {
  background: rgba(255, 255, 255, 0.25);
  border: 2px solid rgba(255, 255, 255, 0.7);
  color: #fff;
  padding: 0.75rem 2.5rem;
  border-radius: var(--radius-full);
  font-size: var(--font-size-lg);
  font-family: var(--font-family);
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: background var(--transition-base), transform var(--transition-base), box-shadow var(--transition-base);
  animation: fadeInUp 0.7s ease 0.7s both;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.2);
}

.splash__btn:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(255, 255, 255, 0.3);
}

.splash__btn:active {
  transform: scale(0.97);
}
</style>
