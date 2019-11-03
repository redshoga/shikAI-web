import { mount } from '@vue/test-utils'
import Index from '~/pages/index.vue'

describe('pages/index', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Index)
  })

  test('Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
