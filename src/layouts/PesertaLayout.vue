<template>
  <q-layout view="hHh lpR fFf">
    <!-- Header -->
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
          Peserta Panel
        </q-toolbar-title>

        <q-space />
        <q-btn flat dense icon="logout" @click="logout">
          <q-tooltip>Logout</q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- Sidebar -->
    <q-drawer v-model="drawer" show-if-above side="left" bordered>
      <q-list>
        <q-item-label header class="text-grey-8 q-ml-md">Menu</q-item-label>

        <q-item clickable to="/peserta" exact>
          <q-item-section avatar><q-icon name="home" /></q-item-section>
          <q-item-section>Beranda</q-item-section>
        </q-item>

        <q-item clickable to="/peserta/jadwal">
          <q-item-section avatar><q-icon name="event_note" /></q-item-section>
          <q-item-section>Jadwal</q-item-section>
        </q-item>

        <q-item clickable to="/peserta/event">
          <q-item-section avatar><q-icon name="emoji_events" /></q-item-section>
          <q-item-section>Event</q-item-section>
        </q-item>

        <q-item clickable to="/peserta/profil">
          <q-item-section avatar><q-icon name="person" /></q-item-section>
          <q-item-section>Profil</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Konten -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const drawer = ref(true)
const router = useRouter()
const $q = useQuasar()

const logout = () => {
  $q.dialog({
    title: 'Konfirmasi Logout',
    message: 'Apakah Anda yakin ingin keluar?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    localStorage.removeItem('userId')
    router.push('/login')
  })
}
</script>
