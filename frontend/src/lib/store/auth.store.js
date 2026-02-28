import { create } from "zustand";
import { devtools } from 'zustand/middleware'

const useAuthStore = create()(devtools((set) => ({
    token: localStorage.getItem('user-token') || null,
    isAuthenticated: !!localStorage.getItem('user-token'),

    setToken: (token) => {
        set({ token, isAuthenticated: true });
        localStorage.setItem('user-token', token);
        cookieStore.set('user-token', token);
    }
})));

export default useAuthStore;