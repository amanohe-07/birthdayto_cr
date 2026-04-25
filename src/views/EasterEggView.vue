<template>
  <div class="page-wrapper">
    <section class="section">
      <div class="container">
        <div class="section-title">
          <div class="badge">🥚 Easter Eggs</div>
          <h2 class="mt-2">Shh… secrets inside 🤫</h2>
          <div class="divider"></div>
          <p class="text-secondary">Look around — there might be something hidden just for you 🌟</p>
        </div>

        <!-- Easter Egg B: Secret Celebration -->
        <div class="egg-section card reveal" ref="eggBRef">
          <div class="egg-header">
            <span class="egg-num">🎊</span>
            <div>
              <h3>Secret Celebration</h3>
              <p class="text-secondary">Try clicking the cake button… 🤔</p>
            </div>
          </div>

          <div class="cake-trigger-area">
            <button
              class="cake-btn"
              @click="handleCakeClick"
              @touchstart.prevent="startLongPress"
              @touchend.prevent="endLongPress"
              :class="{ shaking: cakeClicks > 0 && cakeClicks < 5 }"
              title="Click me... a lot"
            >
              🎂
              <span v-if="cakeClicks > 0 && cakeClicks < 5" class="click-badge">{{ cakeClicks }}/5</span>
            </button>
            <p class="cake-hint">
              <span v-if="cakeClicks === 0">Click 5 times to unlock!</span>
              <span v-else-if="cakeClicks < 5">{{ 5 - cakeClicks }} more to go…</span>
              <span v-else>🎊 You did it!</span>
            </p>
          </div>
        </div>

        <!-- Easter Egg D: Time Capsule -->
        <div class="egg-section card reveal" ref="eggDRef" style="transition-delay: 0.2s">
          <div class="egg-header">
            <span class="egg-num">💌</span>
            <div>
              <h3>Time Capsule</h3>
              <p class="text-secondary">Leave a message for CR — it'll be saved right here!</p>
            </div>
          </div>

          <form class="capsule-form" @submit.prevent="saveMessage">
            <div class="form-group">
              <label class="form-label">Your Name</label>
              <input
                v-model="form.name"
                class="form-input"
                type="text"
                placeholder="Your name 🌸"
                maxlength="60"
                required
              />
            </div>
            <div class="form-group">
              <label class="form-label">Your Message to CR</label>
              <textarea
                v-model="form.message"
                class="form-textarea"
                placeholder="Write something sweet… 💕"
                maxlength="500"
                required
              ></textarea>
            </div>
            <button type="submit" class="btn btn-primary w-full">
              💾 Save to Time Capsule
            </button>
          </form>

          <!-- Saved messages -->
          <div class="messages-list" v-if="messages.length > 0">
            <h4 class="mt-4 mb-2">Saved Messages ({{ messages.length }}) 📬</h4>
            <div
              v-for="(msg, i) in messages"
              :key="msg.id"
              class="message-item"
            >
              <div class="message-meta">
                <span class="message-author">{{ msg.name }}</span>
                <span class="message-date">{{ formatDate(msg.timestamp) }}</span>
              </div>
              <p class="message-text">{{ msg.message }}</p>
              <button class="delete-btn" @click="deleteMessage(msg.id)" title="Delete">✕</button>
            </div>
          </div>
          <div v-else class="no-messages">
            <p>No messages yet — be the first! 🎈</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Celebration overlay -->
    <Transition name="celebrate">
      <div v-if="celebrating" class="celebrate-overlay" @click="celebrating = false">
        <!-- Confetti -->
        <div
          v-for="c in confetti"
          :key="c.id"
          class="confetti-piece"
          :style="c.style"
        ></div>
        <div class="celebrate-message animate-bounce-in">
          <p class="celebrate-big">🎊</p>
          <h2>YOU FOUND IT!</h2>
          <p class="celebrate-sub">You're amazing, CR! 🎉✨💖</p>
          <button class="btn btn-primary mt-3" @click="celebrating = false">Yay! 🎉</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// --- Secret Celebration (Egg B) ---
const cakeClicks = ref(0)
const celebrating = ref(false)
let clickTimer = null
let longPressTimer = null

const CONFETTI_COLORS = ['#FFB7C5','#B5EAD7','#FFDAC1','#C7CEEA','#FFFACD','#FF9AA2','#AED6F1','#FFC8DD']

const confetti = Array.from({ length: 60 }, (_, i) => {
  const angle = (i / 60) * 360
  const distance = 120 + Math.random() * 250
  const dx = Math.cos((angle * Math.PI) / 180) * distance
  const dy = Math.sin((angle * Math.PI) / 180) * distance - 150
  const size = 8 + Math.random() * 10
  const delay = Math.random() * 0.4
  const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length]
  const isCircle = i % 3 === 0
  return {
    id: i,
    style: {
      width: size + 'px',
      height: size + 'px',
      background: color,
      borderRadius: isCircle ? '50%' : '2px',
      '--dx': dx + 'px',
      '--dy': dy + 'px',
      animationDelay: delay + 's',
      animationDuration: (0.8 + Math.random() * 0.6) + 's',
    }
  }
})

function handleCakeClick() {
  cakeClicks.value++
  if (clickTimer) clearTimeout(clickTimer)
  clickTimer = setTimeout(() => {
    if (cakeClicks.value < 5) cakeClicks.value = 0
  }, 3000)
  if (cakeClicks.value >= 5) {
    cakeClicks.value = 5
    clearTimeout(clickTimer)
    triggerCelebration()
  }
}

function startLongPress() {
  longPressTimer = setTimeout(() => {
    triggerCelebration()
  }, 2000)
}

function endLongPress() {
  if (longPressTimer) clearTimeout(longPressTimer)
}

function triggerCelebration() {
  celebrating.value = true
  setTimeout(() => {
    if (celebrating.value) celebrating.value = false
    cakeClicks.value = 0
  }, 6000)
}

// --- Time Capsule (Egg D) ---
const form = ref({ name: '', message: '' })
const messages = ref([])

function loadMessages() {
  try {
    const saved = localStorage.getItem('cr_timecapsule')
    if (saved) messages.value = JSON.parse(saved)
  } catch {}
}

function saveMessage() {
  const newMsg = {
    id: Date.now(),
    name: form.value.name.trim(),
    message: form.value.message.trim(),
    timestamp: new Date().toISOString()
  }
  messages.value.unshift(newMsg)
  localStorage.setItem('cr_timecapsule', JSON.stringify(messages.value))
  form.value = { name: '', message: '' }
}

function deleteMessage(id) {
  messages.value = messages.value.filter(m => m.id !== id)
  localStorage.setItem('cr_timecapsule', JSON.stringify(messages.value))
}

function formatDate(iso) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

// Scroll reveal
const eggBRef = ref(null)
const eggDRef = ref(null)
let observer = null

onMounted(() => {
  loadMessages()
  observer = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
    { threshold: 0.1 }
  )
  if (eggBRef.value) observer.observe(eggBRef.value)
  if (eggDRef.value) observer.observe(eggDRef.value)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
  if (clickTimer) clearTimeout(clickTimer)
  if (longPressTimer) clearTimeout(longPressTimer)
})
</script>

<style scoped>
.egg-section {
  max-width: 680px;
  margin: 0 auto 2rem;
}

.egg-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.egg-num {
  font-size: 2rem;
  flex-shrink: 0;
  line-height: 1;
}

.egg-header h3 {
  margin-bottom: 0.2rem;
}

/* Cake button */
.cake-trigger-area {
  text-align: center;
  padding: 2rem 1rem;
}

.cake-btn {
  position: relative;
  font-size: 4rem;
  cursor: pointer;
  border: none;
  background: none;
  transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: inline-block;
  line-height: 1;
  user-select: none;
}

.cake-btn:hover {
  transform: scale(1.15);
}

.cake-btn:active {
  transform: scale(0.9);
}

.cake-btn.shaking {
  animation: shake 0.4s ease;
}

@keyframes shake {
  0%,100% { transform: rotate(0); }
  20% { transform: rotate(-12deg) scale(1.1); }
  40% { transform: rotate(12deg) scale(1.15); }
  60% { transform: rotate(-8deg) scale(1.1); }
  80% { transform: rotate(8deg); }
}

.click-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--color-primary);
  color: var(--text-on-primary);
  font-size: 0.7rem;
  font-weight: 900;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family);
}

.cake-hint {
  margin-top: 1rem;
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 700;
}

/* Time Capsule */
.capsule-form { margin-top: 0.5rem; }

.messages-list {
  margin-top: 1.5rem;
  border-top: 1px solid var(--border-color);
  padding-top: 1.5rem;
}

.message-item {
  position: relative;
  background: var(--bg-main);
  border-radius: var(--radius-sm);
  padding: 1rem 2.5rem 1rem 1rem;
  margin-bottom: 0.75rem;
  border: 1px solid var(--border-color);
  transition: transform 0.2s ease;
}

.message-item:hover { transform: translateX(4px); }

.message-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.4rem;
  flex-wrap: wrap;
}

.message-author {
  font-weight: 800;
  font-size: 0.9rem;
  color: var(--color-primary);
}

.message-date {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.message-text {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
  word-break: break-word;
}

.delete-btn {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-muted);
  font-size: 0.7rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.delete-btn:hover {
  background: #FF9AA2;
  border-color: #FF9AA2;
  color: white;
}

.no-messages {
  text-align: center;
  padding: 2rem;
  color: var(--text-muted);
  font-size: 0.95rem;
}

/* Celebration overlay */
.celebrate-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.75);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.celebrate-message {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  padding: 3rem 2.5rem;
  text-align: center;
  box-shadow: var(--shadow-lg);
  max-width: 360px;
  width: 90%;
  cursor: auto;
  z-index: 1001;
  position: relative;
}

.celebrate-big {
  font-size: 4rem;
  line-height: 1;
  margin-bottom: 0.75rem;
  animation: bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.celebrate-message h2 {
  font-size: 2rem;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.celebrate-sub {
  color: var(--text-secondary);
  font-size: 1.05rem;
}

/* Confetti */
.confetti-piece {
  position: absolute;
  top: 50%;
  left: 50%;
  animation: confetti-fly forwards;
  opacity: 0;
}

@keyframes confetti-fly {
  0% {
    transform: translate(-50%, -50%) translate(0, 0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) translate(var(--dx), var(--dy)) rotate(720deg);
    opacity: 0;
  }
}

/* Page transition */
.celebrate-enter-active { transition: opacity 0.3s ease; }
.celebrate-leave-active { transition: opacity 0.3s ease; }
.celebrate-enter-from, .celebrate-leave-to { opacity: 0; }
</style>
