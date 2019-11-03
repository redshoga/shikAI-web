import { mount } from '@vue/test-utils'
import Reader from '~/pages/reader.vue'

describe('pages/index', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Reader)
  })

  test('Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
