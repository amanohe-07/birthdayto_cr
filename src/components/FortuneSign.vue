<template>
  <div class="fortune-wrap">
    <h3 class="fortune-title">🔮 今日运势</h3>
    <div class="fortune-card" :class="{ 'fortune-card--flipped': flipped }" @click="handleClick">
      <div class="fortune-card__front">
        <span class="fortune-card__hint">点击揭示 ✨</span>
        <div class="fortune-card__icon">🔮</div>
      </div>
      <div class="fortune-card__back">
        <div class="fortune-grade">{{ today.grade }}</div>
        <div class="fortune-desc">{{ today.desc }}</div>
        <div class="fortune-retry" @click.stop="reset">再抽一次 🔄</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const flipped = ref(false)

const grades = ['大吉', '中吉', '小吉', '末吉', '平', '小凶转吉']
const descs = [
  '柔风渐起，静待花开，好事将至。',
  '雨后见彩虹，前路已清明，勇敢向前。',
  '今日星光格外温柔，诸事皆宜，顺心如意。',
  '心中所愿，终会如期而至，耐心等候。',
  '小小困难不足挂齿，微笑迎接每一天。',
  '贵人相助，事半功倍，好运随行。',
  '阳光总在风雨后，坚持就是胜利。',
  '今日宜放慢脚步，感受生活的小美好。',
  '一切都在向好的方向发展，放心吧。',
  '温柔待己，好运自来，今天会很美好。',
  '平静的心湖里藏着惊喜，静待即可。',
  '小事皆顺，大事可期，心态轻盈。',
  '与美好相遇只是时间问题，今天会有惊喜。',
  '内心平和便是最好的运势，今日宜放松。',
  '凡事皆有转机，不必忧虑，前路明朗。',
  '积极的心态是最强的护身符，今天会顺利。',
  '细水长流，慢慢来，每一步都算数。',
  '今天适合思考与计划，灵感将会涌现。',
  '你的努力终将开花结果，继续加油💪',
  '今日小吉，积小胜为大胜，向前走吧。',
]

function getDateSeed() {
  const now = new Date()
  return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate()
}

function isBirthday() {
  const now = new Date()
  return now.getMonth() + 1 === 5 && now.getDate() === 1
}

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

const today = computed(() => {
  if (isBirthday()) {
    return { grade: '大吉', desc: '今天是你的生日！诸事大吉，万事如意 🎂✨' }
  }
  const seed = getDateSeed()
  const gi = Math.floor(seededRandom(seed) * grades.length)
  const di = Math.floor(seededRandom(seed + 1) * descs.length)
  return { grade: grades[gi], desc: descs[di] }
})

function handleClick() {
  if (!flipped.value) flipped.value = true
}

function reset() {
  flipped.value = false
}
</script>

<style scoped>
.fortune-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  height: 100%;
  align-items: flex-start;
}

.fortune-title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--text-primary);
}

.fortune-card {
  perspective: 800px;
  cursor: pointer;
  flex: 1;
  width: 100%;
  min-height: 180px;
  position: relative;
}

.fortune-card__front,
.fortune-card__back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem;
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 1px solid var(--border-color);
}

.fortune-card__front {
  background: linear-gradient(135deg, var(--color-lavender) 0%, var(--color-sky) 100%);
  transform: rotateY(0deg);
}

.fortune-card__back {
  background: linear-gradient(135deg, var(--color-peach) 0%, var(--color-yellow) 100%);
  transform: rotateY(180deg);
}

.fortune-card--flipped .fortune-card__front {
  transform: rotateY(-180deg);
}

.fortune-card--flipped .fortune-card__back {
  transform: rotateY(0deg);
}

.fortune-card__hint {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.fortune-card__icon {
  font-size: 2.5rem;
  animation: float 3s ease-in-out infinite;
}

.fortune-grade {
  font-size: var(--font-size-3xl);
  font-weight: 800;
  color: var(--text-primary);
}

.fortune-desc {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  text-align: center;
  line-height: 1.6;
}

.fortune-retry {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--border-color);
  transition: color var(--transition-fast);
}
.fortune-retry:hover { color: var(--accent); }
</style>
