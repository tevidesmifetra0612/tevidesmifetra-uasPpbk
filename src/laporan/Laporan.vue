<template>
  <q-page padding>
    <q-card class="q-pa-md shadow-2">
      <q-card-section>
        <div class="text-h6">Detail Laporan Keuangan</div>
      </q-card-section>

      <q-separator spaced />

      <q-card-section>
        <div class="text-subtitle1 q-mb-sm">📥 Iuran</div>
        <q-table
          dense
          :rows="iuran"
          :columns="columnsIuran"
          row-key="id"
          flat
          bordered
          hide-bottom
        />
      </q-card-section>

      <q-separator spaced />

      <q-card-section>
        <div class="text-subtitle1 q-mb-sm">📤 Pengeluaran</div>
        <q-table
          dense
          :rows="pengeluaran"
          :columns="columnsPengeluaran"
          row-key="id"
          flat
          bordered
          hide-bottom
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const iuran = ref([])
const pengeluaran = ref([])

const columnsIuran = [
  { name: 'nama', label: 'Nama', field: 'nama', align: 'left' },
  { name: 'jumlah', label: 'Jumlah', field: row => `Rp${Number(row.jumlah).toLocaleString('id-ID')}`, align: 'right' },
  { name: 'bulan', label: 'Bulan', field: 'bulan', align: 'left' }
]

const columnsPengeluaran = [
  { name: 'keterangan', label: 'Keterangan', field: 'keterangan', align: 'left' },
  { name: 'jumlah', label: 'Jumlah', field: row => `Rp${Number(row.jumlah).toLocaleString('id-ID')}`, align: 'right' },
  { name: 'tanggal', label: 'Tanggal', field: 'tanggal', align: 'left' }
]

onMounted(async () => {
  try {
    const resIuran = await axios.get('http://localhost:3001/iuran')
    const resPengeluaran = await axios.get('http://localhost:3001/pengeluaran')
    iuran.value = resIuran.data
    pengeluaran.value = resPengeluaran.data
  } catch (err) {
    console.error('Gagal mengambil data:', err)
  }
})
</script>
