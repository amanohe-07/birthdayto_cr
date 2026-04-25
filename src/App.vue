<template>
  <div id="app" :data-theme="theme">
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
import { ref, onMounted } from 'vue'
import SplashScreen from './components/SplashScreen.vue'
import NavBar from './components/NavBar.vue'
import MusicPlayer from './components/MusicPlayer.vue'

const showSplash = ref(true)
const theme = ref('light')
const userInteracted = ref(false)
const musicPlayer = ref(null)

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

onMounted(() => {
  try {
    const saved = localStorage.getItem('cr_theme')
    if (saved) theme.value = saved
  } catch (e) {}
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
