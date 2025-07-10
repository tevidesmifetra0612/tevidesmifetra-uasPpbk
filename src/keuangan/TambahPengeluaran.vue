<template>
  <q-page padding>
    <q-card class="q-pa-md shadow-2" style="max-width: 500px; margin: auto;">
      <q-card-section>
        <div class="text-h6">Tambah Pengeluaran</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-input
          filled
          v-model="keterangan"
          label="Keterangan"
          prepend-icon="description"
          class="q-mb-md"
        />
        <q-input
          filled
          v-model.number="jumlah"
          label="Jumlah (Rp)"
          type="number"
          prepend-icon="payments"
          class="q-mb-md"
        />
        <q-input
          filled
          v-model="tanggal"
          label="Tanggal"
          type="date"
          prepend-icon="event"
          class="q-mb-md"
        />

        <q-btn
          label="Simpan"
          color="primary"
          icon="save"
          @click="tambah"
          class="full-width"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const keterangan = ref('')
const jumlah = ref(0)
const tanggal = ref('')

async function tambah() {
  if (!keterangan.value || !jumlah.value || !tanggal.value) {
    $q.notify({
      type: 'negative',
      message: 'Semua data harus diisi!',
    })
    return
  }

  try {
    await axios.post('http://localhost:3000/pengeluaran', {
      keterangan: keterangan.value,
      jumlah: jumlah.value,
      tanggal: tanggal.value
    })

    $q.notify({
      type: 'positive',
      message: 'Pengeluaran berhasil ditambahkan!'
    })

    // Reset form
    keterangan.value = ''
    jumlah.value = 0
    tanggal.value = ''
  } catch (err) {
    $q.notify({
      type: 'negative',
      message: 'Gagal menambahkan pengeluaran!'
    })
  }
}
</script>
