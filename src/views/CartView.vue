<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';
import { useAuth } from '../composables/useAuth';
import { useCart } from '../composables/useCart';

const router = useRouter();
const { token } = useAuth();
const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

const errorMessage = ref('');
const submitting = ref(false);

const handleCheckout = async () => {
  if (!token.value) {
    router.push({ path: '/login', query: { redirect: '/cart' } }); // 👈 改成導向，不再是文字提示
    return;
  }

  submitting.value = true;
  try {
    await api.post('/orders', { items: cart.value }, {
      headers: { Authorization: `Bearer ${token.value}` }
    });

    clearCart();
    alert('訂單建立成功！');
    router.push('/');
  } catch (error) {
    alert('結帳失敗，請稍後再試');
  } finally {
    submitting.value = false;
  }
};
</script>

<template>
  <section class="container cart-page">
    <h1>購物車</h1>

    <p v-if="cart.length === 0" class="state-text">購物車是空的，先去逛逛吧。</p>

    <div v-else>
      <table class="cart-table">
        <thead>
          <tr>
            <td>商品</td>
            <td>單價</td>
            <td>數量</td>
            <td>小計</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.productId">
            <td>{{ item.name }}</td>
            <td class="price-tag">NT$ {{ item.price.toLocaleString() }}</td>
            <td>
              <input
                type="number"
                min="1"
                :value="item.quantity"
                class="qty-input"
                @change="updateQuantity(item.productId, Number($event.target.value))"
              />
            </td>
            <td class="price-tag">NT$ {{ (item.price * item.quantity).toLocaleString() }}</td>
            <td>
              <button class="remove-btn" @click="removeFromCart(item.productId)">移除</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="cart-summary">
        <p class="total">
          總計 <span class="price-tag">NT$ {{ totalPrice().toLocaleString() }}</span>
        </p>
        <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
        <button class="checkout-btn" :disabled="submitting" @click="handleCheckout">
          {{ submitting ? '處理中…' : '送出訂單' }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cart-page {
  padding: 2.5rem 1.5rem 4rem;
}

.state-text {
  color: var(--muted);
  padding: 3rem 0;
  text-align: center;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
}

.cart-table thead td {
  color: var(--muted);
  font-size: 0.85rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--line);
}

.cart-table tbody td {
  padding: 0.9rem 0.5rem;
  border-bottom: 1px solid var(--line);
}

.qty-input {
  width: 60px;
}

.remove-btn {
  background: var(--surface);
  color: var(--danger);
  border-color: var(--line);
  font-size: 0.85rem;
}

.remove-btn:hover {
  border-color: var(--danger);
}

.cart-summary {
  margin-top: 2rem;
  text-align: right;
}

.total {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.error-text {
  color: var(--danger);
  font-size: 0.9rem;
}

.checkout-btn {
  padding: 0.75rem 2rem;
}
</style>