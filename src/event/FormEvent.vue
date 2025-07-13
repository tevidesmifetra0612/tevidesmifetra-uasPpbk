<template>
  <q-page padding>
    <q-card class="q-pa-md shadow-2" style="max-width: 500px; margin: auto;">
      <q-card-section>
        <div class="text-h6">
          {{ isEdit ? 'Edit Event / Kejuaraan' : 'Tambah Event / Kejuaraan' }}
        </div>
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
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import axios from 'axios'

const nama = ref('')
const tanggal = ref('')
const lokasi = ref('')
const isEdit = ref(false)

const router = useRouter()
const route = useRoute()
const $q = useQuasar()

onMounted(async () => {
  const id = route.query.id
  if (id) {
    isEdit.value = true
    try {
      const res = await axios.get(`http://localhost:3001/events/${id}`)
      nama.value = res.data.nama
      tanggal.value = res.data.tanggal
      lokasi.value = res.data.lokasi
    } catch (err) {
      $q.notify({ type: 'negative', message: 'Gagal mengambil data event!' })
    }
  }
})

async function simpan() {
  if (!nama.value || !tanggal.value || !lokasi.value) {
    $q.notify({ type: 'negative', message: 'Semua field wajib diisi!' })
    return
  }

  const id = route.query.id
  try {
    if (isEdit.value) {
      await axios.put(`http://localhost:3001/events/${id}`, {
        nama: nama.value,
        tanggal: tanggal.value,
        lokasi: lokasi.value
      })
      $q.notify({ type: 'positive', message: 'Event berhasil diperbarui!' })
    } else {
      await axios.post('http://localhost:3001/events', {
        nama: nama.value,
        tanggal: tanggal.value,
        lokasi: lokasi.value
      })
      $q.notify({ type: 'positive', message: 'Event berhasil ditambahkan!' })
    }

    router.push('/admin/event')
  } catch (err) {
    $q.notify({ type: 'negative', message: 'Gagal menyimpan event!' })
  }
}
</script>
