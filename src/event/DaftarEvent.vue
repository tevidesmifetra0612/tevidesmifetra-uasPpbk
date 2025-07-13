<template>
  <q-page padding>
    <q-card class="q-pa-md shadow-2" style="max-width: 600px; margin: auto;">
      <q-card-section>
        <div class="text-h6">Daftar Event & Kejuaraan</div>
      </q-card-section>

      <q-separator />

      <q-list separator>
        <q-item v-for="e in events" :key="e.id">
          <q-item-section avatar>
            <q-icon name="emoji_events" color="primary" />
          </q-item-section>

          <q-item-section>
            <q-item-label><strong>{{ e.nama }}</strong></q-item-label>
            <q-item-label caption>{{ e.tanggal }} &bull; {{ e.lokasi }}</q-item-label>
          </q-item-section>

          <!-- Tombol aksi (edit/hapus) jika user bukan peserta -->
          <q-item-section side v-if="user.role !== 'peserta'">
            <q-btn flat dense icon="edit" color="blue" @click="editEvent(e)" />
            <q-btn flat dense icon="delete" color="red" @click="hapusEvent(e.id)" />
          </q-item-section>
        </q-item>
      </q-list>

      <!-- Tombol tambah jika user bukan peserta -->
      <q-card-actions align="right" class="q-mt-md" v-if="user.role !== 'peserta'">
        <q-btn color="primary" icon="add" label="Tambah Event" @click="goToForm" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useUserStore } from '@/stores/userStore' // Pastikan path benar

const events = ref([])
const router = useRouter()
const $q = useQuasar()
const user = useUserStore().user

onMounted(() => {
  loadEvents()
})

async function loadEvents() {
  try {
    const res = await axios.get('http://localhost:3001/events')
    events.value = res.data
  } catch (err) {
    $q.notify({ type: 'negative', message: 'Gagal memuat data event' })
  }
}

function goToForm() {
  router.push('/admin/event/form')
}

function editEvent(event) {
  router.push({ path: '/admin/event/form', query: { id: event.id } })
}

async function hapusEvent(id) {
  $q.dialog({
    title: 'Konfirmasi',
    message: 'Yakin ingin menghapus event ini?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      await axios.delete(`http://localhost:3001/events/${id}`)
      $q.notify({ type: 'positive', message: 'Event berhasil dihapus' })
      await loadEvents()
    } catch (err) {
      $q.notify({ type: 'negative', message: 'Gagal menghapus event' })
    }
  })
}
</script>
