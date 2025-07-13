<template>
  <q-page padding>
    <q-card class="q-pa-md shadow-2" style="max-width: 600px; margin: auto;">
      <q-card-section>
        <div class="text-h6">Daftar Iuran</div>
      </q-card-section>

      <q-separator />

      <q-list separator>
        <q-item v-for="i in iuran" :key="i.id">
          <q-item-section avatar>
            <q-icon name="payments" color="teal" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              {{ i.nama }} - Rp{{ Number(i.jumlah).toLocaleString('id-ID') }}
            </q-item-label>
            <q-item-label caption>Bulan: {{ i.bulan }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const iuran = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3001/iuran')
    iuran.value = res.data
  } catch (err) {
    console.error('Gagal memuat data iuran:', err)
  }
})
</script>
