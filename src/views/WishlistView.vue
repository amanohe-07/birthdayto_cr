<template>
  <div class="page-wrapper">
    <div class="feature-page">
      <RouterLink to="/" class="back-btn">← 返回首页</RouterLink>

      <div class="feature-header">
        <div class="feature-icon">✨</div>
        <h1 class="feature-title">心愿单</h1>
        <p class="feature-sub">写下你的心愿，慢慢去实现 💕</p>
      </div>

      <div class="wishlist-card card">
        <div class="wishlist-input-row">
          <input
            v-model="newWish"
            class="wishlist-input"
            placeholder="写下你的心愿…"
            maxlength="40"
            @keydown.enter="addWish"
          />
          <button
            class="wishlist-add-btn"
            @click="addWish"
            :disabled="!newWish.trim() || wishes.length >= 20"
            title="添加心愿"
          >+</button>
        </div>

        <transition-group name="wish-list" tag="ul" class="wishlist-list">
          <li
            v-for="w in wishes"
            :key="w.id"
            class="wishlist-item"
            :class="{ 'wishlist-item--done': w.done }"
          >
            <input
              type="checkbox"
              :id="'w' + w.id"
              v-model="w.done"
              @change="save"
              class="wishlist-check"
            />
            <label :for="'w' + w.id" class="wishlist-label">{{ w.text }}</label>
            <button class="wishlist-del" @click="removeWish(w.id)" title="删除">×</button>
          </li>
        </transition-group>

        <p v-if="wishes.length === 0" class="wishlist-empty">还没有心愿，快添加吧 💕</p>
        <p v-if="wishes.length >= 20" class="wishlist-limit">已达上限 (20/20)</p>

        <div v-if="wishes.length > 0" class="wishlist-stats">
          已完成 {{ doneCount }} / {{ wishes.length }} 个心愿
          <span v-if="doneCount === wishes.length && wishes.length > 0"> 🎉 全部实现啦！</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const newWish = ref('')
const wishes = ref([])

const doneCount = computed(() => wishes.value.filter(w => w.done).length)

function loadWishes() {
  try {
    const stored = localStorage.getItem('cr_wishlist')
    if (stored) wishes.value = JSON.parse(stored)
  } catch (e) {}
}

function save() {
  try {
    localStorage.setItem('cr_wishlist', JSON.stringify(wishes.value))
  } catch (e) {}
}

function addWish() {
  const text = newWish.value.trim()
  if (!text || wishes.value.length >= 20) return
  wishes.value.push({ id: Date.now(), text, done: false })
  newWish.value = ''
  save()
}

function removeWish(id) {
  wishes.value = wishes.value.filter(w => w.id !== id)
  save()
}

onMounted(loadWishes)
</script>

<style scoped>
.page-wrapper {
  min-height: calc(100vh - 60px);
  background: var(--gradient-hero);
  padding: 2rem 1.25rem 4rem;
  position: relative;
}

.feature-page {
  max-width: 600px;
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

.wishlist-card {
  padding: 1.75rem;
  animation: fadeInUp 0.6s ease 0.1s both;
}

.wishlist-input-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.wishlist-input {
  flex: 1;
  padding: 0.6rem 1rem;
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-full);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  outline: none;
  transition: border-color var(--transition-fast);
}
.wishlist-input:focus { border-color: var(--accent); }
.wishlist-input::placeholder { color: var(--text-muted); }

.wishlist-add-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: var(--accent);
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--transition-fast), opacity var(--transition-fast);
  flex-shrink: 0;
  line-height: 1;
  box-shadow: var(--shadow-sm);
}
.wishlist-add-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.wishlist-add-btn:not(:disabled):hover { transform: scale(1.12); }

.wishlist-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 420px;
  overflow-y: auto;
}

.wishlist-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 0.55rem 0.875rem;
  transition: opacity var(--transition-base);
  animation: fadeInUp 0.3s ease both;
}

.wishlist-item--done .wishlist-label {
  text-decoration: line-through;
  opacity: 0.45;
}

.wishlist-check { cursor: pointer; accent-color: var(--accent); flex-shrink: 0; }

.wishlist-label {
  flex: 1;
  font-size: var(--font-size-base);
  color: var(--text-primary);
  cursor: pointer;
  word-break: break-all;
  line-height: 1.5;
}

.wishlist-del {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 1.1rem;
  padding: 0 0.2rem;
  transition: color var(--transition-fast);
  flex-shrink: 0;
}
.wishlist-del:hover { color: #e05060; }

.wishlist-empty, .wishlist-limit {
  font-size: var(--font-size-sm);
  color: var(--text-muted);
  text-align: center;
  padding: 1.5rem 0;
}

.wishlist-stats {
  margin-top: 1rem;
  padding-top: 0.875rem;
  border-top: 1px solid var(--border-color);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  text-align: center;
}

.wish-list-enter-active { animation: fadeInUp 0.3s ease; }
.wish-list-leave-active { transition: opacity 0.2s, transform 0.2s; }
.wish-list-leave-to { opacity: 0; transform: translateX(-12px); }
</style>
