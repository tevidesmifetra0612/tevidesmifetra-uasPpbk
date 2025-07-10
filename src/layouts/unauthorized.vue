<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-xl text-center" style="max-width: 500px;">
      <q-icon name="block" size="64px" color="red" class="q-mb-md" />
      <div class="text-h5 text-negative q-mb-sm">Akses Ditolak</div>
      <div class="text-subtitle2 q-mb-md">
        Anda tidak memiliki izin untuk mengakses halaman ini.
      </div>
      <q-btn color="primary" label="Kembali ke Beranda" @click="goHome" />
    </q-card>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>
