<template>
  <q-page padding>
    <q-card class="q-pa-md shadow-2" style="max-width: 600px; margin: auto;">
      <q-card-section>
        <div class="text-h6">Profil Anggota</div>
      </q-card-section>

      <q-separator />

      <q-card-section v-if="profil">
        <q-list bordered separator>
          <q-item>
            <q-item-section avatar>
              <q-icon name="badge" />
            </q-item-section>
            <q-item-section>
              <div class="row items-center">
                <div class="col-4 text-weight-medium">ID</div>
                <div class="col-auto">:&nbsp;</div>
                <div class="col text-grey-8">{{ profil.id }}</div>
              </div>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>
              <div class="row items-center">
                <div class="col-4 text-weight-medium">Nama</div>
                <div class="col-auto">:&nbsp;</div>
                <div class="col text-grey-8">{{ profil.nama }}</div>
              </div>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon name="account_circle" />
            </q-item-section>
            <q-item-section>
              <div class="row items-center">
                <div class="col-4 text-weight-medium">Username</div>
                <div class="col-auto">:&nbsp;</div>
                <div class="col text-grey-8">{{ profil.username }}</div>
              </div>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon name="verified_user" />
            </q-item-section>
            <q-item-section>
              <div class="row items-center">
                <div class="col-4 text-weight-medium">Role</div>
                <div class="col-auto">:&nbsp;</div>
                <div class="col text-grey-8 text-capitalize">{{ profil.role }}</div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-section v-else>
        <q-banner dense class="bg-grey-2 text-grey-8">
          Memuat data profil...
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
