<template>
  <div class="page-wrapper">
    <!-- Scroll progress bar -->
    <div class="scroll-progress" :style="{ width: scrollProgress + '%' }"></div>

    <section class="letter-section">
      <div class="container">
        <div class="section-title">
          <div class="section-badge">✉️ A Letter</div>
          <div class="divider"></div>
        </div>

        <div class="letter-paper">
          <!-- Doodles -->
          <div class="doodle doodle-tl" aria-hidden="true">🌸</div>
          <div class="doodle doodle-tr" aria-hidden="true">✨</div>
          <div class="doodle doodle-bl" aria-hidden="true">🌟</div>
          <div class="doodle doodle-br" aria-hidden="true">🌷</div>

          <div class="letter-content">
            <p class="letter-date">{{ today }}</p>

            <p class="letter-greeting">To 曹蕊</p>

            <p>
              生日快乐！
              一眨眼你就是2开头的老人了哈哈哈，祝你永远年轻哈。
            </p>

            <p>
              emmm本来写信这个功能是早就设计好的，但是信的内容是最后才写的。确实蛮久没有静下心来写一大段话了，也不知道说啥。
              就简单回顾一下我参与了你的19岁的哪些吧。
            </p>

            <p>
              首先是南昌之行，我的评价就是夯爆了。当时的我呢，被挂科的阴霾笼罩着，不知道未来咋办。
              但是经过一起在南昌玩的几天，我释怀了很多也感受了很多，说实在的，最后分开坐高铁的时候确实很难过的。
            </p>

            <p>
              然后是暑假去广州，玩得很开心但是可能闹了点小矛盾，也还好；还有上个学期末，你路过武汉去山东，
              看到你在山东的海边和雪里写的我的名字也是很感动啊，感觉自己也是去过了哈哈。
              后面的寒假也玩得很开心。
            </p>

            <p>
              行吧，写到这里也憋不出什么话来了。对了还有这个网页啊，如果有什么不满意或者bug可以告诉我啊，
              我也想让它更好。
            </p>

            <p>
              最后祝你福如东海长流水，寿比南山不老松！也希望友谊长存。
            </p>

            <p class="letter-closing">
              <span class="letter-signature">Your friend, hxy </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const scrollProgress = ref(0)

function updateProgress() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0
}

const today = computed(() => {
  return new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
})

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>

<style scoped>
/* Scroll progress */
.scroll-progress {
  position: fixed;
  top: 60px;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-pink-deep), var(--color-lavender-deep), var(--accent));
  z-index: 200;
  transition: width 0.1s linear;
  border-radius: 0 2px 2px 0;
}

.page-wrapper {
  min-height: calc(100vh - 60px);
  background: var(--gradient-hero);
}

.letter-section {
  padding: 3rem 0 5rem;
}

.container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.25rem;
}

.section-title {
  text-align: center;
  margin-bottom: 2.5rem;
}

.section-badge {
  display: inline-block;
  background: var(--bg-card);
  color: var(--accent);
  font-size: var(--font-size-sm);
  font-weight: 700;
  padding: 0.35rem 1.1rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  margin-bottom: 0.75rem;
  letter-spacing: 0.03em;
}

.section-title h2 {
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.divider {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--color-pink-deep), var(--color-lavender-deep));
  border-radius: 2px;
  margin: 0 auto;
}

.letter-paper {
  position: relative;
  background: #FEFBF3;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg), inset 0 0 0 1px rgba(232, 160, 176, 0.15);
  padding: 4rem 3.5rem;
  max-width: 740px;
  margin: 0 auto;
  background-image: repeating-linear-gradient(
    transparent,
    transparent 31px,
    rgba(199, 206, 234, 0.3) 31px,
    rgba(199, 206, 234, 0.3) 32px
  );
  background-size: 100% 32px;
}

[data-theme="dark"] .letter-paper {
  background-color: rgba(40, 28, 50, 0.95);
  background-image: repeating-linear-gradient(
    transparent,
    transparent 31px,
    rgba(199, 206, 234, 0.08) 31px,
    rgba(199, 206, 234, 0.08) 32px
  );
}

.letter-content {
  position: relative;
  z-index: 1;
}

.letter-content p {
  font-size: 1.05rem;
  line-height: 2;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  font-weight: 500;
}

.letter-date {
  color: var(--text-muted) !important;
  font-size: 0.85rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.05em;
  margin-bottom: 2rem !important;
}

.letter-greeting {
  font-size: 1.4rem !important;
  font-weight: 800 !important;
  color: var(--accent) !important;
  margin-bottom: 1.5rem !important;
}

.letter-closing {
  margin-top: 2rem !important;
  font-size: 1.05rem !important;
  line-height: 1.8 !important;
}

.letter-signature {
  display: inline-block;
  font-size: 1.3rem;
  font-weight: 900;
  color: var(--accent);
  font-style: italic;
  margin-top: 0.5rem;
}

/* Doodles */
.doodle {
  position: absolute;
  font-size: 1.75rem;
  opacity: 0.35;
  pointer-events: none;
  animation: floatSlow 3s ease-in-out infinite;
}

.doodle-tl { top: 1.5rem; left: 1.5rem; animation-delay: 0s; }
.doodle-tr { top: 1.5rem; right: 1.5rem; animation-delay: 0.5s; }
.doodle-bl { bottom: 1.5rem; left: 1.5rem; animation-delay: 1s; }
.doodle-br { bottom: 1.5rem; right: 1.5rem; animation-delay: 1.5s; }

@media (max-width: 640px) {
  .letter-paper {
    padding: 2.5rem 1.5rem;
  }
}
</style>
