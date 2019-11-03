import { shallowMount } from '@vue/test-utils'
import Reader from '~/pages/reader.vue'

describe('pages/index', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Reader)
  })

  test('Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
