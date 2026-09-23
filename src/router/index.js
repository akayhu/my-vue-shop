import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductListView from '../views/ProductListView.vue';
import ProductDetailView from '../views/ProductDetailView.vue';
import CartView from '../views/CartView.vue';
import LoginView from '../views/LoginView.vue';
import SellerView from '../views/SellerView.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'home', component: HomeView },
        { path: '/products', name: 'product-list', component: ProductListView },
        { path: '/products/:id', name: 'product-detail', component: ProductDetailView },
        { path: '/cart', name: 'cart', component: CartView },
        { path: '/login', name: 'login', component: LoginView },
        { path: '/seller', name: 'seller', component: SellerView, meta: { requiresAuth: true } } // 👈 貼標籤
    ]
});

// 全域導航守衛：每次換頁前都會先跑這裡
router.beforeEach((to) => {
    const isLoggedIn = !!localStorage.getItem('token');

    if (to.meta.requiresAuth && !isLoggedIn) {
        // 沒登入卻想去需要登入的頁面 → 導去登入頁，順便記住原本要去哪
        return { path: '/login', query: { redirect: to.fullPath } };
    }
});

export default router;