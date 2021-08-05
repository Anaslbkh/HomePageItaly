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
      const api = getInstance('parkos')

      const block = await api.getPageTemplate(this.slug, this.language.lang);
      this.block = block;
      console.log(this.block);
    }
  },

  computed: {
    blockContent() {
      return this.block['page_content']
    }
  }
}
</script>

<style scoped>
.text-white a,
.text-white a:hover {
  color: inherit;
}

.strong {
  font-weight: bolder;
}
</style>
