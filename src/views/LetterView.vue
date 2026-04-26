<template>
  <div class="page-wrapper">
    <!-- Scroll progress bar -->
    <div class="scroll-progress" :style="{ width: scrollProgress + '%' }"></div>

    <section class="letter-section">
      <div class="container">
        <div class="section-title">
          <div class="section-badge">✉️ A Letter</div>
          <h2>Dear CR 💌</h2>
          <div class="divider"></div>
        </div>

        <div class="letter-paper">
          <!-- Doodles -->
          <div class="doodle doodle-tl" aria-hidden="true">🌸</div>
          <div class="doodle doodle-tr" aria-hidden="true">✨</div>
          <div class="doodle doodle-bl" aria-hidden="true">💕</div>
          <div class="doodle doodle-br" aria-hidden="true">🌷</div>

          <div class="letter-content">
            <p class="letter-date">{{ today }}</p>

            <p class="letter-greeting">Dear CR,</p>

            <p>
              Okay so I've been trying to write this for a while, and every time I sit down to do it I end up
              staring at a blank page because where do you even start when someone means this much to you?
              But here goes — happy birthday. Like, truly, genuinely, from the bottom of my heart: happy birthday.
            </p>

            <p>
              I still remember when we first properly talked. I don't think either of us knew then that this was
              going to turn into something real and lasting. But here we are, and honestly? I'm so glad it did.
              You came into my life and just… made it better. Not in some dramatic, movie-montage kind of way —
              just quietly, consistently, in all the small ways that add up to a lot.
            </p>

            <p>
              You are one of those people who makes everything more fun just by being in the room.
              I've watched you light up conversations, make strangers feel welcome, and turn boring afternoons
              into something we'll talk about for years. That's a rare thing, CR. Not everyone has it.
              You do, and I hope you never stop knowing that.
            </p>

            <p>
              I also want to say — and I mean this — that I'm proud of you. This past year hasn't been
              perfectly smooth sailing for anyone, and you've handled it with more grace than I think you
              give yourself credit for. You kept going when things got hard. You showed up for the people
              who needed you. You took care of yourself even when it wasn't easy. That's growth, and it's
              worth celebrating just as much as the big milestones.
            </p>

            <p>
              Here are some things I hope for you in this new year of your life: I hope you get to travel
              somewhere that makes you feel completely alive. I hope you eat your favorite meal at least
              once a week (honestly you deserve it every day). I hope you find something new that excites you —
              a hobby, a show, a place, a person — and that it brings you real joy. I hope the things you've
              been working toward start to click into place, not because you've been worrying about them,
              but because you've been putting in the quiet, steady work.
            </p>

            <p>
              I hope you have more mornings where you wake up and just feel good. Not thrilled, not ecstatic —
              just good. Settled. Okay. Like the day is yours and you can do with it what you want.
              I think those ordinary, peaceful mornings are underrated, and you deserve a lot of them.
            </p>

            <p>
              Also — selfishly — I hope we get to make more memories together. More late nights that turn into
              early mornings. More random messages that turn into hour-long conversations. More moments where we're
              both laughing so hard at something that wouldn't even be funny to anyone else. Those are my favorite
              kind of moments, and I want more of them with you.
            </p>

            <p>
              There's this thing about birthdays — they're supposed to be about cake and presents and party hats,
              which, yes, absolutely, please. But they're also about pausing and recognizing that you exist in the
              world and that the world is genuinely better for it. And I believe that about you, CR. You make the
              world better. Not in some grand, sweeping way that ends up in history books — but in the real,
              human way that actually matters. The way you listen. The way you care. The way you show up.
            </p>

            <p>
              So on your birthday, I just want you to know: you are loved. You are appreciated. You are seen.
              And you deserve every single good thing that comes your way this year.
            </p>

            <p>
              Now go enjoy your day. Eat the cake. Take the nap. Do absolutely nothing productive if that's what
              you want. You've earned it just by being you.
            </p>

            <p class="letter-closing">
              With so much love and all the best vibes,<br>
              <span class="letter-signature">Your friend, always 💖</span>
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
