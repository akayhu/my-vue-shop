<script setup>
import LoginForm from '../components/LoginForm.vue';
</script>

<template>
  <section class="container login-page">
    <div class="login-card panel">
      <h1>會員登入</h1>
      <p class="lead-small">登入後即可管理商品、查看訂單。</p>
      <LoginForm />
    </div>
  </section>
</template>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  padding: 4rem 1.5rem;
}

.login-card {
  width: 100%;
  max-width: 380px;
}

.lead-small {
  color: var(--muted);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}
</style>