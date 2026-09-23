import { ref, watch } from 'vue';
import { useAuth } from './useAuth';

const { token, user } = useAuth();

const loadCart = (key) => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
};

const saveCart = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const cartKeyFor = (userId) => {
    return userId ? `cart:user:${userId}` : 'cart:guest';
};

// 頁面一載入，依目前是否已登入，決定要顯示哪一份購物車
const cart = ref(loadCart(cartKeyFor(user.value?.userId)));

// 購物車內容一變動，就存進「目前使用者」對應的那一份
watch(
    cart,
    (newCart) => {
        saveCart(cartKeyFor(user.value?.userId), newCart);
    },
    { deep: true }
);

// 監聽登入狀態的變化（token 從無到有 = 登入；從有到無 = 登出）
watch(token, (newToken, oldToken) => {
    if (newToken && !oldToken) {
        // 剛登入：把訪客購物車併進這個帳號的購物車
        const userId = user.value?.userId;
        const guestCart = loadCart('cart:guest');
        const userCart = loadCart(cartKeyFor(userId));

        guestCart.forEach((guestItem) => {
            const existing = userCart.find((item) => item.productId === guestItem.productId);
            if (existing) {
                existing.quantity += guestItem.quantity;
            } else {
                userCart.push(guestItem);
            }
        });

        saveCart('cart:guest', []);
        saveCart(cartKeyFor(userId), userCart);
        cart.value = userCart;
    } else if (!newToken && oldToken) {
        // 剛登出：畫面回到空的購物車
        saveCart('cart:guest', []);
        cart.value = [];
    }
});

export const useCart = () => {
    const addToCart = (product) => {
        const existing = cart.value.find((item) => item.productId === product.id);

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.value.push({
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }
    };

    const removeFromCart = (productId) => {
        cart.value = cart.value.filter((item) => item.productId !== productId);
    };

    const updateQuantity = (productId, quantity) => {
        const item = cart.value.find((item) => item.productId === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
        }
    };

    const clearCart = () => {
        cart.value = [];
    };

    const totalCount = () => {
        return cart.value.reduce((sum, item) => sum + item.quantity, 0);
    };

    const totalPrice = () => {
        return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    return { cart, addToCart, removeFromCart, updateQuantity, clearCart, totalCount, totalPrice };
};