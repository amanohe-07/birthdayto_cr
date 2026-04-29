<template>
  <teleport to="body">
    <transition name="modal-backdrop">
      <div v-if="modelValue" class="modal-backdrop" @click.self="close">
        <transition name="modal-card">
          <div v-if="modelValue" class="modal-card">
            <div class="modal-deco">
              <span v-for="i in 8" :key="i" class="modal-star" :style="starStyle(i)">✨</span>
            </div>
            <div class="modal-title">小tip</div>
            <div class="modal-body">
              <p>总感觉直接写名字有点怪</p>
              <p>（但是好像也没有对你什么其它的称呼）</p>
              <div class="modal-floaties">
                <span v-for="e in emojis" :key="e.id" class="modal-floaty" :style="e.style">{{ e.char }}</span>
              </div>
            </div>
            <button class="modal-close" @click="close">关闭 ✕</button>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue'])
function close() { emit('update:modelValue', false) }

const emojis = [
  { id: 1, char: '☁️', style: { animationDuration: '2s', animationDelay: '0s' } },
  { id: 2, char: '⭐', style: { animationDuration: '2.4s', animationDelay: '0.3s' } },
  { id: 3, char: '🌸', style: { animationDuration: '1.8s', animationDelay: '0.6s' } },
  { id: 4, char: '💫', style: { animationDuration: '2.2s', animationDelay: '0.1s' } },
]

function starStyle(i) {
  const angle = (i / 8) * 360
  const r = 55
  const x = Math.cos((angle * Math.PI) / 180) * r
  const y = Math.sin((angle * Math.PI) / 180) * r
  return {
    transform: `translate(${x}px, ${y}px)`,
    animationDelay: `${(i * 0.15)}s`,
    fontSize: `${0.8 + (i % 3) * 0.2}rem`,
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: 2.5rem 2rem;
  max-width: 380px;
  width: 100%;
  text-align: center;
  box-shadow: var(--shadow-lg);
  position: relative;
}

.modal-deco {
  position: relative;
  height: 60px;
  margin-bottom: 0.5rem;
}

.modal-star {
  position: absolute;
  top: 50%;
  left: 50%;
  display: inline-block;
  animation: float 2s ease-in-out infinite;
}

.modal-title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 1rem;
}

.modal-body {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.modal-body p { margin-bottom: 0.5rem; }

.modal-floaties {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.modal-floaty {
  font-size: 1.5rem;
  display: inline-block;
  animation: float var(--dur, 2s) ease-in-out infinite;
}

.modal-close {
  background: var(--accent);
  color: #fff;
  border: none;
  padding: 0.6rem 2rem;
  border-radius: var(--radius-full);
  font-size: var(--font-size-base);
  font-family: var(--font-family);
  cursor: pointer;
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}
.modal-close:hover { opacity: 0.85; transform: scale(1.04); }

.modal-backdrop-enter-active, .modal-backdrop-leave-active {
  transition: opacity 0.25s ease;
}
.modal-backdrop-enter-from, .modal-backdrop-leave-to { opacity: 0; }

.modal-card-enter-active {
  animation: scaleIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-card-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.modal-card-leave-to { opacity: 0; transform: scale(0.9); }
</style>
