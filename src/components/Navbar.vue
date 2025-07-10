<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>

      <!-- Logo Aplikasi -->
      <q-toolbar-title>
        Manajemen Perisai Diri
      </q-toolbar-title>

      <!-- Jika user sudah login -->
      <div v-if="userStore.user" class="row items-center q-gutter-sm">
        <q-avatar icon="person" color="white" text-color="primary" size="32px" />
        <div>
          <span>{{ userStore.user.username }} ({{ userStore.user.nama }})</span>
        </div>
        <q-btn
          dense
          color="negative"
          icon="logout"
          label="Logout"
          @click="handleLogout"
        />
      </div>

      <!-- Jika belum login -->
      <div v-else>
        <q-btn
          dense
          flat
          label="Login"
          icon="login"
          to="/login"
        />
      </div>

    </q-toolbar>
  </q-header>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const userStore = useUserStore()
const router = useRouter()
const $q = useQuasar()

function handleLogout() {
  $q.dialog({
    title: 'Konfirmasi',
    message: 'Yakin ingin logout?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    userStore.logout()
    router.push('/login')
  }).onCancel(() => {
    // Optional: aksi jika batal logout
    console.log('Logout dibatalkan')
  })
}
</script>
