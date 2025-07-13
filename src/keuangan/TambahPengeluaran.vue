<template>
  <q-page padding>
    <q-card class="q-pa-md shadow-2" style="max-width: 500px; margin: auto;">
      <q-card-section>
        <div class="text-h6">
          {{ isEdit ? 'Edit Pengeluaran' : 'Tambah Pengeluaran' }}
        </div>
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
import { useUserStore } from '@/stores/userStore' // ✅ tambahkan ini

const keterangan = ref('')
const jumlah = ref(0)
const tanggal = ref('')
const isEdit = ref(false)

const router = useRouter()
const route = useRoute()
const $q = useQuasar()
const userStore = useUserStore() // ✅ inisialisasi store
userStore.loadUser() // ✅ pastikan user dimuat

onMounted(async () => {
  const id = route.query.id
  if (id) {
    isEdit.value = true
    try {
      const res = await axios.get(`http://localhost:3001/pengeluaran/${id}`)
      keterangan.value = res.data.keterangan
      jumlah.value = res.data.jumlah
      tanggal.value = res.data.tanggal
    } catch (err) {
      $q.notify({ type: 'negative', message: 'Gagal mengambil data pengeluaran' })
    }
  }
})

async function simpan() {
  if (!keterangan.value || !jumlah.value || !tanggal.value) {
    $q.notify({ type: 'negative', message: 'Semua field wajib diisi!' })
    return
  }

  const id = route.query.id
  try {
    if (isEdit.value) {
      await axios.put(`http://localhost:3001/pengeluaran/${id}`, {
        keterangan: keterangan.value,
        jumlah: jumlah.value,
        tanggal: tanggal.value
      })
      $q.notify({ type: 'positive', message: 'Pengeluaran berhasil diperbarui!' })
    } else {
      await axios.post('http://localhost:3001/pengeluaran', {
        keterangan: keterangan.value,
        jumlah: jumlah.value,
        tanggal: tanggal.value
      })
      $q.notify({ type: 'positive', message: 'Pengeluaran berhasil ditambahkan!' })
    }

    router.push('/admin/pengeluaran')
  } catch (err) {
    $q.notify({ type: 'negative', message: 'Gagal menyimpan pengeluaran!' })
  }
}
</script>

