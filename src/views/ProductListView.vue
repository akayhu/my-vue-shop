<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../api';
import ProductCard from '../components/ProductCard.vue';

const route = useRoute();
const router = useRouter();

const products = ref([]);
const loading = ref(false);
const keyword = ref(route.query.search || '');

const fetchProducts = async () => {
  loading.value = true;
  try {
    const response = await api.get('/products', {
      params: { search: route.query.search || undefined }
    });
    products.value = response.data;
  } finally {
    loading.value = false;
  }
};

// 監聽網址上的搜尋字，只要它改變（不管是打字送出、還是點分類 chip），就重新抓資料
watch(
  () => route.query.search,
  (newSearch) => {
    keyword.value = newSearch || '';
    fetchProducts();
  },
  { immediate: true }
);

const handleSearch = () => {
  router.push({ path: '/products', query: keyword.value ? { search: keyword.value } : {} });
};
</script>

<template>
  <section class="container list-page">
    <div class="list-header">
      <h1>商品列表</h1>
      <div class="search-bar">
        <input v-model="keyword" type="text" placeholder="搜尋商品" @keyup.enter="handleSearch" />
        <button @click="handleSearch">搜尋</button>
      </div>
    </div>

    <p v-if="route.query.search" class="result-hint">
      「{{ route.query.search }}」的搜尋結果，共 {{ products.length }} 筆
    </p>

    <p v-if="loading" class="state-text">載入中…</p>
    <p v-else-if="products.length === 0" class="state-text">
      找不到符合的商品，換個關鍵字試試？
    </p>

    <div v-else class="grid">
      <ProductCard v-for="p in products" :key="p.id" :product="p" />
    </div>
  </section>
</template>

<style scoped>
.list-page {
  padding: 2.5rem 1.5rem;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.search-bar {
  display: flex;
  gap: 0.5rem;
}

.result-hint {
  color: var(--muted);
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.state-text {
  color: var(--muted);
  padding: 3rem 0;
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.25rem;
  margin-top: 1.5rem;
}
</style>