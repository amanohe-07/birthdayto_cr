<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': scrolled }">
    <div class="navbar__inner">
      <router-link to="/" class="navbar__brand">
        CR's Space <span class="navbar__heart">💗</span>
      </router-link>

      <div class="navbar__links" :class="{ 'navbar__links--open': menuOpen }">
        <router-link v-for="link in links" :key="link.to" :to="link.to" class="navbar__link" @click="menuOpen = false">
          {{ link.label }}
        </router-link>
      </div>

      <div class="navbar__actions">
        <button class="navbar__theme-btn" @click="emit('toggle-theme')" :title="props.theme === 'dark' ? '切换亮色' : '切换暗色'">
          <span v-if="props.theme === 'dark'">☀️</span>
          <span v-else>🌙</span>
        </button>
        <button class="navbar__hamburger" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({ theme: String })
const emit = defineEmits(['toggle-theme'])

const scrolled = ref(false)
const menuOpen = ref(false)

const links = [
  { to: '/', label: '🏠 Home' },
  { to: '/wishes', label: '💌 Wishes' },
  { to: '/photos', label: '📸 Photos' },
  { to: '/letter', label: '✉️ Letter' },
]

function onScroll() { scrolled.value = window.scrollY > 20 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--nav-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: border-color var(--transition-base), box-shadow var(--transition-base);
}

.navbar--scrolled {
  border-bottom-color: var(--border-color);
  box-shadow: var(--shadow-sm);
}

.navbar__inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.navbar__brand {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  white-space: nowrap;
  transition: opacity var(--transition-fast);
}
.navbar__brand:hover { opacity: 0.8; }

.navbar__heart {
  display: inline-block;
  animation: float 2s ease-in-out infinite;
}

.navbar__links {
  display: flex;
  gap: 0.25rem;
  flex: 1;
}

.navbar__link {
  padding: 0.4rem 0.875rem;
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: color var(--transition-fast), background var(--transition-fast);
  white-space: nowrap;
}

.navbar__link:hover {
  color: var(--accent);
  background: var(--bg-secondary);
}

.navbar__link.router-link-active {
  color: var(--accent);
  background: var(--bg-secondary);
  font-weight: 600;
  border-bottom: 2px solid var(--accent);
}

.navbar__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
}

.navbar__theme-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.25rem;
  border-radius: var(--radius-sm);
  transition: transform var(--transition-fast);
}
.navbar__theme-btn:hover { transform: scale(1.15) rotate(15deg); }

.navbar__hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.navbar__hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: transform var(--transition-base);
}

@media (max-width: 640px) {
  .navbar__hamburger { display: flex; }
  .navbar__links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0; right: 0;
    background: var(--nav-bg);
    backdrop-filter: blur(12px);
    flex-direction: column;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
    gap: 0.5rem;
  }
  .navbar__links--open { display: flex; }
  .navbar__link { padding: 0.6rem 0.75rem; }
}
</style>
