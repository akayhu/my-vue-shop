<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const slides = [
  {
    title: '秋季新品上市',
    subtitle: '精選耳機與鍵盤，全館新品 85 折起',
    cta: '立即選購',
    to: { path: '/products', query: { search: '耳機' } },
    className: 'slide-a'
  },
  {
    title: '會員限定優惠',
    subtitle: '登入即享免運到府，訂單追蹤一目瞭然',
    cta: '前往登入',
    to: '/login',
    className: 'slide-b'
  },
  {
    title: '熱銷排行榜',
    subtitle: '本月最多人加入購物車的週邊，手刀搶購',
    cta: '看看大家在買什麼',
    to: '/products',
    className: 'slide-c'
  }
];

const current = ref(0);
let timer = null;

const goTo = (index) => {
  current.value = index;
};

const next = () => {
  current.value = (current.value + 1) % slides.length;
};

const prev = () => {
  current.value = (current.value - 1 + slides.length) % slides.length;
};

const startAutoplay = () => {
  timer = setInterval(next, 5000);
};

const stopAutoplay = () => {
  clearInterval(timer);
};

onMounted(startAutoplay);
onUnmounted(stopAutoplay);
</script>

<template>
  <section
    class="carousel"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
  >
    <div
      class="track"
      :style="{ transform: `translateX(-${current * 100}%)` }"
    >
      <div v-for="(slide, i) in slides" :key="i" class="slide" :class="slide.className">
        <div class="slide-content container">
          <h1>{{ slide.title }}</h1>
          <p>{{ slide.subtitle }}</p>
          <RouterLink :to="slide.to" class="cta">{{ slide.cta }}</RouterLink>
        </div>
      </div>
    </div>

    <button class="arrow arrow-prev" @click="prev" aria-label="上一張">←</button>
    <button class="arrow arrow-next" @click="next" aria-label="下一張">→</button>

    <div class="dots">
      <button
        v-for="(slide, i) in slides"
        :key="i"
        class="dot"
        :class="{ active: i === current }"
        @click="goTo(i)"
        :aria-label="`第 ${i + 1} 張`"
      />
    </div>
  </section>
</template>

<style scoped>
.carousel {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius);
  margin: 1.5rem auto 0;
  max-width: 1120px;
}

.track {
  display: flex;
  transition: transform 0.6s var(--ease);
}

.slide {
  min-width: 100%;
  min-height: 360px;
  display: flex;
  align-items: center;
}

.slide-a { background: linear-gradient(120deg, var(--accent-dark), var(--accent)); }
.slide-b { background: linear-gradient(120deg, var(--ink), #3a3f4b); }
.slide-c { background: linear-gradient(120deg, #7a1f1f, var(--danger)); }

.slide-content {
  color: var(--surface);
  padding: 2.5rem 2rem;
  max-width: 480px;
}

.slide-content h1 {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.slide-content p {
  opacity: 0.85;
  margin-bottom: 1.5rem;
}

.cta {
  display: inline-block;
  background: var(--surface);
  color: var(--ink);
  padding: 0.7rem 1.4rem;
  border-radius: 4px;
  font-weight: 600;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.15);
  color: var(--surface);
  border: none;
  border-radius: 999px;
  width: 40px;
  height: 40px;
  font-size: 1.1rem;
  cursor: pointer;
  backdrop-filter: blur(2px);
}

.arrow:hover {
  background: rgba(255, 255, 255, 0.3);
}

.arrow-prev { left: 1rem; }
.arrow-next { right: 1rem; }

.dots {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  border: none;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: background 0.2s var(--ease), width 0.2s var(--ease);
}

.dot.active {
  background: var(--surface);
  width: 20px;
}
</style>