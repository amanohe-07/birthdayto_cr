<template>
  <div class="page-wrapper">
    <section class="section">
      <div class="container">
        <div class="section-title">
          <div class="badge">📸 Photo Gallery</div>
          <h2 class="mt-2">CR's Birthday Memories ✨</h2>
          <div class="divider"></div>
          <p class="text-secondary">A little collection of moments — real ones coming soon! 🌸</p>
        </div>

        <!-- Desktop collage -->
        <div class="collage-wrapper" ref="collageRef">
          <div
            v-for="(photo, i) in photos"
            :key="i"
            class="photo-card"
            :style="photo.style"
            @mouseenter="photo.hovered = true"
            @mouseleave="photo.hovered = false"
          >
            <img :src="photo.src" :alt="'Photo ' + (i + 1)" loading="lazy" />
            <div class="photo-label">{{ photo.label }}</div>
          </div>
        </div>

        <!-- Mobile grid -->
        <div class="mobile-grid">
          <div
            v-for="(photo, i) in photos"
            :key="'m' + i"
            class="mobile-photo reveal"
            :style="{ transitionDelay: (i % 3) * 0.1 + 's' }"
            :ref="el => mobileRefs[i] = el"
          >
            <img :src="photo.src" :alt="'Photo ' + (i + 1)" loading="lazy" />
            <div class="photo-label">{{ photo.label }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Static imports for the 12 SVG photos
import p01 from '@/assets/photos/01.svg'
import p02 from '@/assets/photos/02.svg'
import p03 from '@/assets/photos/03.svg'
import p04 from '@/assets/photos/04.svg'
import p05 from '@/assets/photos/05.svg'
import p06 from '@/assets/photos/06.svg'
import p07 from '@/assets/photos/07.svg'
import p08 from '@/assets/photos/08.svg'
import p09 from '@/assets/photos/09.svg'
import p10 from '@/assets/photos/10.svg'
import p11 from '@/assets/photos/11.svg'
import p12 from '@/assets/photos/12.svg'

const srcs = [p01, p02, p03, p04, p05, p06, p07, p08, p09, p10, p11, p12]
const labels = [
  'Good times 🌸', 'Adventure awaits ✨', 'Pure joy 💕', 'Smiles all around 🌈',
  'Best moments 🎉', 'Golden memory 🌟', 'Forever fave 💖', 'Endless laughter 😄',
  'Sweet memories 🍬', 'The best day 🎊', 'Unforgettable 🌺', 'So grateful 🙏'
]

// Collage layout: varied positions, sizes, rotations
const collageLayout = [
  { top: '2%',  left: '2%',   width: '28%', rotation: -2 },
  { top: '0%',  left: '31%',  width: '22%', rotation: 1.5 },
  { top: '1%',  left: '54%',  width: '24%', rotation: -1 },
  { top: '0%',  left: '79%',  width: '19%', rotation: 2 },
  { top: '38%', left: '0%',   width: '20%', rotation: -2.5 },
  { top: '35%', left: '21%',  width: '26%', rotation: 1 },
  { top: '33%', left: '48%',  width: '22%', rotation: -1.5 },
  { top: '32%', left: '71%',  width: '27%', rotation: 2.5 },
  { top: '68%', left: '3%',   width: '23%', rotation: 1.5 },
  { top: '66%', left: '27%',  width: '20%', rotation: -2 },
  { top: '65%', left: '48%',  width: '25%', rotation: 1 },
  { top: '67%', left: '74%',  width: '24%', rotation: -1.5 },
]

const photos = ref(srcs.map((src, i) => ({
  src,
  label: labels[i],
  hovered: false,
  style: {
    position: 'absolute',
    top: collageLayout[i].top,
    left: collageLayout[i].left,
    width: collageLayout[i].width,
    transform: `rotate(${collageLayout[i].rotation}deg)`,
    '--rotation': `${collageLayout[i].rotation}deg`,
  }
})))

const mobileRefs = ref([])
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
    { threshold: 0.1 }
  )
  mobileRefs.value.forEach(el => { if (el) observer.observe(el) })
})

onUnmounted(() => { if (observer) observer.disconnect() })
</script>

<style scoped>
/* Desktop collage */
.collage-wrapper {
  position: relative;
  width: 100%;
  height: 700px;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .collage-wrapper { display: none; }
}

.photo-card {
  border-radius: var(--radius-sm);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease, z-index 0s;
  cursor: pointer;
  background: var(--bg-card);
  z-index: 1;
}

.photo-card:hover {
  transform: rotate(0deg) scale(1.08) !important;
  box-shadow: var(--shadow-hover);
  z-index: 10;
  position: absolute;
}

.photo-card img {
  width: 100%;
  display: block;
  transition: filter 0.3s ease;
}

.photo-card:hover img {
  filter: brightness(1.05);
}

.photo-label {
  background: var(--bg-card);
  padding: 0.4rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-secondary);
  text-align: center;
}

/* Mobile grid */
.mobile-grid {
  display: none;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (max-width: 768px) {
  .mobile-grid { display: grid; }
}

@media (max-width: 400px) {
  .mobile-grid { grid-template-columns: 1fr; }
}

.mobile-photo {
  border-radius: var(--radius-sm);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  background: var(--bg-card);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.mobile-photo:hover {
  transform: scale(1.03);
  box-shadow: var(--shadow-hover);
}

.mobile-photo img {
  width: 100%;
  display: block;
}
</style>
