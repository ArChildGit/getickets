// src/store/userAuth.js
import create from 'zustand';

const useUserAuth = create((set) => ({
  // JWT token dan status autentikasi
  jwt: null, // Defaultnya null, karena tidak ada token saat pertama kali load
  isAuthenticated: false, // Menyimpan status autentikasi

  // Menyimpan token dan status autentikasi
  setJwt: (token) => set(() => ({ jwt: token, isAuthenticated: true })),

  // Menghapus token dan status autentikasi
  logout: () => set(() => ({ jwt: null, isAuthenticated: false })),
  
  // Memverifikasi status autentikasi
  verifyJwt: () => {
    const token = localStorage.getItem('jwt'); // Memeriksa token di localStorage
    if (token) {
      set(() => ({ jwt: token, isAuthenticated: true }));
    } else {
      set(() => ({ jwt: null, isAuthenticated: false }));
    }
  }
}));

export default useUserAuth;
