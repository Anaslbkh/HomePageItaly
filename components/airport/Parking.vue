<template>
  <a :href="`${$paths.url()}${airport.slug}/${parking.slug}.html`" class="text-black hover:no-underline hover:text-blue-300">
    <article class="bg-white border border-gray-500 rounded">
      <div class="flex items-center justify-center p-12">
        <img
          :src="parking.logo"
          :alt="parking.name"
          width="180"
          height="52"
          loading="lazy"
        >
      </div>
      <p class="flex flex-col text-center p-4 border-t border-gray-500">
        <strong>{{ parking.name }}</strong>
        <span v-if="parking.from_price > 0">
          {{ $i18n('templates.from-x-euro-week', { amount: price }) }}
        </span>
      </p>
    </article>
  </a>
</template>

<script>
import { getInstance } from '~/services/apiService'

export default {

  props: {
    parking: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      airport: {},
      language: {}
    }
  },

  async fetch() {
    const api = getInstance('parkos')

    const languages = await api.getLanguages()
    this.language = await Array.prototype.find.call(languages, language => language.domain === this.$paths.langHost)
    this.airport = await api.getAirport(this.$route.params.airport, this.language.lang)
  },

  computed: {
    price() {
      if (!this.parking.from_price) { return '' }

      return new Intl.NumberFormat(this.language.lang, {
        style: 'currency',
        currency: this.language.currency.iso_code || 'EUR'
      }).format(this.parking.from_price)
    }
  }
}
</script>
