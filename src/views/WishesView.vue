<template>
  <div class="page-wrapper">
    <section class="section">
      <div class="container">
        <div class="section-title">
          <div class="badge">💌 Birthday Wishes</div>
          <h2 class="mt-2">Wishes for CR 🎉</h2>
          <div class="divider"></div>
          <p class="text-secondary">Some love, some laughs, and a whole lot of good vibes ✨</p>
        </div>

        <div class="wishes-grid">
          <div
            v-for="(wish, i) in wishes"
            :key="i"
            class="wish-card reveal"
            :ref="el => cardRefs[i] = el"
            :style="{ transitionDelay: (i % 4) * 0.1 + 's', '--card-color': wish.color }"
          >
            <div class="wish-icon">{{ wish.icon }}</div>
            <p class="wish-text">{{ wish.text }}</p>
            <div class="wish-accent"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const wishes = [
  { icon: '🥂', text: "Hey CR! Another year older, another year more awesome. Cheers to you!", color: '#FFB7C5' },
  { icon: '🎉', text: "Wishing you a birthday filled with all your favorite things — good food, good vibes, and zero Monday energy!", color: '#B5EAD7' },
  { icon: '🌟', text: "CR, you're literally one of the best people I know. Happy Birthday!! Truly!", color: '#FFDAC1' },
  { icon: '💕', text: "May this year bring you all the good stuff and none of the bad stuff. Simple as that!", color: '#C7CEEA' },
  { icon: '🎂', text: "You deserve all the cake today! (And maybe tomorrow too, let's be real) 😄", color: '#FFFACD' },
  { icon: '🌍', text: "Another trip around the sun complete! You're doing great, CR. Keep going!", color: '#FF9AA2' },
  { icon: '✨', text: "Happiest of birthdays to someone who always makes everything more fun and memorable!", color: '#AED6F1' },
  { icon: '☕', text: "Here's to you, CR! May your wifi be fast, your coffee be hot, and your days be great.", color: '#B5EAD7' },
  { icon: '🤗', text: "Sending you the biggest birthday hug from across the screen! You are so loved 💖", color: '#FFB7C5' },
  { icon: '💅', text: "Not a year older — just a year more experienced, wiser, and absolutely fabulous!", color: '#FFDAC1' },
  { icon: '🌈', text: "Hope your birthday is as wonderful as you are — and that's saying A LOT! Seriously 🌈", color: '#C7CEEA' },
  { icon: '🎈', text: "Just wanted to say: you're the best, I'm glad you were born, and happy birthday! 🎈", color: '#B5EAD7' }
]

const cardRefs = ref([])
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.12 }
  )

  cardRefs.value.forEach((el) => {
    if (el) observer.observe(el)
  })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.wishes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
}

.wish-card {
  background: var(--bg-card);
  border-radius: var(--radius-md);
  padding: 1.75rem 1.5rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.6s ease;
  cursor: default;
}

.wish-card:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow: var(--shadow-hover);
}

.wish-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--card-color, var(--color-primary));
  border-radius: var(--radius-md) var(--radius-md) 0 0;
}

.wish-icon {
  font-size: 2.25rem;
  margin-bottom: 1rem;
  display: block;
  animation: pulse-soft 3s ease-in-out infinite;
}

@keyframes pulse-soft {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.wish-text {
  color: var(--text-primary);
  font-size: 0.95rem;
  line-height: 1.7;
  font-weight: 600;
}
</style>
