<template>
  <q-page padding>
    <q-card class="q-pa-md shadow-2" style="max-width: 500px; margin: auto;">
      <q-card-section>
        <div class="text-h6">
          {{ isEdit ? 'Edit Jadwal Latihan' : 'Tambah Jadwal Latihan' }}
        </div>
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
        <q-input
          filled
          v-model="materi"
          label="Materi Latihan"
          prepend-icon="description"
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
import axios from 'axios'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'

const hari = ref('')
const jam = ref('')
const materi = ref('')
const router = useRouter()
const route = useRoute()
const $q = useQuasar()
const isEdit = ref(false)

onMounted(async () => {
  const id = route.query.id
  if (id) {
    isEdit.value = true
    try {
      const res = await axios.get(`http://localhost:3001/jadwal/${id}`)
      hari.value = res.data.hari
      jam.value = res.data.jam
      materi.value = res.data.materi
    } catch (err) {
      $q.notify({ type: 'negative', message: 'Gagal mengambil data jadwal' })
    }
  }
})

async function simpan() {
  if (!hari.value || !jam.value || !materi.value) {
    $q.notify({ type: 'negative', message: 'Semua field wajib diisi!' })
    return
  }

  const id = route.query.id
  try {
    if (isEdit.value) {
      await axios.put(`http://localhost:3001/jadwal/${id}`, {
        hari: hari.value,
        jam: jam.value,
        materi: materi.value
      })
      $q.notify({ type: 'positive', message: 'Jadwal berhasil diperbarui!' })
    } else {
      await axios.post('http://localhost:3001/jadwal', {
        hari: hari.value,
        jam: jam.value,
        materi: materi.value
      })
      $q.notify({ type: 'positive', message: 'Jadwal berhasil ditambahkan!' })
    }
    router.push('/admin/jadwal')
  } catch (err) {
    $q.notify({ type: 'negative', message: 'Gagal menyimpan jadwal!' })
  }
}
</script>
