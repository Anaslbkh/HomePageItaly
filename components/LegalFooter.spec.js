import { mount } from '@vue/test-utils'
import LegalFooter from '@/components/LegalFooter.vue'

describe('LegalFooter', () => {
    test('is a Vue instance', () => {
        const wrapper = mount(LegalFooter)
        wrapper.setData({
            $currentLanguage: {
                "id": 1,
                "object": "language",
                "lang": "nl",
                "name": "Nederlands",
                "native_name": "Nederland",
                "domain": "parkos.nl",
                "gtm_key": "GTM-WCGZS5P",
                "socials": {
                    "facebook": "https://www.facebook.com/parkosnl",
                    "twitter": "https://twitter.com/parkosnl",
                    "youtube": "http://www.youtube.com/c/Parkosnl"
                }
            },
        })
        expect(wrapper.vm).toBeTruthy()
    })
})
