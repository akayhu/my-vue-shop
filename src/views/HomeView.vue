<script setup>
import { ref, onMounted } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import api from '../api';

const featured = ref([]);
const categories = [
  { label: '耳機類', keyword: '耳機' },
  { label: '喇叭類', keyword: '音箱' },
  { label: '鍵盤類', keyword: '鍵盤' },
  { label: '滑鼠類', keyword: '滑鼠' },
  { label: '螢幕類', keyword: '螢幕' }
];

const fetchFeatured = async () => {
  const response = await api.get('/products');
  featured.value = response.data.slice(0, 4);
};

onMounted(() => {
  fetchFeatured();
});
</script>

<template>
  <section class="hero container">
    <h1>挑一件配得上你桌面的小東西</h1>
    <p class="lead">耳機、鍵盤、滑鼠與螢幕，精選 3C 週邊，價格清楚標示，不囉嗦。</p>
    <RouterLink to="/products" class="cta">瀏覽所有商品</RouterLink>
  </section>

  <hr class="hairline container" />

  <section class="container">
    <h2>熱門分類</h2>
    <div class="chips">
      <RouterLink
        v-for="cat in categories"
        :key="cat.keyword"
        :to="{ path: '/products', query: { search: cat.keyword } }"
        class="chip"
      >
        {{ cat.label }}
      </RouterLink>
    </div>
  </section>

  <hr class="hairline container" />

  <section class="container">
    <h2>最新上架</h2>
    <div class="grid">
      <ProductCard v-for="p in featured" :key="p.id" :product="p" />
    </div>
  </section>

  <hr class="hairline container" />

  <section class="container seller-cta">
    <h2>是賣家嗎？</h2>
    <p class="lead-small">登入後即可上架新商品，管理你的商品清單。</p>
    <RouterLink to="/seller" class="cta">前往商品管理</RouterLink>
  </section>
</template>

<style scoped>
.hero {
  padding: 4rem 1.5rem 2rem;
}

.hero h1 {
  font-size: 2.4rem;
  max-width: 14ch;
}

.lead {
  color: var(--muted);
  max-width: 42ch;
  margin: 1rem 0 1.5rem;
}

.cta {
  display: inline-block;
  background: var(--ink);
  color: var(--surface);
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
}

.chips {
  margin-top: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.25rem;
  margin-top: 1rem;
}

.seller-cta {
  padding-bottom: 4rem;
}

.lead-small {
  color: var(--muted);
  font-size: 0.9rem;
  margin: 0.5rem 0 1rem;
}
</style>