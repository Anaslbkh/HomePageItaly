<template>
  <section class="bg-blue-900 relative z-20 text-white -mt-6">
    <div class="container mx-auto py-12">
      <div class="flex justify-center mb-12">
        <ul class="flex">
          <li v-for="(link, social) in language.socials" :key="social">
            <a :href="link" target="_blank" rel="noopener nofollow" :aria-label="social" class="w-12 h-12 mx-3 flex items-center justify-center border border-white rounded hover:border-gray-700">
              <img
                :src="`${$paths.assetsUrl}images/${social}.svg`"
                :alt="`Logo: ${social}`"
                width="36"
                height="36"
                class="w-9 h-9"
                loading="lazy"
              >
            </a>
          </li>
        </ul>
      </div>
      <div class="flex justify-center leading-loose flex-col sm:flex-row">
        <p class="mx-4 font-bold">
          &copy; Parkos
        </p>
        <a :href="termsConditionsPageContent.url" class="mx-4 text-white hover:text-white">{{termsConditionsPageContent.title}}</a>
        <a :href="privacyPolicyPageContent.url" class="mx-4 text-white hover:text-white">{{privacyPolicyPageContent.title}}</a>
      </div>
    </div>
  </section>
</template>

<script>
import { getInstance } from '~/services/apiService'
import { getInstance as getBffInstance } from '~/services/bffService'

export default {
  data() {
    return {
      language: {}
    }
  },

  async fetch() {
    const api = getInstance('parkos', {
      baseURL: 'https://parkos.com/api/v1/'
    })

    const languages = await api.getLanguages()
    const currentLanguage = await Array.prototype.find.call(languages, language => language.domain === this.$paths.langHost)
    this.language = currentLanguage

    const bff = getBffInstance({
      baseURL: 'http://localhost:3001/'
    })

    this.termsConditionsContent = await bff.getPageContent(72)
    this.privacyPolicyContent = await bff.getPageContent(98)
  },

  computed: {
    termsConditionsPageContent() {
      if (this.termsConditionsContent && this.language) {
        const currentContent = this.termsConditionsContent[this.language.lang];
        return {title: currentContent.title, url: `${this.$paths.url()}${currentContent.slug}.html`}
      } else {
        return {title: 'Termini e condizioni', url: `${this.$paths.url()}termini-e-condizioni.html`}
      }
    },
    privacyPolicyPageContent() {
      if (this.privacyPolicyContent && this.language) {
        const currentContent = this.privacyPolicyContent[this.language.lang];
        return {title: currentContent.title, url: `${this.$paths.url()}${currentContent.slug}.html`}
      } else {
        return {title: 'Politique de confidentialité de Parkos', url: `${this.$paths.url()}privacy-policy.html`}
      }
    }
  }
}
</script>
