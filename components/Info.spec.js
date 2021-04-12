import { mount } from '@vue/test-utils'
import IconInfo from '~/components/icons/IconInfo.vue'

describe('Info', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(IconInfo)
    expect(wrapper.vm).toBeTruthy()
  })
})
