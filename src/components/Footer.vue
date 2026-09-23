<script setup>
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="container footer-grid">
      <div>
        <p class="brand">好物選物 STORE</p>
        <p class="tagline">精選 3C 週邊，簡單、透明、不囉嗦。</p>
      </div>

      <div class="col">
        <p class="col-title">購物</p>
        <RouterLink to="/products">商品列表</RouterLink>
        <RouterLink to="/cart">購物車</RouterLink>
      </div>

      <div class="col">
        <p class="col-title">會員</p>
        <RouterLink to="/login">登入</RouterLink>
        <RouterLink to="/seller">商品管理</RouterLink>
      </div>
    </div>

    <p class="copyright">© {{ year }} 好物選物 STORE. 作品集展示用專案。</p>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--surface);
  border-top: 1px solid var(--line);
  margin-top: 4rem;
  padding: 3rem 0 1.5rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 2rem;
}

.brand {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
}

.tagline {
  color: var(--muted);
  font-size: 0.85rem;
  margin-top: 0.4rem;
  max-width: 32ch;
}

.col-title {
  color: var(--muted);
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  margin-bottom: 0.6rem;
}

.col a {
  display: block;
  font-size: 0.9rem;
  padding: 0.25rem 0;
  color: var(--ink);
}

.col a:hover {
  color: var(--accent);
}

.copyright {
  text-align: center;
  color: var(--muted);
  font-size: 0.75rem;
  margin-top: 2.5rem;
}

@media (max-width: 640px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>