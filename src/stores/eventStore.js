import { defineStore } from 'pinia'
import axios from 'axios'
import { useUserStore } from './userStore'

export const useEventStore = defineStore('event', {
  state: () => ({
    events: []
  }),
  actions: {
    async fetchEvents() {
      const res = await axios.get('http://localhost:3000/events')
      this.events = res.data
    },
    async tambahEvent(event) {
      const userStore = useUserStore()
      if (userStore.isAdmin) {
        await axios.post('http://localhost:3000/events', event)
        await this.fetchEvents()
      }
    }
  }
})
