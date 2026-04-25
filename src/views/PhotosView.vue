<template>
  <main class="photos">
    <div class="photos__header reveal-hidden" ref="headerRef" :class="{ 'reveal-visible': headerVisible }">
      <h2 class="photos__title">📸 照片墙</h2>
      <p class="photos__sub">每一张都是值得记住的瞬间 ✨</p>
    </div>

    <div class="photos__wall">
      <div
        v-for="photo in photos"
        :key="photo.index"
        class="photos__item"
        :class="{ 'photos__item--active': photo.active }"
        :style="photo.style"
        @click="togglePhoto(photo)"
      >
        <div class="photos__tape"></div>
        <img
          :src="photo.src"
          :alt="`照片 ${photo.index + 1}`"
          class="photos__img"
          @error="onImgError($event, photo)"
          loading="lazy"
        />
        <div v-if="photo.useFallback" class="photos__fallback" :style="{ background: photo.fallbackBg }">
          <span class="photos__fallback-icon">{{ photo.fallbackIcon }}</span>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const headerRef = ref(null)
const headerVisible = ref(false)

// Deterministic values for rotation/offset/size – consistent on every render
const fallbackIcons = ['🌸', '✨', '💕', '🎂', '⭐', '💫', '🌙', '🦋', '🍬', '💗', '🌈', '🎉']
const fallbackColors = [
  'linear-gradient(135deg,#f7c5d0,#d4b8e0)',
  'linear-gradient(135deg,#d4b8e0,#b8e0d4)',
  'linear-gradient(135deg,#b8e0d4,#fad4b4)',
  'linear-gradient(135deg,#fad4b4,#b4d4f0)',
  'linear-gradient(135deg,#b4d4f0,#f8e8b0)',
  'linear-gradient(135deg,#f8e8b0,#f7c5d0)',
  'linear-gradient(135deg,#f7c5d0,#b8e0d4)',
  'linear-gradient(135deg,#d4b8e0,#fad4b4)',
  'linear-gradient(135deg,#b8e0d4,#b4d4f0)',
  'linear-gradient(135deg,#fad4b4,#f8e8b0)',
  'linear-gradient(135deg,#b4d4f0,#f7c5d0)',
  'linear-gradient(135deg,#f8e8b0,#d4b8e0)',
]

// Size buckets: 0=small, 1=medium, 2=large
const sizeBuckets = [1, 2, 0, 1, 2, 0, 1, 0, 2, 1, 0, 2]

function seeded(i, mod) {
  return ((i * 137 + 43) % mod)
}

const photos = Array.from({ length: 12 }, (_, i) => {
  const rotSign = i % 2 === 0 ? 1 : -1
  const rot = rotSign * (1 + seeded(i, 5) * 1.2) // -6 to +6
  const tx = (seeded(i + 1, 18) - 9) // -9 to +9 px
  const ty = (seeded(i + 2, 14) - 7) // -7 to +7 px
  const size = sizeBuckets[i]
  const widths = ['140px', '170px', '200px']
  const w = widths[size]

  return {
    index: i,
    src: new URL(`../assets/photos/${String(i + 1).padStart(2, '0')}.jpg`, import.meta.url).href,
    active: false,
    useFallback: false,
    fallbackBg: fallbackColors[i],
    fallbackIcon: fallbackIcons[i],
    style: {
      '--base-rotate': `${rot}deg`,
      transform: `rotate(${rot}deg) translate(${tx}px, ${ty}px)`,
      width: w,
      zIndex: 1,
    },
  }
})

function onImgError(event, photo) {
  photo.useFallback = true
  event.target.style.display = 'none'
}

function togglePhoto(photo) {
  const wasActive = photo.active
  photos.forEach(p => { p.active = false; p.style.zIndex = 1 })
  if (!wasActive) {
    photo.active = true
    photo.style.zIndex = 10
  }
}

let observer = null
onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) headerVisible.value = true },
    { threshold: 0.1 }
  )
  if (headerRef.value) observer.observe(headerRef.value)
})
onUnmounted(() => { if (observer) observer.disconnect() })
</script>

<style scoped>
.photos {
  min-height: calc(100vh - 60px);
  background: var(--gradient-hero);
  padding: var(--space-8) var(--space-4) var(--space-16);
}

.photos__header {
  text-align: center;
  padding: var(--space-8) var(--space-4) var(--space-6);
}

.photos__title {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.photos__sub {
  color: var(--text-secondary);
  font-size: var(--font-size-base);
}

.photos__wall {
  max-width: 980px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-5);
  padding: var(--space-4) var(--space-2);
  /* Let items wrap naturally with their offsets for the messy feel */
}

.photos__item {
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.35s ease,
              z-index 0s;
  border-radius: var(--radius-sm);
  box-shadow: 2px 4px 16px rgba(120, 60, 80, 0.18);
}

.photos__item:hover {
  transform: rotate(0deg) translateY(-6px) scale(1.03) !important;
  box-shadow: 4px 12px 32px rgba(120, 60, 80, 0.28);
  z-index: 5 !important;
}

.photos__item--active {
  animation: sway 0.5s ease;
  box-shadow: 6px 16px 40px rgba(120, 60, 80, 0.35) !important;
  z-index: 10 !important;
}

/* Tape strip across top */
.photos__tape {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%) rotate(-1deg);
  width: 44px;
  height: 18px;
  background: rgba(255, 240, 200, 0.65);
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  z-index: 2;
  pointer-events: none;
}

/* Alternate tape rotation for variety */
.photos__item:nth-child(even) .photos__tape {
  transform: translateX(-50%) rotate(1.5deg);
}
.photos__item:nth-child(3n) .photos__tape {
  transform: translateX(-40%) rotate(-2.5deg);
}

.photos__img {
  display: block;
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  border-radius: var(--radius-sm);
  pointer-events: none;
  user-select: none;
}

.photos__fallback {
  width: 100%;
  aspect-ratio: 3/4;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
}

.photos__fallback-icon {
  font-size: 2.5rem;
  opacity: 0.7;
}

/* White photo border like a print */
.photos__item::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 4px solid rgba(255, 255, 255, 0.9);
  border-bottom-width: 24px;
  border-radius: var(--radius-sm);
  pointer-events: none;
  box-shadow: inset 0 0 0 1px rgba(200, 160, 180, 0.2);
}

@media (max-width: 640px) {
  .photos__wall {
    gap: var(--space-4);
  }

  .photos__item {
    width: 120px !important;
  }
}
</style>
