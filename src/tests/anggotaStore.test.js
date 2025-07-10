import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAnggotaStore } from '@/stores/anggotaStore'

describe('anggotaStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('menambahkan anggota baru', () => {
    const store = useAnggotaStore()
    const anggotaBaru = { id: 1, nama: 'Budi', alamat: 'Jakarta' }

    store.tambahAnggota(anggotaBaru)

    expect(store.anggota.length).toBe(1)
    expect(store.anggota[0]).toEqual(anggotaBaru)
  })

  it('menghapus anggota berdasarkan ID', () => {
    const store = useAnggotaStore()
    store.anggota = [{ id: 1, nama: 'Budi' }, { id: 2, nama: 'Sari' }]

    store.hapusAnggota(1)

    expect(store.anggota.length).toBe(1)
    expect(store.anggota[0].id).toBe(2)
  })
})
