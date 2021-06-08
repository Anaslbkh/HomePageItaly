<template>
    <div v-if="block" v-html="blockContent" />
</template>

<script>
import { getInstance } from '~/services/apiService'

export default {
  data() {
    return {
      block: undefined,
      languages: undefined,
    }
  },

  props: {
    slug: undefined,
  },

  async fetch() {
    const api = getInstance('parkos-test', {
      baseURL: 'http://parkos.test/api/v1/'
    })

    const languages = await api.getLanguages()
    const currentLanguage = await Array.prototype.find.call(languages, language => language.domain === this.$paths.langHost)
    this.language = currentLanguage;

    const block = await api.getPageTemplate(this.slug, this.language.lang);
    this.block = block.data;
  },

  computed: {
    blockContent() {
      return this.block[this.language.lang]['page_content']
    }
  }
}
</script>