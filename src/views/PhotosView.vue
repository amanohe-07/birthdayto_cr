<template>
  <main class="photos">
    <div class="photos__header reveal-hidden" ref="headerRef" :class="{ 'reveal-visible': headerVisible }">
      <h2 class="photos__title">📸 照片墙</h2>
      <p class="photos__sub">哈哈哈这里只有搞笑点的，你自己加吧</p>
    </div>

    <div class="photos__wall">
      <div
        v-for="photo in photos"
        :key="photo.id"
        class="photos__item"
        :class="{ 'photos__item--active': photo.active }"
        :style="photo.style"
        @click="togglePhoto(photo)"
      >
        <div class="photos__tape"></div>
        <img
          v-if="!photo.useFallback"
          :src="photo.src"
          :alt="`照片 ${photo.id}`"
          class="photos__img"
          @error="onImgError(photo)"
          loading="lazy"
        />
        <div v-else class="photos__fallback" :style="{ background: photo.fallbackBg }">
          <span class="photos__fallback-icon">{{ photo.fallbackIcon }}</span>
        </div>
        <button class="photos__delete" @click.stop="deletePhoto(photo.id)" title="删除照片">✕</button>
      </div>
    </div>

    <button class="photos__add-btn" @click="triggerFileSelect">+ 添加照片</button>
    <input
      type="file"
      ref="fileInput"
      accept="image/*"
      multiple
      style="display: none"
      @change="handleFileSelect"
    />
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const headerRef = ref(null)
const headerVisible = ref(false)
const fileInput = ref(null)

// 默认照片占位符图标和渐变色（用于默认图片加载失败时）
const fallbackIcons = ['🌸', '✨', '💕', '🎂', '⭐', '💫', '🌙', '🦋', '🍬', '💗', '🌈', '🎉']
const fallbackColors = [
  'linear-gradient(135deg,#f7c5d0,#d4b8e0)',
  'linear-gradient(135deg,#d4b8e0,#b8e0d4)',
  'linear-gradient(135deg,#b8e0d4,#fad4b4)',
  'linear-gradient(135deg,#fad4b4,#b4d4f0)',
  'linear-gradient(135deg,#b4d4f0,#f8e8b0)',
  'linear-gradient(135deg,#f8e8b0,#f7c5d0)',
  'linear-gradient(135deg,#f7c5d0,#b8e0d4)',
  'linear-gradient(135deg,#d4b8e0,#fad4b4)',
  'linear-gradient(135deg,#b8e0d4,#b4d4f0)',
  'linear-gradient(135deg,#fad4b4,#f8e8b0)',
  'linear-gradient(135deg,#b4d4f0,#f7c5d0)',
  'linear-gradient(135deg,#f8e8b0,#d4b8e0)',
]

// 尺寸类别：0=小(140px)，1=中(170px)，2=大(200px)
const sizeBuckets = [1, 2, 0, 1, 2, 0, 1, 0, 2, 1, 0, 2]
const widths = ['140px', '170px', '200px']

// 确定性随机函数（基于 id 和种子）
function seededRandom(seed) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

// 生成照片样式（旋转、偏移、宽度）
function generatePhotoStyle(id, sizeType) {
  const rotSign = id % 2 === 0 ? 1 : -1
  const rot = rotSign * (1 + (seededRandom(id * 7) * 5))  // -6 ~ +6 度
  const tx = (seededRandom(id * 13) * 18) - 9            // -9 ~ +9 px
  const ty = (seededRandom(id * 31) * 14) - 7            // -7 ~ +7 px
  const width = widths[sizeType]
  return {
    transform: `rotate(${rot}deg) translate(${tx}px, ${ty}px)`,
    width: width,
    zIndex: 1,
  }
}

// 生成默认照片（从 assets/photos/ 加载 01.png ~ 12.png）
function generateDefaultPhotos() {
  const defaultPhotos = []
  for (let i = 0; i < 12; i++) {
    const sizeType = sizeBuckets[i]
    const style = generatePhotoStyle(i, sizeType)
    defaultPhotos.push({
      id: i,
      src: new URL(`../assets/photos/${String(i + 1).padStart(2, '0')}.png`, import.meta.url).href,
      active: false,
      useFallback: false,
      fallbackBg: fallbackColors[i % fallbackColors.length],
      fallbackIcon: fallbackIcons[i % fallbackIcons.length],
      style: style,
    })
  }
  return defaultPhotos
}

// 从 localStorage 加载或初始化照片列表
const photos = ref([])

function loadPhotos() {
  const stored = localStorage.getItem('cr_photos')
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      // 恢复时重新生成样式（确保样式属性完整，并且 active 重置为 false）
      photos.value = parsed.map(p => ({
        ...p,
        active: false,
        style: generatePhotoStyle(p.id, p.sizeType || (p.style?.width ? widths.indexOf(p.style.width) : 1)),
      }))
      return
    } catch (e) {}
  }
  // 无存储则加载默认照片
  photos.value = generateDefaultPhotos()
  // 保存一份默认数据
  savePhotos()
}

function savePhotos() {
  // 存储时只保留必要字段，不存储 style 中的计算值（恢复时会重新生成）
  const toStore = photos.value.map(p => ({
    id: p.id,
    src: p.src,
    useFallback: p.useFallback,
    fallbackBg: p.fallbackBg,
    fallbackIcon: p.fallbackIcon,
    sizeType: widths.findIndex(w => w === p.style.width),
  }))
  localStorage.setItem('cr_photos', JSON.stringify(toStore))
}

watch(photos, () => savePhotos(), { deep: true })

// 图片加载失败时显示 fallback
function onImgError(photo) {
  photo.useFallback = true
}

// 点击切换选中状态（点击后放大，再次点击其他照片会切换）
function togglePhoto(photo) {
  const wasActive = photo.active
  photos.value.forEach(p => { p.active = false; p.style.zIndex = 1 })
  if (!wasActive) {
    photo.active = true
    photo.style.zIndex = 10
  }
}

// 删除照片
function deletePhoto(id) {
  photos.value = photos.value.filter(p => p.id !== id)
  // 如果删除后没有照片了，可以可选重新添加默认照片，但不强制
}

// 添加照片
function triggerFileSelect() {
  fileInput.value.click()
}

function handleFileSelect(event) {
  const files = Array.from(event.target.files)
  if (files.length === 0) return

  // 获取当前最大 id
  let maxId = photos.value.length > 0 ? Math.max(...photos.value.map(p => p.id)) : -1

  files.forEach((file, idx) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target.result
      const newId = maxId + idx + 1
      // 为新照片随机分配尺寸类别 (0,1,2)
      const sizeType = Math.floor(Math.random() * 3)
      const style = generatePhotoStyle(newId, sizeType)
      photos.value.push({
        id: newId,
        src: dataUrl,
        active: false,
        useFallback: false,
        fallbackBg: fallbackColors[newId % fallbackColors.length],
        fallbackIcon: fallbackIcons[newId % fallbackIcons.length],
        style: style,
        sizeType: sizeType,
      })
    }
    reader.readAsDataURL(file)
  })
  // 清空 input 值，以便同一文件可以重复添加
  event.target.value = ''
}

// IntersectionObserver 控制标题动画
let observer = null
onMounted(() => {
  loadPhotos()
  observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) headerVisible.value = true },
    { threshold: 0.1 }
  )
  if (headerRef.value) observer.observe(headerRef.value)
})
onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.photos {
  min-height: calc(100vh - 60px);
  background: var(--gradient-hero);
  padding: var(--space-8) var(--space-4) var(--space-16);
  position: relative;
}

.photos__header {
  text-align: center;
  padding: var(--space-8) var(--space-4) var(--space-6);
}

.photos__title {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.photos__sub {
  color: var(--text-secondary);
  font-size: var(--font-size-base);
}

.photos__wall {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-5);
  padding: var(--space-4) var(--space-2);
}

.photos__item {
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.35s ease,
              z-index 0s;
  border-radius: var(--radius-sm);
  box-shadow: 2px 4px 16px rgba(120, 60, 80, 0.18);
}

.photos__item:hover {
  transform: rotate(0deg) translateY(-6px) scale(1.03) !important;
  box-shadow: 4px 12px 32px rgba(120, 60, 80, 0.28);
  z-index: 5 !important;
}

.photos__item--active {
  animation: sway 0.5s ease;
  box-shadow: 6px 16px 40px rgba(120, 60, 80, 0.35) !important;
  z-index: 10 !important;
}

/* 胶带 */
.photos__tape {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%) rotate(-1deg);
  width: 44px;
  height: 18px;
  background: rgba(255, 240, 200, 0.65);
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  z-index: 2;
  pointer-events: none;
}

.photos__item:nth-child(even) .photos__tape {
  transform: translateX(-50%) rotate(1.5deg);
}
.photos__item:nth-child(3n) .photos__tape {
  transform: translateX(-40%) rotate(-2.5deg);
}

.photos__img {
  display: block;
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  border-radius: var(--radius-sm);
  pointer-events: none;
  user-select: none;
}

.photos__fallback {
  width: 100%;
  aspect-ratio: 3/4;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
}

.photos__fallback-icon {
  font-size: 2.5rem;
  opacity: 0.7;
}

/* 白色边框模拟拍立得相纸 */
.photos__item::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 4px solid rgba(255, 255, 255, 0.9);
  border-bottom-width: 24px;
  border-radius: var(--radius-sm);
  pointer-events: none;
  box-shadow: inset 0 0 0 1px rgba(200, 160, 180, 0.2);
}

/* 删除按钮 */
.photos__delete {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 20;
  backdrop-filter: blur(2px);
}
.photos__item:hover .photos__delete {
  opacity: 1;
}
.photos__delete:hover {
  background: rgba(200, 60, 60, 0.8);
}

/* 添加照片按钮 */
.photos__add-btn {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--accent, #e8a0b0);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 40px;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  cursor: pointer;
  z-index: 100;
  transition: transform 0.2s, background 0.2s;
}
.photos__add-btn:hover {
  transform: scale(1.02);
  background: #d48a9a;
}

/* 移动端适配 – 错落布局，取消强制统一宽度 */
@media (max-width: 640px) {
  .photos__wall {
    gap: var(--space-4);
  }
  /* 原有媒体查询的强制宽度被移除，让不同照片自然保持不同大小 */
  .photos__item {
    /* 确保小屏不超出，但保留各自宽度（小140/中170/大200）会自适应容器 */
    max-width: calc(50% - 0.8rem);
    flex-shrink: 1;
  }
  /* 调整胶带大小 */
  .photos__tape {
    width: 32px;
    height: 14px;
    top: -8px;
  }
  .photos__add-btn {
    padding: 10px 16px;
    font-size: 0.9rem;
    bottom: 16px;
    right: 16px;
  }
}

@keyframes sway {
  0% { transform: rotate(0deg) translateY(0); }
  50% { transform: rotate(1deg) translateY(-4px); }
  100% { transform: rotate(0deg) translateY(0); }
}
</style>