import { defineStore } from 'pinia'
import axios from 'axios'
import { useUserStore } from './userStore'

export const useKeuanganStore = defineStore('keuangan', {
  state: () => ({
    iuran: [],
    pengeluaran: []
  }),
  actions: {
    async fetchIuran() {
      const res = await axios.get('http://localhost:3000/iuran')
      this.iuran = res.data
    },
    async fetchPengeluaran() {
      const res = await axios.get('http://localhost:3000/pengeluaran')
      this.pengeluaran = res.data
    },
    async tambahPengeluaran(data) {
      const userStore = useUserStore()
      if (userStore.isAdmin) {
        await axios.post('http://localhost:3000/pengeluaran', data)
        await this.fetchPengeluaran()
      }
    }
  }
})
