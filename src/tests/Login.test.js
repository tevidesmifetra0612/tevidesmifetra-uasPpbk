import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/en-us'
import Login from '@/auth/Login.vue'
import { createTestingPinia } from '@pinia/testing'
import axios from 'axios'
import { useUserStore } from '@/stores/userStore'

vi.mock('axios')

const router = createRouter({
  history: createMemoryHistory(),
  routes: []
})

const $qMock = {
  screen: {
    width: 1024,
    height: 768,
    name: 'md',
    lt: {},
    gt: {}
  },
  platform: {
    has: (feature) => {
      return ['touch', 'mobile'].includes(feature) ? false : true
    }
  }
}

describe('Login.vue', () => {
  it('menampilkan input dan tombol login', () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [router, createTestingPinia(), [Quasar, { lang: quasarLang }]],
        mocks: {
          $q: $qMock
        }
      }
    })

    expect(wrapper.find('input[aria-label="Username"]').exists()).toBe(true)
    expect(wrapper.find('input[aria-label="Password"]').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('Login')
  })

  it('berhasil login dengan kredensial yang benar', async () => {
    const mockUser = { id: 1, username: 'admin', role: 'admin' }
    axios.get.mockResolvedValueOnce({ data: [mockUser] })

    const wrapper = mount(Login, {
      global: {
        plugins: [router, createTestingPinia({ stubActions: false }), [Quasar, { lang: quasarLang }]],
        mocks: {
          $q: $qMock
        }
      }
    })

    await wrapper.find('input[aria-label="Username"]').setValue('admin')
    await wrapper.find('input[aria-label="Password"]').setValue('123')
    await wrapper.find('button').trigger('click')

    await wrapper.vm.$nextTick()

    const userStore = useUserStore()
    expect(userStore.user).toEqual(mockUser)
  })
})
