<template>
  <div :data-theme="isDark ? 'dark' : 'light'" class="app-root">
    <!-- Mouse glow -->
    <div
      class="mouse-glow"
      :style="{ left: mouseX + 'px', top: mouseY + 'px', opacity: showGlow ? 1 : 0 }"
    />

    <!-- Floating particles -->
    <div class="particles-container" aria-hidden="true">
      <span
        v-for="p in particles"
        :key="p.id"
        class="particle"
        :style="p.style"
      />
    </div>

    <!-- Navigation -->
    <nav class="nav" role="navigation">
      <div class="nav-inner">
        <RouterLink to="/" class="nav-logo">🎂 CR</RouterLink>

        <!-- Desktop links -->
        <div class="nav-links">
          <RouterLink to="/" class="nav-link">Home</RouterLink>
          <RouterLink to="/wishes" class="nav-link">Wishes</RouterLink>
          <RouterLink to="/photos" class="nav-link">Photos</RouterLink>
          <RouterLink to="/letter" class="nav-link">Letter</RouterLink>
          <RouterLink to="/easter-egg" class="nav-link">🥚</RouterLink>
          <button class="nav-toggle-btn" @click="toggleDark" :title="isDark ? 'Light mode' : 'Dark mode'">
            {{ isDark ? '☀️' : '🌙' }}
          </button>
        </div>

        <!-- Mobile hamburger -->
        <div class="nav-right-mobile">
          <button class="nav-toggle-btn" @click="toggleDark" :title="isDark ? 'Light mode' : 'Dark mode'">
            {{ isDark ? '☀️' : '🌙' }}
          </button>
          <button class="nav-hamburger" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
            <span :style="menuOpen ? 'transform:rotate(45deg) translate(5px,5px)' : ''"></span>
            <span :style="menuOpen ? 'opacity:0' : ''"></span>
            <span :style="menuOpen ? 'transform:rotate(-45deg) translate(5px,-5px)' : ''"></span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile menu -->
    <div :class="['nav-mobile', menuOpen && 'open']">
      <RouterLink to="/" class="nav-link" @click="menuOpen = false">🏠 Home</RouterLink>
      <RouterLink to="/wishes" class="nav-link" @click="menuOpen = false">💌 Wishes</RouterLink>
      <RouterLink to="/photos" class="nav-link" @click="menuOpen = false">📸 Photos</RouterLink>
      <RouterLink to="/letter" class="nav-link" @click="menuOpen = false">✉️ Letter</RouterLink>
      <RouterLink to="/easter-egg" class="nav-link" @click="menuOpen = false">🥚 Easter Egg</RouterLink>
    </div>

    <!-- Page content -->
    <main class="main-content">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isDark = ref(false)
const menuOpen = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)
const showGlow = ref(false)

function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

function onMouseMove(e) {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
  showGlow.value = true
}

function onMouseLeave() {
  showGlow.value = false
}

// Generate floating particles
const COLORS = ['#FFB7C5', '#B5EAD7', '#FFDAC1', '#C7CEEA', '#FFFACD', '#FF9AA2', '#AED6F1']
const particles = Array.from({ length: 22 }, (_, i) => {
  const size = 6 + Math.random() * 10
  const left = Math.random() * 100
  const delay = Math.random() * 15
  const duration = 12 + Math.random() * 16
  const color = COLORS[i % COLORS.length]
  return {
    id: i,
    style: {
      width: size + 'px',
      height: size + 'px',
      left: left + '%',
      bottom: '-20px',
      background: color,
      opacity: 0.5 + Math.random() * 0.4,
      animationDelay: delay + 's',
      animationDuration: duration + 's',
    }
  }
})

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark') {
    isDark.value = true
    document.documentElement.setAttribute('data-theme', 'dark')
  }

  const isMobile = window.matchMedia('(hover: none)').matches
  if (!isMobile) {
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
  }
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseleave', onMouseLeave)
})
</script>

<style scoped>
.app-root {
  min-height: 100vh;
  background-color: var(--bg-main);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.main-content {
  position: relative;
  z-index: 1;
}

.nav-right-mobile {
  display: none;
  align-items: center;
  gap: 0.5rem;
}

@media (max-width: 640px) {
  .nav-right-mobile {
    display: flex;
  }
}
</style>
