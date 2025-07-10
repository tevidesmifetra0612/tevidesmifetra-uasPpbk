<template>
  <q-page padding>
    <q-card class="q-pa-md shadow-2" style="max-width: 600px; margin: auto;">
      <q-card-section>
        <div class="text-h6">Data Pengeluaran</div>
      </q-card-section>

      <q-separator />

      <q-list separator>
        <q-item v-for="p in pengeluaran" :key="p.id">
          <q-item-section avatar>
            <q-icon name="money_off" color="red-6" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ p.keterangan }} - Rp{{ Number(p.jumlah).toLocaleString('id-ID') }}</q-item-label>
            <q-item-label caption>Tanggal: {{ p.tanggal }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const pengeluaran = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/pengeluaran')
    pengeluaran.value = res.data
  } catch (err) {
    console.error('Gagal memuat data pengeluaran:', err)
  }
})
</script>
