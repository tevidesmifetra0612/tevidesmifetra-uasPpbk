import { defineStore } from 'pinia'
import axios from 'axios'
import { useUserStore } from './userStore'

export const useJadwalStore = defineStore('jadwal', {
  state: () => ({
    jadwal: []
  }),
  actions: {
    async fetchJadwal() {
      const res = await axios.get('http://localhost:3000/jadwal')
      this.jadwal = res.data
    },
    async tambahJadwal(data) {
      const userStore = useUserStore()
      if (userStore.isAdmin) {
        await axios.post('http://localhost:3000/jadwal', data)
        await this.fetchJadwal()
      }
    }
  }
})
