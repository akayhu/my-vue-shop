<script setup>
import AddProduct from '../components/AddProduct.vue';
</script>

<template>
  <section class="container seller-page">
    <RouterLink to="/" class="back-link">← 回首頁</RouterLink>
    <h1>商品管理</h1>
    <p class="lead-small">這是需要登入才能進入的頁面，示範受保護路由。</p>
    <div class="panel">
      <AddProduct />
    </div>
  </section>
</template>

<style scoped>
.seller-page {
  padding: 2.5rem 1.5rem 4rem;
  max-width: 480px;
}

.back-link {
  display: inline-block;
  color: var(--muted);
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.lead-small {
  color: var(--muted);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}
</style>