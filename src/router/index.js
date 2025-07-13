import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

import AdminLayout from '@/layouts/AdminLayout.vue'
import PesertaLayout from '@/layouts/PesertaLayout.vue'
import Login from '@/auth/Login.vue'
import Unauthorized from '@/layouts/unauthorized.vue'
import AdminDashboard from '@/dashboard/AdminDashboard.vue'
import PesertaDashboard from '@/dashboard/PesertaDashboard.vue'
import LihatJadwal from '@/jadwal/LihatJadwal.vue'
import FormJadwal from '@/jadwal/FormJadwal.vue'
import DaftarEvent from '@/event/DaftarEvent.vue'
import FormEvent from '@/event/FormEvent.vue'
import Iuran from '@/keuangan/Iuran.vue'
import Pengeluaran from '@/keuangan/Pengeluaran.vue'
import TambahPengeluaran from '@/keuangan/TambahPengeluaran.vue'
import Laporan from '@/laporan/Laporan.vue'
import Profil from '@/user/Profil.vue'

const routes = [
  { path: '/login', component: Login },
  { path: '/unauthorized', component: Unauthorized },

  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      { path: '', component: AdminDashboard },
      { path: 'jadwal', component: LihatJadwal },
      { path: 'jadwal/form', component: FormJadwal },
      { path: 'event', component: DaftarEvent },
      { path: 'event/form', component: FormEvent },
      { path: 'iuran', component: Iuran },
      { path: 'pengeluaran', component: Pengeluaran },
      { path: 'pengeluaran/tambah', component: TambahPengeluaran },
      { path: 'laporan', component: Laporan },
      { path: 'profil', component: Profil }
    ]
  },

  {
    path: '/peserta',
    component: PesertaLayout,
    meta: { requiresAuth: true, role: 'peserta' },
    children: [
      { path: '', component: PesertaDashboard },
      { path: 'jadwal', component: LihatJadwal },
      { path: 'event', component: DaftarEvent },
      { path: 'profil', component: Profil }
    ]
  },

  {
    path: '/',
   
      return: '/login'
    },

  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ✅ Pindahkan guard ke sini
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (!userStore.user) {
    userStore.loadUser()
  }

  const isLoggedIn = userStore.isLoggedIn
  const requiredRole = to.meta.role
  const requiresAuth = to.meta.requiresAuth

  if (requiresAuth && !isLoggedIn) {
    return next('/login')
  }

  if (requiresAuth && requiredRole && isLoggedIn) {
    if (userStore.user?.role !== requiredRole) {
      return next('/unauthorized')
    }
  }

  next()
})

export default router
