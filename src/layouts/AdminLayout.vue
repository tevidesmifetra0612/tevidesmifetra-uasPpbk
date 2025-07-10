<!-- src/layouts/AdminLayout.vue -->
<template>
  <q-layout view="hHh lpR fFf">
    <!-- Navbar / Header -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          @click="drawer = !drawer"
          aria-label="Toggle drawer"
        />
        <q-toolbar-title>
          Admin Panel
        </q-toolbar-title>

        <q-space />
        <q-btn flat dense icon="logout" @click="logout">
          <q-tooltip>Logout</q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- Sidebar / Drawer -->
    <q-drawer v-model="drawer" show-if-above side="left" bordered>
      <q-list>
        <q-item-label header class="text-grey-8 q-ml-md">Navigasi</q-item-label>

        <q-item clickable to="/admin" exact>
          <q-item-section avatar><q-icon name="dashboard" /></q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>

        <q-item clickable to="/admin/jadwal">
          <q-item-section avatar><q-icon name="event" /></q-item-section>
          <q-item-section>Jadwal Latihan</q-item-section>
        </q-item>

        <q-item clickable to="/admin/event">
          <q-item-section avatar><q-icon name="emoji_events" /></q-item-section>
          <q-item-section>Event</q-item-section>
        </q-item>

        <q-item clickable to="/admin/iuran">
          <q-item-section avatar><q-icon name="payments" /></q-item-section>
          <q-item-section>Iuran</q-item-section>
        </q-item>

        <q-item clickable to="/admin/pengeluaran">
          <q-item-section avatar><q-icon name="money_off" /></q-item-section>
          <q-item-section>Pengeluaran</q-item-section>
        </q-item>

        <q-item clickable to="/admin/laporan">
          <q-item-section avatar><q-icon name="summarize" /></q-item-section>
          <q-item-section>Laporan</q-item-section>
        </q-item>

        <q-item clickable to="/admin/profil">
          <q-item-section avatar><q-icon name="person" /></q-item-section>
          <q-item-section>Profil</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Isi Halaman -->
    <q-page-container>
      <router-view /> <!-- Semua halaman anak admin ditampilkan di sini -->
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const drawer = ref(true)
const router = useRouter()

const logout = () => {
  localStorage.removeItem('userId')
  router.push('/login')
}
</script>
