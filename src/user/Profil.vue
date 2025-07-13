<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-lg shadow-2" style="max-width: 600px; margin: auto;">
      <q-card-section>
        <div class="text-h5">Profil Pengguna</div>
      </q-card-section>

      <q-separator />

      <q-card-section v-if="profil">
        <div class="q-gutter-sm">
          <div class="row">
            <div class="col-3 text-weight-medium">ID</div>
            <div class="col-auto">:&nbsp;</div>
            <div class="col text-grey-8">{{ profil.id }}</div>
          </div>

          <div class="row">
            <div class="col-3 text-weight-medium">Nama</div>
            <div class="col-auto">:&nbsp;</div>
            <div class="col text-grey-8">{{ profil.nama }}</div>
          </div>

          <div class="row">
            <div class="col-3 text-weight-medium">Username</div>
            <div class="col-auto">:&nbsp;</div>
            <div class="col text-grey-8">{{ profil.username }}</div>
          </div>

          <div class="row">
            <div class="col-3 text-weight-medium">Role</div>
            <div class="col-auto">:&nbsp;</div>
            <div class="col text-grey-8 text-capitalize">{{ profil.role }}</div>
          </div>
        </div>
      </q-card-section>

      <q-card-section v-else>
        <q-banner dense class="bg-grey-2 text-grey-8">
          Memuat data profil pengguna...
        </q-banner>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/userStore'
import { useQuasar } from 'quasar'

const profil = ref(null)
const userStore = useUserStore()
const $q = useQuasar()

onMounted(async () => {
  if (!userStore.user || !userStore.user.id) {
    $q.notify({ type: 'warning', message: 'User belum login atau ID kosong.' })
    return
  }

  try {
    const res = await axios.get(`http://localhost:3001/users/${userStore.user.id}`)
    profil.value = res.data
  } catch (err) {
    console.error('Gagal mengambil profil:', err)
    $q.notify({ type: 'negative', message: 'Gagal mengambil data profil.' })
  }
})
</script>
