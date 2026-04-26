<template>
  <div id="app" :data-theme="theme">
    <!-- Mouse follow glow (desktop only) -->
    <div
      class="mouse-glow"
      :style="{ left: mouseX + 'px', top: mouseY + 'px', opacity: showGlow ? 1 : 0 }"
    />

    <SplashScreen v-if="showSplash" @enter="onEnter" />
    <div v-show="!showSplash" class="app-content">
      <NavBar :theme="theme" @toggle-theme="toggleTheme" />
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      <MusicPlayer ref="musicPlayer" :user-interacted="userInteracted" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SplashScreen from './components/SplashScreen.vue'
import NavBar from './components/NavBar.vue'
import MusicPlayer from './components/MusicPlayer.vue'

const showSplash = ref(true)
const theme = ref('light')
const userInteracted = ref(false)
const musicPlayer = ref(null)
const mouseX = ref(0)
const mouseY = ref(0)
const showGlow = ref(false)

function onEnter() {
  userInteracted.value = true
  showSplash.value = false
}

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  try {
    localStorage.setItem('cr_theme', theme.value)
  } catch (e) {}
}

function onMouseMove(e) {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
  showGlow.value = true
}

function onMouseLeave() {
  showGlow.value = false
}

onMounted(() => {
  try {
    const saved = localStorage.getItem('cr_theme')
    if (saved) theme.value = saved
  } catch (e) {}

  // Only enable glow on pointer devices (desktop)
  const isPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  if (isPointer) {
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
  }
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseleave', onMouseLeave)
})
</script>

<style>
#app {
  min-height: 100vh;
  background: var(--bg-primary);
  transition: background var(--transition-slow);
}

.app-content {
  min-height: 100vh;
}

/* Mouse follow spotlight glow */
.mouse-glow {
  position: fixed;
  width: 480px;
  height: 480px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(232, 160, 176, 0.10) 0%, transparent 70%);
  transition: opacity 0.4s ease;
}

[data-theme="dark"] .mouse-glow {
  background: radial-gradient(circle, rgba(180, 120, 200, 0.14) 0%, transparent 70%);
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
