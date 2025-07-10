import { defineStore } from 'pinia'
import axios from 'axios'

export const useAnggotaStore = defineStore('anggota', {
  state: () => ({
    anggota: []
  }),
  actions: {
    async fetchAnggota() {
      const res = await axios.get('http://localhost:3000/users?role=peserta')
      this.anggota = res.data
    },
    tambahAnggota(anggotaBaru) {
      this.anggota.push(anggotaBaru)
    },
    hapusAnggota(id) {
      this.anggota = this.anggota.filter(a => a.id !== id)
    }
  }
})
