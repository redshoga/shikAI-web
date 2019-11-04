import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Reader from '~/pages/reader.vue'

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

    wrapper = shallowMount(Reader, {
      localVue,
      router,
      store
    })
  })

  test('Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
