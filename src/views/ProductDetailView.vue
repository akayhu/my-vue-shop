<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../api';
import { useAuth } from '../composables/useAuth';
import { useCart } from '../composables/useCart';

const route = useRoute();
const router = useRouter();
const { token } = useAuth();
const { addToCart } = useCart();

const product = ref(null);
const notFound = ref(false);
const added = ref(false);

const fetchProduct = async () => {
  try {
    const response = await api.get(`/products/${route.params.id}`);
    product.value = response.data;
  } catch (error) {
    notFound.value = true;
  }
};

const handleAddToCart = () => {
  addToCart(product.value);
  added.value = true;
  setTimeout(() => {
    added.value = false;
  }, 1500);
};

const handleDelete = async () => {
  if (!confirm(`確定要下架「${product.value.name}」嗎？`)) return;

  await api.delete(`/products/${route.params.id}`, {
    headers: { Authorization: `Bearer ${token.value}` }
  });

  router.push('/products');
};

onMounted(() => {
  fetchProduct();
});
</script>

<template>
  <section class="container detail-page">
    <RouterLink to="/products" class="back-link">← 回商品列表</RouterLink>

    <p v-if="notFound" class="state-text">找不到這個商品，可能已經下架了。</p>

    <div v-else-if="product" class="detail-grid">
      <div class="thumb-large" :class="product.id % 2 === 0 ? 'thumb-a' : 'thumb-b'">
        {{ product.name.charAt(0) }}
      </div>

      <div class="detail-info">
        <h1>{{ product.name }}</h1>
        <p class="price-tag price-large">NT$ {{ product.price.toLocaleString() }}</p>

        <table class="spec-table">
          <tbody>
            <tr>
              <td>商品編號</td>
              <td>#{{ product.id }}</td>
            </tr>
            <tr>
              <td>上架時間</td>
              <td>{{ new Date(product.createdAt).toLocaleDateString() }}</td>
            </tr>
          </tbody>
        </table>

        <button class="buy-btn" @click="handleAddToCart">
          {{ added ? '已加入購物車 ✓' : '加入購物車' }}
        </button>
        <button v-if="token" class="delete-btn" @click="handleDelete">下架商品</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.detail-page {
  padding: 2.5rem 1.5rem 4rem;
}

.back-link {
  display: inline-block;
  color: var(--muted);
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.state-text {
  color: var(--muted);
  padding: 3rem 0;
  text-align: center;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.thumb-large {
  aspect-ratio: 1 / 1;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 6rem;
  font-weight: 700;
  color: var(--surface);
}

.thumb-a {
  background: linear-gradient(135deg, var(--accent), var(--accent-dark));
}

.thumb-b {
  background: linear-gradient(135deg, var(--ink), #3A3F4B);
}

.price-large {
  font-size: 1.5rem;
  margin: 0.5rem 0 1.5rem;
}

.spec-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
}

.spec-table td {
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--line);
  font-size: 0.9rem;
}

.spec-table td:first-child {
  color: var(--muted);
  width: 30%;
}

.buy-btn {
  width: 100%;
  margin-bottom: 0.75rem;
}

.delete-btn {
  width: 100%;
  background: var(--surface);
  color: var(--danger);
  border-color: var(--danger);
}

.delete-btn:hover {
  background: var(--danger);
  color: var(--surface);
}

@media (max-width: 640px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>