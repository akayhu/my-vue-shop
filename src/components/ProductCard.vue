<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <RouterLink :to="`/products/${product.id}`" class="card">
    <div class="thumb" :class="product.id % 2 === 0 ? 'thumb-a' : 'thumb-b'">
      {{ product.name.charAt(0) }}
    </div>
    <div class="info">
      <p class="name">{{ product.name }}</p>
      <p class="price-tag">NT$ {{ product.price.toLocaleString() }}</p>
    </div>
  </RouterLink>
</template>

<style scoped>
.card {
  display: block;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--surface);
  transition: transform 0.25s var(--ease), box-shadow 0.25s var(--ease), border-color 0.25s var(--ease);
}

.card:hover {
  border-color: var(--accent);
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
}

.thumb {
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--surface);
}

.thumb-a {
  background: linear-gradient(135deg, var(--accent), var(--accent-dark));
}

.thumb-b {
  background: linear-gradient(135deg, var(--ink), #3A3F4B);
}

.info {
  padding: 0.9rem;
}

.name {
  margin: 0 0 0.35rem;
  font-size: 0.95rem;
}

.price-tag {
  margin: 0;
  font-size: 1rem;
}
</style>