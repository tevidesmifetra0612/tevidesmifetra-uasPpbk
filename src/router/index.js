import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

// Layouts
import AdminLayout from '@/layouts/AdminLayout.vue'
import PesertaLayout from '@/layouts/PesertaLayout.vue'

// Pages
import Login from '@/auth/Login.vue'
import unauthorized from '@/layouts/unauthorized.vue'
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
  { path: '/unauthorized', component: unauthorized },

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

  // ✅ Route root: arahkan sesuai role
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

      return next('/login') // default jika belum login atau role tidak dikenal
    }
  },

  // ✅ Catch-all route: arahkan ke unauthorized
  {
    path: '/:pathMatch(.*)*',
    redirect: '/unauthorized'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ✅ Navigation guard untuk cek login dan role
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (!userStore.user) {
    userStore.loadUser()
  }

  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    return next('/login')
  }

  if (to.meta.role && userStore.user?.role !== to.meta.role) {
    return next('/unauthorized')
  }

  next()
})

export default router
