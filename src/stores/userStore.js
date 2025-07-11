import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null // Menyimpan data user setelah login
  }),

  getters: {
    // Mengecek apakah user login sebagai admin
    isAdmin: (state) => state.user?.role === 'admin',

    // Mengecek apakah user login sebagai peserta
    isPeserta: (state) => state.user?.role === 'peserta',

    // Mengecek apakah user sedang login secara valid
    isLoggedIn: (state) => !!state.user && !!state.user.role
  },

  actions: {
    // Saat login, simpan data user ke state dan localStorage
    login(users) {
      this.user = users
      localStorage.setItem('user', JSON.stringify(users))
    },

    // Logout: hapus data dari state dan localStorage
    logout() {
      this.user = null
      localStorage.removeItem('user')
    },

    // Cek localStorage saat app dimuat ulang untuk tetap login
    loadUser() {
      const stored = localStorage.getItem('user')
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          // Validasi: hanya simpan jika ada role
          if (parsed && parsed.role) {
            this.user = parsed
          } else {
            this.user = null
          }
        } catch (error) {
          this.user = null
        }
      } else {
        this.user = null
      }
    }
  }
})
