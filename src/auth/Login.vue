<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2" style="min-height: 100vh;">
        <q-card class="q-pa-lg shadow-2" style="width: 400px; max-width: 90vw;">
          <q-card-section>
            <div class="text-h6 text-center">Login</div>
          </q-card-section>

          <q-card-section>
            <q-input
              filled
              v-model="username"
              label="Username"
              lazy-rules
              :rules="[val => !!val || 'Username wajib diisi']"
              prepend-icon="person"
            />

            <q-input
              filled
              v-model="password"
              label="Password"
              type="password"
              lazy-rules
              :rules="[val => !!val || 'Password wajib diisi']"
              prepend-icon="lock"
              class="q-mt-md"
            />

            <q-btn
              label="Login"
              color="primary"
              class="q-mt-lg full-width"
              @click="login"
            />
          </q-card-section>

          <q-card-section v-if="errorMessage">
            <q-banner class="bg-red-2 text-red-9" dense>
              {{ errorMessage }}
            </q-banner>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()
const userStore = useUserStore()

async function login() {
  errorMessage.value = ''

  try {
    const res = await axios.get(`http://localhost:3000/users?username=${username.value}&password=${password.value}`)

    if (res.data.length === 1) {
      const user = res.data[0]
      userStore.login(user)

      if (user.role === 'admin') {
        router.push('/admin')
      } else if (user.role === 'peserta') {
        router.push('/peserta')
      } else {
        router.push('/unauthorized')
      }
    } else {
      errorMessage.value = 'Login gagal! Username atau password salah.'
    }
  } catch (err) {
    errorMessage.value = 'Terjadi kesalahan saat menghubungi server.'
  }
}
</script>
