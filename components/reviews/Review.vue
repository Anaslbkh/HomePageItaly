<template>
  <article v-if="!$fetchState.pending" class="px-4 py-3 border border-gray-500 rounded">
    <div class="flex justify-between items-center mb-1">
      <div>
        <p class="text-sm font-semibold text-gray-700">
          {{ review.name }}
        </p>
        <p class="font-semibold">
          {{ date }}
        </p>
      </div>
      <p class="text-3xl font-semibold border-b-4 border-blue-500 font-heading leading-tight">
        {{ review.score }}
      </p>
    </div>
    <p class="w-full">
      <img
        src="~/static/icons/quote.svg"
        width="16"
        height="16"
        aria-hidden="true"
        alt="check"
        loading="lazy"
        class="inline mr-1 -top-1 relative"
      > {{ review.content }}
    </p>
  </article>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Review } from '../../types/Review'
import { Language as LanguageType } from '../../types/Language'
import { getInstance } from '~/services/apiService'

export default Vue.extend({
  props: {
    review: {
      type: Object,
      required: true
    } as PropOptions<Review>
  },

  data(): {
    language?: LanguageType
    } {
    return {
      language: undefined
    }
  },

  async fetch() {
    const slug = this.$route.params.airport
    const api = getInstance('parkos')

    const languages = await api.getLanguages()

    const currentLanguage = await Array.prototype.find.call(languages, language => language.domain === this.$paths.langHost)
    this.language = currentLanguage
  },

  computed: {
    date(): string {
      return new Intl.DateTimeFormat(this.language!.lang, {
        dateStyle: 'full'
      }).format(new Date(this.review.date))
    }
  }
})
</script>
