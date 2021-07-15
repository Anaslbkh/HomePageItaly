<template>
    <div v-if="block" v-html="blockContent" />
</template>

<script>
import { getInstance } from '~/services/apiService'

export default {
  data() {
    return {
      block: undefined,
    }
  },

  props: {
    slug: undefined,
    language: undefined,
  },

  async fetch() {
    if (process.server) {
      const api = getInstance('parkos', {
        baseURL: 'https://parkos.com/api/v1/'
      })

      const block = await api.getPageTemplate(this.slug, this.language.lang);
      this.block = block.data;
    }
  },

  computed: {
    blockContent() {
      return this.block[this.language.lang]['page_content']
    }
  }
}
</script>