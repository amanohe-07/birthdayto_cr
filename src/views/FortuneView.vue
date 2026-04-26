<template>
  <div class="page-wrapper">
    <div class="feature-page">
      <RouterLink to="/" class="back-btn">← 返回首页</RouterLink>

      <div class="feature-header">
        <div class="feature-icon">
          <img :src="tarotSvg" alt="tarot" class="feature-svg" />
        </div>
        <h1 class="feature-title">今日运势</h1>
        <p class="feature-sub">每天一签，仅供参考😜</p>
      </div>

      <div class="fortune-stage">
        <div
          class="fortune-card"
          :class="{ 'fortune-card--flipped': flipped }"
          @click="handleClick"
        >
          <div class="fortune-card__front">
            <div class="fortune-card__front-icon">
              <img :src="tarotSvg" alt="tarot" class="card-svg" />
            </div>
          </div>
          <div class="fortune-card__back">
            <div class="fortune-grade">{{ today.grade }}</div>
            <div class="fortune-desc">{{ today.desc }}</div>
          </div>
        </div>

        <button v-if="flipped" class="fortune-retry" @click.stop="reset">
          🔘不满意？转回去当没发生过
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import tarotSvg from '../assets/svg/tarot.svg'

const flipped = ref(false)

const grades = ['大吉', '中吉', '小吉', '末吉', '平', '小凶转吉']

// 每个等级对应的描述库（5条）
const descsByGrade = {
  '大吉': [
    '好事就在眼前。',
    '勇敢去做吧。',
    '今天会有惊喜。',
    '一切都是最好的安排。',
    '你的愿望快要实现了。',
  ],
  '中吉': [
    '再坚持一下就好了。',
    '适合主动沟通。',
    '小幸运正在路上。',
    '别着急，慢慢来。',
    '今天会遇到善意的人。',
  ],
  '小吉': [
    '放轻松，别想太多。',
    '留意身边的小确幸。',
    '适合整理旧物或心情。',
    '下午运势会更好。',
    '做点平时不敢做的事。',
  ],
  '末吉': [
    '别太在意小事。',
    '先放一放，明天再说。',
    '注意说话方式。',
    '冷静，再犹豫一下。',
    '坏事会变成好事。',
  ],
  '平': [
    '今天适合休息。',
    '没有消息就是好消息。',
    '顺其自然就好。',
    '做点喜欢的事吧。',
    '平淡才是真。',
  ],
  '小凶转吉': [
    '先苦后甜，别放弃。',
    '再忍一下，转机快来了。',
    '坏事后面跟着好事。',
    '把问题说出来。(找谁呢)',
    '运动能改运。（哈哈）',
  ],
}

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
      desc: '生日快乐哇！今天运气绝对是最佳，万事如意，想做什么就大胆去做吧 🎂✨',
    }
  }
  const seed = getDateSeed()
  // 先确定等级索引
  const gradeIdx = Math.floor(seededRandom(seed) * grades.length)
  const grade = grades[gradeIdx]
  // 再从该等级的描述库里随机取一条（使用不同种子，保证每天固定但不同）
  const descSeed = seed + gradeIdx * 100  // 偏移确保独立
  const descList = descsByGrade[grade]
  const descIdx = Math.floor(seededRandom(descSeed) * descList.length)
  const desc = descList[descIdx]
  return { grade, desc }
})

function handleClick() {
  if (!flipped.value) flipped.value = true
}

function reset() {
  flipped.value = false
}
</script>

<style scoped>
/* 引入手写字体 */
@font-face {
  font-family: 'Handwriting';
  src: url('../assets/ttf/handwriting.ttf') format('truetype');
  font-display: swap;
}

/* 页面内所有文字默认使用手写字体（保留 emoji 原有表现） */
.page-wrapper,
.feature-page,
.back-btn,
.feature-title,
.feature-sub,
.fortune-card__front,
.fortune-card__back,
.fortune-grade,
.fortune-desc,
.fortune-retry,
.fortune-note {
  font-family: 'Handwriting', cursive, 'Segoe UI', system-ui, -apple-system, sans-serif;
}

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
  display: flex;
  justify-content: center;
  align-items: center;
}

.feature-svg {
  width: 3rem;
  height: 3rem;
  display: block;
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

/* 亮色模式卡片渐变 */
.fortune-card__front {
  background: linear-gradient(135deg, var(--color-lavender) 0%, var(--color-sky) 100%);
  transform: rotateY(0deg);
}
.fortune-card__back {
  background: linear-gradient(135deg, var(--color-peach) 0%, var(--color-yellow) 100%);
  transform: rotateY(180deg);
}

/* 深色模式卡片渐变 - 使用深色系，保证文字对比度 */
[data-theme="dark"] .fortune-card__front {
  background: linear-gradient(135deg, #3a2a48 0%, #2a3a4a 100%);
}
[data-theme="dark"] .fortune-card__back {
  background: linear-gradient(135deg, #4a2a3a 0%, #4a3a2a 100%);
}

.fortune-card--flipped .fortune-card__front { transform: rotateY(-180deg); }
.fortune-card--flipped .fortune-card__back { transform: rotateY(0deg); }

.fortune-card__front-icon {
  font-size: 3rem;
  animation: floatSlow 3s ease-in-out infinite;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-svg {
  width: 3rem;
  height: 3rem;
  display: block;
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
  font-family: 'Handwriting', cursive;
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
  font-family: 'Handwriting', cursive;
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