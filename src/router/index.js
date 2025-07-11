import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

// Layouts
import AdminLayout from '@/layouts/AdminLayout.vue'
import PesertaLayout from '@/layouts/PesertaLayout.vue'

// Pages
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

  // Admin layout with children
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

  // Peserta layout with children
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

  // Route root: arahkan berdasarkan role
  {
    path: '/',
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore()
      userStore.loadUser()
      const user = userStore.user

      if (user?.role === 'admin') {
        return next('/admin')
      } else if (user?.role === 'peserta') {
        return next('/peserta')
      }

      return next('/login')
    }
  },

  // Catch-all route
  {
    path: '/:pathMatch(.*)*',
    redirect: '/unauthorized'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ✅ Route Guard Lengkap
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  // Pastikan user dimuat dari localStorage
  if (!userStore.user) {
    userStore.loadUser()
  }

  const isLoggedIn = userStore.isLoggedIn
  const requiredRole = to.meta.role
  const requiresAuth = to.meta.requiresAuth

  console.log('[guard] Checking route:', to.fullPath)
  console.log('[guard] isLoggedIn:', isLoggedIn)
  console.log('[guard] requiredRole:', requiredRole)
  console.log('[guard] user:', userStore.user)

  // 1. Belum login, tapi route butuh login → redirect ke login
  if (requiresAuth && !isLoggedIn) {
    console.log('[guard] Belum login → redirect ke /login')
    return next('/login')
  }

  // 2. Sudah login, tapi role tidak cocok → redirect ke unauthorized
  if (requiresAuth && requiredRole && isLoggedIn) {
    const userRole = userStore.user?.role
    if (userRole !== requiredRole) {
      console.log('[guard] Role tidak cocok → redirect ke /unauthorized')
      return next('/unauthorized')
    }
  }

  // 3. Lolos semua pengecekan → lanjut
  next()
})

export default router
