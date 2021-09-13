<template>
  <div itemscope itemtype="http://schema.org/Product">
    <meta
      itemprop="description"
      :content="airportData.content[language.lang].meta.description"
    >
    <meta itemprop="name" :content="airportData.content[language.lang].meta.description">
    <meta
      itemprop="image"
      :content="`${$paths.assetsUrl}img/locations/bergamo-orio-airport.jpg`"
    >
    <meta itemprop="brand" :content="airportData.airport.devtitle.replace('-', ' ')">
    <div
      itemprop="offers"
      itemscope=""
      itemtype="http://schema.org/AggregateOffer"
    >
      <meta itemprop="priceCurrency" content="EUR">
      <meta itemprop="lowPrice" :content="(airportData.airport.from_price / 8).toFixed(2)">
    </div>
    <div
      itemprop="aggregateRating"
      itemscope=""
      itemtype="http://schema.org/AggregateRating"
    >
      <meta itemprop="worstRating" content="1">
      <p class="text-3xl mb-10 font-heading">
        {{ $i18n('templates.customer-parking-reviews-title', {
          airportName: airportData.airport.name,
          reviewsScoreAvg: new Intl.NumberFormat('it').format(meta.score.toFixed(1)) // @TODO dynamic number format
        }) }}
      </p>
      <p
        class="text-base"
        v-html="$i18n('templates.customer-parking-reviews-intro-schema', {
          airportName: airportData.airport.name,
          'price-per-day-raw': airportData.airport.from_price,
          'price-per-day': airportData.airport.from_price,
          reviewPageUrl: '#',
          reviewsScoreAvg: new Intl.NumberFormat('it').format(meta.score.toFixed(1)), // @TODO dynamic number format
          reviewsTotal: meta.count
        })"
      />
    </div>
  </div>
</template>

<script>
/**
 * @TODO:
 * - Fill in meta props
 */
import { getInstance } from '~/services/apiService'

export default {
  props: {
    meta: {
      type: Object,
      required: false
    }
  },

  data() {
    return {
      airportData: {},
      language: {}
    }
  },

  async fetch() {
    const slug = this.$route.params.airport
    const api = getInstance('parkos')

    const languages = await api.getLanguages()
    const currentLanguage = await Array.prototype.find.call(languages, language => language.domain === this.$paths.langHost)
    this.language = currentLanguage
    this.airportData = await api.getAirportData(slug, currentLanguage.lang)
  }
}
</script>
