<template>
  <q-page padding>
    <q-card class="q-pa-md shadow-2 rounded-borders">
      <q-card-section>
        <div class="text-h6">Absen Saya</div>
      </q-card-section>

      <q-card-section>
        <q-btn 
          label="Absen Sekarang" 
          color="primary" 
          icon="alarm_on"
          @click="absen"
        />
      </q-card-section>

      <q-card-section v-if="status">
        <q-banner dense class="bg-green-2 text-green-10">
          {{ status }}
        </q-banner>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const status = ref('')

async function absen() {
  try {
    const now = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
    await axios.post('http://localhost:3000/absensi', {
      userId: userStore.user.id,
      waktu: now,
      nama: userStore.user.username,
      keterangan: 'Hadir'
    })
    status.value = '✅ Absen berhasil pada ' + now
  } catch (error) {
    status.value = '❌ Gagal absen. Coba lagi.'
  }
}
</script>
