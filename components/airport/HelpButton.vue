f<template>
  <div>
    <div
      class="help-btn transition-bg-ease opacity-0 fixed right-2 inline-flex bottom-0 text-white bg-blue-500 z-50 py-3.5 px-3.5 rounded-full mb-3 hover:bg-blue-550 cursor-pointer"
      :class="{ 'opacity-100': isMounted }"
      @click="show()"
    >
      <img v-if="isLoading" src="~/static/icons/loop.svg" width="24" height="24" aria-hidden="true" alt="check" loading="lazy" class="inline sm:mr-1 relative">
      <img v-else src="~/static/icons/help.svg" width="24" height="24" aria-hidden="true" alt="check" loading="lazy" class="inline sm:mr-1 relative">

      <div class="hidden sm:block font-sans px-1.5 font-bold">
        {{ $i18n('general.help') }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getInstance } from '~/services/apiService';
import { Language as LanguageType } from '~/types/Language';

export default Vue.extend({
  data(): {
    isLoading: boolean,
    isMounted: boolean,
    language?: LanguageType
    } {
    return {
      isLoading: true,
      isMounted: false,
      language: undefined
    }
  },

  mounted() {
    this.load()

    setTimeout(() => {
      this.isMounted = true
    }, 100)
  },

  async fetch() {
    const slug = this.$route.params.airport;
    const api = getInstance('parkos', {
      baseURL: 'https://parkos.com/api/v1/',
    });

    const languages = await api.getLanguages();

    const currentLanguage = await Array.prototype.find.call(languages, (language) => language.domain === this.$paths.langHost);
    this.language = currentLanguage;
  },

  methods: {
    show() {
      this.$zendesk.show()
      this.$zendesk.open()
    },

    load() {
      this.$zendesk.load()

      this.$zendesk.$on('loaded', () => {
        this.$zendesk.setLocale(this.language!.lang)

        this.isLoading = false
      })
    }
  },
})
</script>

<style>
#launcher {
  display: none !important;
}
</style>
