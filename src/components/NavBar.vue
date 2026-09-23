<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { useCart } from '../composables/useCart';

const router = useRouter();
const { token, user, logout } = useAuth();
const { totalCount } = useCart();

const isLoggedIn = computed(() => !!token.value);
const keyword = ref('');

const handleSearch = () => {
  router.push({ path: '/products', query: keyword.value ? { search: keyword.value } : {} });
};

const handleLogout = () => {
  logout();
  router.push('/');
};
</script>

<template>
  <header class="nav">
    <div class="container nav-inner">
      <RouterLink to="/" class="logo">好物選物 STORE</RouterLink>

      <div class="nav-search">
        <input v-model="keyword" type="text" placeholder="搜尋商品，例如：耳機" @keyup.enter="handleSearch" />
        <button @click="handleSearch">搜尋</button>
      </div>

      <div class="nav-actions">
        <RouterLink to="/cart" class="cart-link">
          購物車
          <span v-if="totalCount() > 0" class="cart-badge">{{ totalCount() }}</span>
        </RouterLink>

        <template v-if="isLoggedIn">
          <RouterLink to="/seller">商品管理</RouterLink>
          {{ user?.email }}
          <button @click="handleLogout">登出</button>
        </template>
        <RouterLink v-else to="/login" class="login-link">登入</RouterLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav {
  background: var(--surface);
  border-bottom: 1px solid var(--line);
  position: sticky;
  top: 0;
  z-index: 10;
}

.nav-inner {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 1.5rem;
}

.logo {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  white-space: nowrap;
}

.nav-search {
  display: flex;
  gap: 0.5rem;
  flex: 1;
  max-width: 420px;
}

.nav-search input {
  flex: 1;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
  color: var(--muted);
  font-size: 0.9rem;
}

.cart-link {
  position: relative;
  color: var(--ink);
  font-weight: 500;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -14px;
  background: var(--tag);
  color: var(--ink);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.1rem 0.4rem;
  border-radius: 999px;
}

.login-link {
  font-weight: 500;
  color: var(--accent-dark);
}
</style>