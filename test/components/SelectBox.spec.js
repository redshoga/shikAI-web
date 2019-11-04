import { shallowMount } from '@vue/test-utils'
import SelectBox from '~/components/SelectBox.vue'

describe('components/SelectBox', () => {
  let wrapper
  const sampleOptions = [{ label: 'hoge', value: '1' }, { label: 'fuga', value: '2' }]
  const sampleName = 'sample'

  beforeEach(() => {
    wrapper = shallowMount(SelectBox, {
      propsData: {
        name: sampleName,
        options: sampleOptions,
        value: null
      }
    })
  })

  test('Every option should be rendered', () => {
    wrapper.findAll('option').wrappers.forEach((wrapper, idx) => {
      expect(wrapper.text()).toBe(sampleOptions[idx].label)
      expect(wrapper.attributes('value')).toBe(sampleOptions[idx].value)
    })
  })

  test('Every option should not be rendered', () => {
    wrapper.setProps({ options: [] })
    expect(wrapper.findAll('option').wrappers.length).toBe(0)
  })
})
