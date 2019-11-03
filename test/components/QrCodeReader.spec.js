import { shallowMount } from '@vue/test-utils'
import QrCodeReader from '~/components/QrCodeReader.vue'

describe('components/QrCodeReader', () => {
  let wrapper
  const mockInitMethod = jest.fn()

  beforeEach(() => {
    wrapper = shallowMount(QrCodeReader, {
      methods: {
        init() {
          mockInitMethod()
        }
      }
    })

    global.navigator.mediaDevices = {
      getUserMedia: jest.fn()
    }
  })

  test('Init method should be called', () => {
    expect(mockInitMethod).toBeCalled()
  })
})
