<template>
  <div class="wishlist">
    <h3 class="wishlist__title">✨ 心愿清单</h3>
    <div class="wishlist__input-row">
      <input
        v-model="newWish"
        class="wishlist__input"
        placeholder="写下你的心愿…"
        maxlength="30"
        @keydown.enter="addWish"
      />
      <button class="wishlist__add-btn" @click="addWish" :disabled="!newWish.trim() || wishes.length >= 10">+</button>
    </div>
    <transition-group name="wish-list" tag="ul" class="wishlist__list">
      <li v-for="w in wishes" :key="w.id" class="wishlist__item" :class="{ 'wishlist__item--done': w.done }">
        <input type="checkbox" :id="'w'+w.id" v-model="w.done" @change="save" class="wishlist__check" />
        <label :for="'w'+w.id" class="wishlist__label">{{ w.text }}</label>
        <button class="wishlist__del" @click="removeWish(w.id)">×</button>
      </li>
    </transition-group>
    <p v-if="wishes.length === 0" class="wishlist__empty">还没有心愿，快添加吧 💕</p>
    <p v-if="wishes.length >= 10" class="wishlist__limit">已达上限 (10/10)</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const newWish = ref('')
const wishes = ref([])

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
  if (!text || wishes.value.length >= 10) return
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
.wishlist {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.wishlist__title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--text-primary);
}

.wishlist__input-row {
  display: flex;
  gap: 0.5rem;
}

.wishlist__input {
  flex: 1;
  padding: 0.5rem 0.875rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  outline: none;
  transition: border-color var(--transition-fast);
}
.wishlist__input:focus { border-color: var(--accent); }

.wishlist__add-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: var(--accent);
  color: #fff;
  font-size: 1.4rem;
  cursor: pointer;
  transition: transform var(--transition-fast), opacity var(--transition-fast);
  flex-shrink: 0;
  line-height: 1;
}
.wishlist__add-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.wishlist__add-btn:not(:disabled):hover { transform: scale(1.1); }

.wishlist__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  overflow-y: auto;
  max-height: 220px;
  flex: 1;
}

.wishlist__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 0.4rem 0.75rem;
  transition: opacity var(--transition-base);
}

.wishlist__item--done .wishlist__label {
  text-decoration: line-through;
  opacity: 0.5;
}

.wishlist__check { cursor: pointer; accent-color: var(--accent); }

.wishlist__label {
  flex: 1;
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  cursor: pointer;
  word-break: break-all;
}

.wishlist__del {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 1rem;
  padding: 0 0.2rem;
  transition: color var(--transition-fast);
}
.wishlist__del:hover { color: #e05060; }

.wishlist__empty, .wishlist__limit {
  font-size: var(--font-size-sm);
  color: var(--text-muted);
  text-align: center;
}

.wish-list-enter-active { animation: fadeInUp 0.3s ease; }
.wish-list-leave-active { transition: opacity 0.2s, transform 0.2s; }
.wish-list-leave-to { opacity: 0; transform: translateX(-10px); }
</style>
