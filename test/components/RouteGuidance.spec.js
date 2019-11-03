import { shallowMount } from '@vue/test-utils'
import RouteGuidance from '~/components/RouteGuidance.vue'

describe('components/RouteGuidance', () => {
  let wrapper
  const sampleRoutes = [
    { 'id': 'DAI-0001-0000', 'distance': 7.0, 'direction': 'Front' },
    { 'id': 'DAI-0001-0001', 'distance': 8.0, 'direction': 'Right' },
    { 'id': 'DAI-0001-0002', 'distance': 10.0, 'direction': 'Front' },
    { 'id': 'DAI-0001-0003', 'distance': 3.0, 'direction': 'Right' },
    { 'id': 'DAI-0001-0004', 'distance': 2.0, 'direction': 'Left' },
    { 'id': 'DAI-0001-0005', 'distance': 6.0, 'direction': 'Right' },
    { 'id': 'DAI-0001-0006', 'distance': 3.0, 'direction': 'Front' }
  ]

  beforeEach(() => {
    wrapper = shallowMount(RouteGuidance, {
      propsData: {
        routes: sampleRoutes
      }
    })
  })

  test('Every route elements should be displayed', () => {
    wrapper.findAll('.route').wrappers.forEach((wrapper, idx) => {
      const viewData = sampleRoutes[idx]
      expect(wrapper.text().includes(viewData.distance)).toBeTruthy()
    })
  })

  test('Every route elements should not be displayed', () => {
    wrapper.setProps({
      routes: null
    })
    expect(wrapper.findAll('.route').wrappers.length).toBe(0)
  })
})
