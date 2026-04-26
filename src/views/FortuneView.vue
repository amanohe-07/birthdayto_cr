<template>
  <div class="page-wrapper">
    <div class="feature-page">
      <RouterLink to="/" class="back-btn">← 返回首页</RouterLink>

      <div class="feature-header">
        <div class="feature-icon">🔮</div>
        <h1 class="feature-title">今日运势</h1>
        <p class="feature-sub">每天一签，生日当天必是大吉 ✨</p>
      </div>

      <div class="fortune-stage">
        <div
          class="fortune-card"
          :class="{ 'fortune-card--flipped': flipped }"
          @click="handleClick"
        >
          <div class="fortune-card__front">
            <div class="fortune-card__front-icon">🔮</div>
            <p class="fortune-card__front-hint">点击揭示今日运势 ✨</p>
          </div>
          <div class="fortune-card__back">
            <div class="fortune-grade">{{ today.grade }}</div>
            <div class="fortune-desc">{{ today.desc }}</div>
          </div>
        </div>

        <button v-if="flipped" class="fortune-retry" @click.stop="reset">
          🔄 明日再来
        </button>

        <p class="fortune-note">运势每天固定 · 生日 05/01 必得大吉</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const flipped = ref(false)

const grades = ['大吉', '中吉', '小吉', '末吉', '平', '小凶转吉']
const descs = [
  '柔风渐起，静待花开，好事将至。今日诸事皆宜，放心向前。',
  '雨后见彩虹，前路已清明，勇敢迈步，一切都会好起来。',
  '今日星光格外温柔，诸事皆宜，顺心如意，保持好心情。',
  '心中所愿，终会如期而至，耐心等候，好运慢慢靠近。',
  '小小阻碍不足挂齿，微笑迎接每一天，明天会更好。',
  '贵人相助，事半功倍，好运随行，今天会有意外惊喜。',
  '阳光总在风雨后，坚持就是胜利，你做得很棒。',
  '今日宜放慢脚步，感受生活的小美好，幸福就在身边。',
  '一切都在向好的方向发展，放心吧，你被温柔守护着。',
  '温柔待己，好运自来，今天会很美好，期待惊喜吧。',
  '平静的心湖里藏着惊喜，静待即可，好事悄悄靠近。',
  '小事皆顺，大事可期，心态轻盈，今天一定顺利。',
  '与美好相遇只是时间问题，今天会有温馨瞬间出现。',
  '内心平和便是最好的运势，今日宜放松，享受美好时光。',
  '凡事皆有转机，不必忧虑，前路明朗，充满可能。',
  '积极的心态是最强护身符，今天会顺利，值得期待。',
  '细水长流，慢慢来，每一步都算数，你在进步。',
  '今天适合思考与计划，灵感将涌现，好点子要记下来。',
  '你的努力终将开花结果，继续加油，未来光芒万丈。',
  '今日小吉，积小胜为大胜，向前走吧，你很厉害。',
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
    return {
      grade: '大吉',
      desc: '今天是你的生日！诸事大吉，万事如意，愿所有美好都与你相遇 🎂✨',
    }
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
.page-wrapper {
  min-height: calc(100vh - 60px);
  background: var(--gradient-hero);
  padding: 2rem 1.25rem 4rem;
}

.feature-page {
  max-width: 480px;
  margin: 0 auto;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: var(--font-size-sm);
  font-weight: 600;
  padding: 0.4rem 0.75rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  transition: all var(--transition-base);
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-sm);
}
.back-btn:hover {
  color: var(--accent);
  border-color: var(--accent);
  transform: translateX(-2px);
}

.feature-header {
  text-align: center;
  margin-bottom: 2rem;
  animation: fadeInUp 0.6s ease both;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  animation: floatSlow 3s ease-in-out infinite;
}

.feature-title {
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  font-weight: 900;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.feature-sub {
  color: var(--text-secondary);
  font-size: var(--font-size-base);
}

.fortune-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  animation: fadeInUp 0.6s ease 0.1s both;
}

.fortune-card {
  perspective: 900px;
  cursor: pointer;
  width: 100%;
  max-width: 360px;
  height: 240px;
  position: relative;
}

.fortune-card__front,
.fortune-card__back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: var(--radius-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  transition: transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 1.5px solid var(--border-color);
  box-shadow: var(--shadow-md);
}

.fortune-card__front {
  background: linear-gradient(135deg, var(--color-lavender) 0%, var(--color-sky) 100%);
  transform: rotateY(0deg);
}

.fortune-card__back {
  background: linear-gradient(135deg, var(--color-peach) 0%, var(--color-yellow) 100%);
  transform: rotateY(180deg);
}

.fortune-card--flipped .fortune-card__front { transform: rotateY(-180deg); }
.fortune-card--flipped .fortune-card__back { transform: rotateY(0deg); }

.fortune-card__front-icon {
  font-size: 3rem;
  animation: floatSlow 3s ease-in-out infinite;
}

.fortune-card__front-hint {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  font-weight: 600;
  text-align: center;
}

.fortune-grade {
  font-size: clamp(2rem, 6vw, 3rem);
  font-weight: 900;
  color: var(--text-primary);
}

.fortune-desc {
  font-size: var(--font-size-base);
  color: var(--text-secondary);
  text-align: center;
  line-height: 1.7;
}

.fortune-retry {
  background: var(--bg-card);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
  padding: 0.5rem 1.5rem;
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-family: var(--font-family);
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-sm);
}
.fortune-retry:hover {
  color: var(--accent);
  border-color: var(--accent);
  transform: translateY(-1px);
}

.fortune-note {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  text-align: center;
}
</style>
