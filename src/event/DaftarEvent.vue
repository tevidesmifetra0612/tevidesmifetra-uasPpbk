<template>
  <q-page padding>
    <q-card class="q-pa-md shadow-2">
      <q-card-section>
        <div class="text-h6">Daftar Event & Kejuaraan</div>
      </q-card-section>

      <q-separator />

      <q-list separator>
        <q-item v-for="e in events" :key="e.id">
          <q-item-section avatar>
            <q-icon name="emoji_events" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label><strong>{{ e.nama }}</strong></q-item-label>
            <q-item-label caption>{{ e.tanggal }} &bull; {{ e.lokasi }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const events = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/events')
    events.value = res.data
  } catch (err) {
    console.error('Gagal memuat event:', err)
  }
})
</script>
