<template>
  <router-view />
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'

// Saat aplikasi dimuat, cek dan load user dari localStorage
const userStore = useUserStore()
userStore.loadUser()
</script>
