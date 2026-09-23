<script setup>
import { ref } from 'vue';
import api from '../api';
import { useAuth } from '../composables/useAuth';
const { token } = useAuth();

const emit = defineEmits(['product-added']);

const name = ref('');
const price = ref('');
const errorMessage = ref('');

const handleAddProduct = async () => {
  errorMessage.value = '';

  if (!token.value) {
    errorMessage.value = '請先登入才能新增商品';
    return;
  }

  try {
    await api.post('/products', {
      name: name.value,
      price: Number(price.value)
    }, {
        headers: {
          Authorization: `Bearer ${token.value}` // 在請求的 Header 裡附上識別證
        }
      }
    );

    name.value = '';
    price.value = '';
    emit('product-added'); // 通知父層元件：新增成功了，該去重新抓一次商品列表
  } catch (error) {
    errorMessage.value = '新增失敗，請確認已登入';
  }
};
</script>

<template>
  <div>
    <h2>新增商品</h2>
    <input v-model="name" type="text" placeholder="商品名稱" />
    <input v-model="price" type="number" placeholder="價格" />
    <button @click="handleAddProduct">新增</button>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  </div>
</template>