<template>
  <q-page padding>
    <q-card class="q-pa-md shadow-2" style="max-width: 600px; margin: auto;">
      <q-card-section>
        <div class="text-h6">Tambah Event / Kejuaraan</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-input
          filled
          v-model="nama"
          label="Nama Event"
          prepend-icon="event"
          class="q-mb-md"
        />
        <q-input
          filled
          v-model="tanggal"
          label="Tanggal"
          type="date"
          prepend-icon="calendar_today"
          class="q-mb-md"
        />
        <q-input
          filled
          v-model="lokasi"
          label="Lokasi"
          prepend-icon="place"
          class="q-mb-md"
        />

        <q-btn
          label="Simpan"
          color="primary"
          icon="save"
          @click="tambahEvent"
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

const nama = ref('')
const tanggal = ref('')
const lokasi = ref('')

async function tambahEvent() {
  if (!nama.value || !tanggal.value || !lokasi.value) {
    $q.notify({
      type: 'negative',
      message: 'Semua field wajib diisi!'
    })
    return
  }

  await axios.post('http://localhost:3000/events', {
    nama: nama.value,
    tanggal: tanggal.value,
    lokasi: lokasi.value
  })

  $q.notify({
    type: 'positive',
    message: 'Event berhasil ditambahkan!'
  })

  nama.value = tanggal.value = lokasi.value = ''
}
</script>
