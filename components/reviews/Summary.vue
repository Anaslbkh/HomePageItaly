<template>
  <div itemscope itemtype="http://schema.org/Product">
    <meta
      itemprop="description"
      :content="$currentAirportContent.meta.description"
    />
    <meta itemprop="name" :content="$currentAirportContent.meta.title" />
    <meta
      itemprop="image"
      content="https://assets.parkos.com/assets/img/locations/bergamo-orio-airport.jpg"
    />
    <meta itemprop="brand" :content="$currentAirport.devtitle.replace('-', ' ')" />
      <div
        itemprop="offers"
        itemscope=""
        itemtype="http://schema.org/AggregateOffer"
      >
        <meta itemprop="priceCurrency" content="EUR" />
        <meta itemprop="lowPrice" :content="$currentAirport.from_price / 8" />
      </div>
      <div
        itemprop="aggregateRating"
        itemscope=""
        itemtype="http://schema.org/AggregateRating"
      >
        <meta itemprop="worstRating" content="1" />
        <p class="text-3xl mb-10 font-heading">
          {{ $i18n('templates.customer-parking-reviews-title', {
            airportName: $currentAirport.name,
            reviewsScoreAvg: meta.score
          }) }}
        </p>
        <p class="text-base" v-html="$i18n('templates.customer-parking-reviews-intro-schema', {
            airportName: $currentAirport.name,
            'price-per-day-raw': $currentAirport.from_price,
            'price-per-day': $currentAirport.from_price,
            reviewPageUrl: '#',
            reviewsScoreAvg: meta.score,
            reviewsTotal: meta.count
          })">
        </p>
      </div>
    </div>
</template>

<script lang="ts">
/**
 * @TODO:
 * - Fill in meta props
 */
import Vue from "vue";
export default Vue.extend({

  props: {
    meta: {
      type: Object,
      required: false,
    },
  },
});
</script>
