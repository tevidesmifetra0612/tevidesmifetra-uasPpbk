import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

// Quasar
import {
  Quasar,
  Dialog,
  QInput,
  QBtn,
  QCard,
  QCardSection,
  QBanner,
  QPage
} from 'quasar'

import 'quasar/dist/quasar.css'
import '@quasar/extras/material-icons/material-icons.css'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

app.use(Quasar, {
  plugins: {
    Dialog
  },
  components: {
    QInput,
    QBtn,
    QCard,
    QCardSection,
    QBanner,
    QPage
  }
})

// Import store dan setup async
import { useUserStore } from '@/stores/userStore'

async function setup() {
  const userStore = useUserStore()
  await userStore.loadUser()

  router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !userStore.isLoggedIn) {
      if (to.path !== '/login') return next('/login')
      return next()
    }

    if (to.meta.role && userStore.user?.role !== to.meta.role) {
      return next('/unauthorized')
    }

    next()
  })

  app.mount('#app')
}

setup()
