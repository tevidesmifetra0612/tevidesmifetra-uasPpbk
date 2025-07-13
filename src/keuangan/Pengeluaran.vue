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
            <q-item-label>
              {{ p.keterangan }} - Rp{{ Number(p.jumlah).toLocaleString('id-ID') }}
            </q-item-label>
            <q-item-label caption>Tanggal: {{ p.tanggal }}</q-item-label>
          </q-item-section>

          <q-item-section side v-if="user.role !== 'peserta'">
            <q-btn flat dense icon="edit" color="blue" @click="editPengeluaran(p)" />
            <q-btn flat dense icon="delete" color="red" @click="hapusPengeluaran(p.id)" />
          </q-item-section>
        </q-item>
      </q-list>

      <q-card-actions align="right" class="q-mt-md" v-if="user.role !== 'peserta'">
        <q-btn color="primary" icon="add" label="Tambah Pengeluaran" @click="goToForm" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useUserStore } from '@/stores/userStore' // Pastikan path-nya benar

const pengeluaran = ref([])
const router = useRouter()
const $q = useQuasar()
const user = useUserStore().user

onMounted(() => {
  loadPengeluaran()
})

async function loadPengeluaran() {
  try {
    const res = await axios.get('http://localhost:3001/pengeluaran')
    pengeluaran.value = res.data
  } catch (err) {
    $q.notify({ type: 'negative', message: 'Gagal memuat data pengeluaran' })
  }
}

function goToForm() {
  router.push('/admin/pengeluaran/form')
}

function editPengeluaran(p) {
  router.push({ path: '/admin/pengeluaran/form', query: { id: p.id } })
}

async function hapusPengeluaran(id) {
  $q.dialog({
    title: 'Konfirmasi',
    message: 'Yakin ingin menghapus pengeluaran ini?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      await axios.delete(`http://localhost:3001/pengeluaran/${id}`)
      $q.notify({ type: 'positive', message: 'Pengeluaran berhasil dihapus' })
      await loadPengeluaran()
    } catch (err) {
      $q.notify({ type: 'negative', message: 'Gagal menghapus pengeluaran' })
    }
  })
}
</script>
