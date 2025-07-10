import { defineStore } from 'pinia'
import axios from 'axios'
import { useUserStore } from './userStore'

export const useAbsensiStore = defineStore('absensi', {
  state: () => ({
    data: []
  }),
  actions: {
    async fetchAbsensi() {
      const res = await axios.get('http://localhost:3000/absensi')
      this.data = res.data
    },
    async fetchAbsensiPeserta() {
      const userStore = useUserStore()
      const res = await axios.get(`http://localhost:3000/absensi?userId=${userStore.user.id}`)
      this.data = res.data
    },
    async tambahAbsensi(item) {
      await axios.post('http://localhost:3000/absensi', item)
      await this.fetchAbsensi()
    }
  }
})