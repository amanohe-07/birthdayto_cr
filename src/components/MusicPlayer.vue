<template>
  <div class="music-player">
    <transition name="toast-fade">
      <div v-if="showToast" class="music-toast">🎵 点击右下角开启音乐</div>
    </transition>
    <button
      class="music-btn"
      :class="{ 'music-btn--playing': isPlaying }"
      @click="toggle"
      :title="isPlaying ? '暂停音乐' : '播放音乐'"
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
      </svg>
    </button>
    <audio ref="audioEl" loop preload="none">
      <source :src="audioSrc" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  userInteracted: { type: Boolean, default: false }
})

const audioEl = ref(null)
const isPlaying = ref(false)
const showToast = ref(false)
const audioSrc = new URL('../assets/audio/bg.mp3', import.meta.url).href

onMounted(() => {
  setTimeout(() => {
    showToast.value = true
    setTimeout(() => { showToast.value = false }, 3000)
  }, 1200)
})

watch(() => props.userInteracted, (val) => {
  if (val) tryAutoPlay()
})

async function tryAutoPlay() {
  if (!audioEl.value) return
  try {
    await audioEl.value.play()
    isPlaying.value = true
  } catch (e) {
    // Browser blocked autoplay
  }
}

async function toggle() {
  if (!audioEl.value) return
  if (isPlaying.value) {
    audioEl.value.pause()
    isPlaying.value = false
  } else {
    try {
      await audioEl.value.play()
      isPlaying.value = true
    } catch (e) {
      isPlaying.value = false
    }
  }
}
</script>

<style scoped>
.music-player {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.music-toast {
  background: var(--bg-card);
  color: var(--text-secondary);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  white-space: nowrap;
}

.toast-fade-enter-active, .toast-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.toast-fade-enter-from, .toast-fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

.music-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: var(--accent);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.music-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 0 0 6px var(--accent-glow), var(--shadow-md);
}

.music-btn--playing {
  animation: spin 4s linear infinite;
  box-shadow: 0 0 0 4px var(--accent-glow), var(--shadow-md);
}

.music-btn--playing:hover {
  animation-play-state: paused;
}
</style>
