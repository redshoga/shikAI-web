import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Index from '~/pages/index.vue'
import { state, getters, mutations, actions } from '~/store/index'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
const router = new VueRouter()

describe('pages/index', () => {
  let wrapper
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      state, getters, mutations, actions
    })

    wrapper = shallowMount(Index, {
      localVue,
      router,
      store
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
