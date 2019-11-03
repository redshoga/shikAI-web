import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Index from '~/pages/index.vue'

describe('pages/index', () => {
  let wrapper
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  const router = new VueRouter()

  beforeEach(() => {
    wrapper = shallowMount(Index, {
      localVue,
      router
    })
  })

  test('Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('Jump to reader page', () => {
    expect(wrapper.vm.$route.path).toBe('/')
    wrapper.find('.button').trigger('click')
    expect(wrapper.vm.$route.path).toBe('/reader')
  })
})
