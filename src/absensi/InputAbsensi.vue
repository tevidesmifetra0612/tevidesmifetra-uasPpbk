<template>
  <q-page padding>
    <q-card class="q-pa-md shadow-2">
      <q-card-section>
        <div class="text-h6">Input Absensi (Admin)</div>
      </q-card-section>

      <q-separator />

      <q-list>
        <q-item v-for="peserta in pesertaList" :key="peserta.id" class="q-my-sm" clickable>
          <q-item-section>
            {{ peserta.username }}
          </q-item-section>
          <q-item-section side>
            <q-btn 
              color="primary" 
              icon="person_add" 
              label="Absenkan" 
              @click="absenPeserta(peserta)" 
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const pesertaList = ref([])

onMounted(async () => {
  const res = await axios.get('http://localhost:3000/users?role=peserta')
  pesertaList.value = res.data
})

async function absenPeserta(peserta) {
  const now = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
  await axios.post('http://localhost:3000/absensi', {
    userId: peserta.id,
    waktu: now,
    nama: peserta.username,
    keterangan: 'Hadir oleh admin'
  })
  $q.notify({
    type: 'positive',
    message: `${peserta.username} berhasil diabsenkan`
  })
}
</script>
