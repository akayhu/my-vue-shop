<script setup>
import { ref } from 'vue';
import api from '../api';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';

const route = useRoute();
const router = useRouter();
const { login } = useAuth();

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
  errorMessage.value = '';

  try {
    const response = await api.post('/login', {
      email: email.value,
      password: password.value
    });

    login(response.data.token);

    // 有 redirect 參數就導回去，沒有就回首頁
    router.push(route.query.redirect || '/');
  } catch (error) {
    errorMessage.value = '登入失敗，請確認帳號密碼是否正確';
  }
};
</script>

<template>
  <div>
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="密碼" />
    <button @click="handleLogin">登入</button>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  </div>
</template>