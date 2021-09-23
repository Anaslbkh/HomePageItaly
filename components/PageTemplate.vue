<template>
  <div v-if="!$fetchState.pending && block">
    <div v-html="blockContent"/>
  </div>
</template>

<script>
  import {getInstance} from '~/services/apiService'

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
      const api = getInstance('parkos')
      this.block = await api.getPageTemplate(this.slug, this.language.lang);
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
