<template>
  <q-page padding>
    <q-card class="q-pa-md shadow-2">
      <q-card-section>
        <div class="text-h6">Profil Saya</div>
      </q-card-section>

      <q-separator />

      <q-card-section v-if="profil">
        <q-list bordered separator>

          <q-item>
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>
              <q-item-label><strong>Nama:</strong> {{ profil.nama }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon name="account_circle" />
            </q-item-section>
            <q-item-section>
              <q-item-label><strong>Username:</strong> {{ profil.username }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon name="email" />
            </q-item-section>
            <q-item-section>
              <q-item-label><strong>Email:</strong> {{ profil.email }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon name="verified_user" />
            </q-item-section>
            <q-item-section>
              <q-item-label><strong>Role:</strong> {{ profil.role }}</q-item-label>
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

const userStore = useUserStore()
const profil = ref(null)

onMounted(async () => {
  try {
    const res = await axios.get(`http://localhost:3000/users/${userStore.user.id}`)
    profil.value = res.data
  } catch (err) {
    console.error('Gagal mengambil profil:', err)
  }
})
</script>
