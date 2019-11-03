import { shallowMount } from '@vue/test-utils'
import Index from '~/pages/index.vue'

describe('pages/index', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Index)
  })

  test('Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
