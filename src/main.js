import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

import { Quasar, Dialog, Notify } from 'quasar' // ✅ Tambahkan Notify
import 'quasar/dist/quasar.css'
import '@quasar/extras/material-icons/material-icons.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Quasar, {
  plugins: {
    Dialog,
    Notify     // ✅ Aktifkan plugin Notify di sini
  }
})

app.mount('#app')
