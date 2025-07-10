<template>
  <q-page padding>
    <q-card class="q-pa-md shadow-2" style="max-width: 500px; margin: auto;">
      <q-card-section>
        <div class="text-h6">Tambah Jadwal Latihan</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-input
          filled
          v-model="hari"
          label="Hari"
          prepend-icon="calendar_today"
          class="q-mb-md"
        />
        <q-input
          filled
          v-model="jam"
          label="Jam"
          prepend-icon="access_time"
          class="q-mb-md"
        />

        <q-btn
          label="Simpan"
          icon="save"
          color="primary"
          @click="simpan"
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

const hari = ref('')
const jam = ref('')
const $q = useQuasar()

async function simpan() {
  if (!hari.value || !jam.value) {
    $q.notify({
      type: 'negative',
      message: 'Hari dan jam harus diisi!'
    })
    return
  }

  await axios.post('http://localhost:3000/jadwal', {
    hari: hari.value,
    jam: jam.value
  })

  $q.notify({
    type: 'positive',
    message: 'Jadwal berhasil ditambahkan!'
  })

  hari.value = ''
  jam.value = ''
}
</script>
