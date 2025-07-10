<!-- src/user/Profil.vue -->
<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-lg shadow-2">
      <q-card-section>
        <div class="text-h5">Profil Pengguna</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-item>
          <q-item-section>
            <q-item-label><strong>ID:</strong> {{ user.id }}</q-item-label>
            <q-item-label><strong>Nama:</strong> {{ user.nama }}</q-item-label>
            <q-item-label><strong>Role:</strong> {{ user.role }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const user = ref({
  id: '',
  nama: '',
  role: ''
})

// Ambil userId dari localStorage (harus sudah disimpan saat login)
const userId = localStorage.getItem('userId')

onMounted(async () => {
  try {
    const res = await axios.get(`http://localhost:3000/users/${userId}`)
    user.value = res.data
  } catch (err) {
    console.error('Gagal mengambil data user:', err)
  }
})
</script>
