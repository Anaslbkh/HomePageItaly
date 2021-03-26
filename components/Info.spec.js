import { mount } from '@vue/test-utils'
import Info from '@/components/Info.vue'

describe('Info', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Info)
    expect(wrapper.vm).toBeTruthy()
  })
})
