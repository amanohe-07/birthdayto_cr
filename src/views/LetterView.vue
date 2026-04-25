<template>
  <main class="letter">
    <div class="letter__envelope-icon">✉️</div>

    <article class="letter__paper card">
      <div class="letter__deco-top">
        <span v-for="d in topDeco" :key="d" class="letter__deco-item">{{ d }}</span>
      </div>

      <p class="letter__greeting reveal-hidden" ref="el0" :class="{ 'reveal-visible': visible[0] }">亲爱的 CR，</p>

      <p class="letter__para reveal-hidden" ref="el1" :class="{ 'reveal-visible': visible[1] }">
        不知道你打开这封信的时候，是什么样的心情。<br />
        也许你刚刚生日，也许你在某个普通的下午突然想起了这个小角落。
      </p>

      <p class="letter__para reveal-hidden" ref="el2" :class="{ 'reveal-visible': visible[2] }">
        无论如何，我想让你知道——<br />
        你值得被爱，值得一切美好。
      </p>

      <p class="letter__para reveal-hidden" ref="el3" :class="{ 'reveal-visible': visible[3] }">
        这些年来，你走过了那么多，也笑过了那么多。<br />
        你知道吗，你的笑容是这世界上最不需要理由就能让人快乐的东西。
      </p>

      <p class="letter__para reveal-hidden" ref="el4" :class="{ 'reveal-visible': visible[4] }">
        你会有很多很多个生日，但每一个都是独一无二的。<br />
        愿你的每一岁都比上一岁更勇敢，也更温柔。
      </p>

      <p class="letter__para reveal-hidden" ref="el5" :class="{ 'reveal-visible': visible[5] }">
        愿你所爱之人都爱你，<br />
        愿你想去的地方都能到达，<br />
        愿你做梦时轻盈，醒来时满足。
      </p>

      <p class="letter__para reveal-hidden" ref="el6" :class="{ 'reveal-visible': visible[6] }">
        这个小小的网页是为你而建的，<br />
        里面藏着我想对你说的话，和对你的祝愿。<br />
        希望每次打开，都能感受到被温柔包围。
      </p>

      <p class="letter__para reveal-hidden" ref="el7" :class="{ 'reveal-visible': visible[7] }">
        生日快乐，CR。<br />
        往后的每一年，都要被温柔以待。
      </p>

      <div class="letter__signature reveal-hidden" ref="el8" :class="{ 'reveal-visible': visible[8] }">
        <span class="letter__sign-deco">🌸 🌸 🌸</span>
        <p class="letter__sign-name">爱你的朋友</p>
        <p class="letter__sign-date">2006.05.01 ~ 永远</p>
      </div>

      <div class="letter__deco-bottom">
        <span v-for="d in bottomDeco" :key="d.id" class="letter__pressed-flower" :style="d.style">{{ d.char }}</span>
      </div>
    </article>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const topDeco = ['🌸', '✨', '💕', '⭐', '🌸']
const bottomDeco = [
  { id: 1, char: '🌺', style: { left: '10%', animationDelay: '0s' } },
  { id: 2, char: '🌸', style: { left: '30%', animationDelay: '0.4s' } },
  { id: 3, char: '💐', style: { left: '55%', animationDelay: '0.8s' } },
  { id: 4, char: '🌼', style: { left: '75%', animationDelay: '0.2s' } },
]

const refs = [ref(null), ref(null), ref(null), ref(null), ref(null), ref(null), ref(null), ref(null), ref(null)]
const [el0, el1, el2, el3, el4, el5, el6, el7, el8] = refs

const visible = ref(Array(9).fill(false))

let observers = []

onMounted(() => {
  refs.forEach((r, i) => {
    if (!r.value) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => { visible.value[i] = true }, i * 80)
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(r.value)
    observers.push(obs)
  })
})

onUnmounted(() => {
  observers.forEach(o => o.disconnect())
})
</script>

<style scoped>
.letter {
  min-height: calc(100vh - 60px);
  background: var(--gradient-hero);
  padding: var(--space-8) var(--space-4) var(--space-16);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.letter__envelope-icon {
  font-size: 3rem;
  margin-bottom: var(--space-4);
  animation: float 3s ease-in-out infinite;
}

.letter__paper {
  max-width: 640px;
  width: 100%;
  padding: var(--space-10) var(--space-8);
  position: relative;
  /* Aged paper texture via CSS gradients */
  background:
    radial-gradient(ellipse at 20% 30%, rgba(255, 240, 200, 0.15) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 70%, rgba(240, 200, 220, 0.1) 0%, transparent 60%),
    var(--bg-card);
  border-top: 3px solid var(--accent);
}

.letter__deco-top {
  display: flex;
  justify-content: center;
  gap: var(--space-3);
  margin-bottom: var(--space-8);
  font-size: 1.3rem;
}

.letter__deco-item {
  display: inline-block;
  animation: float 3s ease-in-out infinite;
}
.letter__deco-item:nth-child(2) { animation-delay: 0.3s; }
.letter__deco-item:nth-child(3) { animation-delay: 0.6s; }
.letter__deco-item:nth-child(4) { animation-delay: 0.9s; }
.letter__deco-item:nth-child(5) { animation-delay: 1.2s; }

.letter__greeting {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--accent);
  margin-bottom: var(--space-6);
  letter-spacing: 0.04em;
}

.letter__para {
  font-size: var(--font-size-base);
  color: var(--text-primary);
  line-height: 2;
  margin-bottom: var(--space-6);
  letter-spacing: 0.02em;
  /* Gentle indent like letter format */
  text-indent: 2em;
}

.letter__signature {
  margin-top: var(--space-8);
  padding-top: var(--space-6);
  border-top: 1px dashed var(--border-color);
  text-align: right;
}

.letter__sign-deco {
  display: block;
  font-size: 1.2rem;
  margin-bottom: var(--space-3);
  letter-spacing: 0.5rem;
}

.letter__sign-name {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--accent);
  margin-bottom: var(--space-1);
}

.letter__sign-date {
  font-size: var(--font-size-sm);
  color: var(--text-muted);
}

.letter__deco-bottom {
  position: relative;
  height: 40px;
  margin-top: var(--space-6);
}

.letter__pressed-flower {
  position: absolute;
  bottom: 0;
  font-size: 1.3rem;
  animation: float 4s ease-in-out infinite;
  opacity: 0.75;
}

@media (max-width: 640px) {
  .letter__paper {
    padding: var(--space-6) var(--space-5);
  }
  .letter__para { text-indent: 1em; }
}
</style>
