import { ref, computed } from 'vue';

const token = ref(localStorage.getItem('token'));

// 解碼 Token 的第二段（Payload），拿出 userId、email
const decodePayload = (rawToken) => {
    if (!rawToken) return null;
    try {
        const payload = rawToken.split('.')[1];
        return JSON.parse(atob(payload));
    } catch (error) {
        return null;
    }
};

const user = computed(() => decodePayload(token.value));

export const useAuth = () => {
    const login = (newToken) => {
        token.value = newToken;
        localStorage.setItem('token', newToken);
    };

    const logout = () => {
        token.value = null;
        localStorage.removeItem('token');
    };

    return { token, user, login, logout };
};