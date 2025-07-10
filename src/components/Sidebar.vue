<template>
  <!-- Sidebar tampil hanya jika user sudah login dan isReady true -->
  <q-drawer
    v-if="isReady && userStore.user"
    show-if-above
    side="left"
    bordered
    class="bg-grey-2"
  >
    <q-list>
      <q-item-label header class="text-grey-8">Menu</q-item-label>

      <!-- Umum -->
      <q-item clickable tag="router-link" to="/">
        <q-item-section avatar>
          <q-icon name="home" />
        </q-item-section>
        <q-item-section>Beranda</q-item-section>
      </q-item>

      <!-- Menu untuk Admin -->
      <template v-if="userStore.isAdmin">
        <q-item clickable tag="router-link" to="/admin">
          <q-item-section avatar><q-icon name="dashboard" /></q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>
        <q-item clickable tag="router-link" to="/admin/jadwal">
          <q-item-section avatar><q-icon name="event" /></q-item-section>
          <q-item-section>Jadwal Latihan</q-item-section>
        </q-item>
        <q-item clickable tag="router-link" to="/admin/event">
          <q-item-section avatar><q-icon name="emoji_events" /></q-item-section>
          <q-item-section>Event Kejuaraan</q-item-section>
        </q-item>
        <q-item clickable tag="router-link" to="/admin/iuran">
          <q-item-section avatar><q-icon name="account_balance_wallet" /></q-item-section>
          <q-item-section>Iuran</q-item-section>
        </q-item>
        <q-item clickable tag="router-link" to="/admin/pengeluaran">
          <q-item-section avatar><q-icon name="money_off" /></q-item-section>
          <q-item-section>Pengeluaran</q-item-section>
        </q-item>
        <q-item clickable tag="router-link" to="/admin/laporan">
          <q-item-section avatar><q-icon name="bar_chart" /></q-item-section>
          <q-item-section>Laporan</q-item-section>
        </q-item>
        <q-item clickable tag="router-link" to="/admin/profil">
          <q-item-section avatar><q-icon name="person" /></q-item-section>
          <q-item-section>Profil</q-item-section>
        </q-item>
      </template>

      <!-- Menu untuk Peserta -->
      <template v-else-if="userStore.isPeserta">
        <q-item clickable tag="router-link" to="/peserta">
          <q-item-section avatar><q-icon name="dashboard" /></q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>
        <q-item clickable tag="router-link" to="/peserta/jadwal">
          <q-item-section avatar><q-icon name="event" /></q-item-section>
          <q-item-section>Jadwal Latihan</q-item-section>
        </q-item>
        <q-item clickable tag="router-link" to="/peserta/event">
          <q-item-section avatar><q-icon name="emoji_events" /></q-item-section>
          <q-item-section>Jadwal Event</q-item-section>
        </q-item>
        <q-item clickable tag="router-link" to="/peserta/profil">
          <q-item-section avatar><q-icon name="person" /></q-item-section>
          <q-item-section>Profil</q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-drawer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const isReady = ref(false)

onMounted(() => {
  userStore.loadUser()
  isReady.value = true
})
</script>
