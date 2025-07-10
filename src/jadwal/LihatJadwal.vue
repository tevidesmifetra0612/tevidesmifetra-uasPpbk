<template>
  <q-page padding>
    <q-card class="q-pa-md shadow-2" style="max-width: 500px; margin: auto;">
      <q-card-section>
        <div class="text-h6">Jadwal Latihan</div>
      </q-card-section>

      <q-separator />

      <q-list separator>
        <q-item v-for="j in jadwal" :key="j.id">
          <q-item-section avatar>
            <q-icon name="event_note" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ j.hari }}</q-item-label>
            <q-item-label caption>{{ j.jam }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const jadwal = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/jadwal')
    jadwal.value = res.data
  } catch (err) {
    console.error('Gagal memuat jadwal:', err)
  }
})
</script>
