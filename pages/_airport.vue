<template>
  <div>
    <div class="container mx-auto">
      <p
        class="py-10 sm:py-24 text-2xl md:text-3xl text-blue-900 sm:text-center font-heading"
        v-html="$i18n('location.count-customers-merchants-airports-location', {
          'customers': '500.000',
          'merchants': parkings.length,
          'airport': airport ? airport.name : ''
        })"
      />
    </div>

    <section id="usps" class="bg-gray-200 border-t border-b border-gray-500 py-12 sm:py-24">
      <Usps />
    </section>

    <div id="support" class="pt-24 pb-16">
      <div class="container flex justify-between mx-auto pb-24">
        <div class="sm:w-1/2">
          <h2 class="text-3xl mb-10 font-heading">
            {{ $i18n('customer.we-support') }}
          </h2>
          <p class="text-base mb-4">
            {{ $i18n('customer.our-experts-description') }}
          </p>
          <a
            href="https://parkos.zendesk.com/hc/it"
            rel="nofollow"
            class="inline-block bg-primary-500 text-white p-3 text-lg font-heading rounded shadow-button hover:bg-primary-600 hover:no-underline hover:text-white focus:bg-primary-700"
          >
            {{ $i18n('customer.contact-us') }}
          </a>
        </div>
        <div class="hidden sm:block">
          <figure>
            <img
              :src="`${$paths.assetsUrl}img/home-customerservice.jpg`"
              width="252"
              height="252"
              alt="Customer Service Team"
              loading="lazy"
            >
          </figure>
        </div>
      </div>
    </div>
    <div class="container mx-auto">
      <div class="border-b border-gray-500" />
    </div>
    <section v-if="reviews && reviews.length > 3" id="reviews" class="pt-10 pb-24 overflow-hidden">
      <div class="container mx-auto mb-16">
        <div class="w-full lg:w-3/5">
          <ReviewSummary :meta="reviewsMeta.reviews" />
        </div>
      </div>

      <section class="relative mb-16">
        <div class="container mx-auto">
          <Review :review="reviews[0]" style="width: calc(50% - 470px); left: -150px" class="absolute top-0 hidden xl:block opacity-50" />
          <section class="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <Review :review="reviews[1]" />
            <Review :review="reviews[2]" />
          </section>
          <Review :review="reviews[3]" style="width: calc(50% - 470px); right: -150px" class="absolute top-0 hidden xl:block opacity-50" />
        </div>
      </section>
    </section>
    <section class="bg-gray-200 border-t border-b border-gray-500 py-24">
      <div v-html="airportData.content[language.lang].content" />
    </section>
    <section v-if="parkings && parkings.length" id="parkings" class="pt-24">
      <div class="container mx-auto mb-16">
        <h2 class="text-3xl text-blue-900 font-heading mb-24">
          {{ $i18n('templates.merchants-at-airport', { location: airport.name }) }}
        </h2>

        <section class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-16">
          <Parking v-for="parking in parkings" :key="parking.slug" :parking="parking" />
        </section>
      </div>
    </section>

    <Faq v-if="faq && faq.length > 0" :items="faq" class="pt-24" />

    <section id="map" class="bg-gray-200 border-t border-b border-gray-500 py-24">
      <div class="container mx-auto">
        <h2 class="text-3xl text-blue-900 font-heading mb-4">
          {{ $i18n('templates.map-parkinglots', { location: airport.name }) }}
        </h2>
        <p>
          {{ $i18n('templates.more-info-marker') }} <a :href="`${$paths.url(false)}${$route.path}${$i18n('additional.map-slug')}/`" class="text-blue-700 hover:text-blue-900 hover:underline">{{ $i18n('reservation.directions-to', {
            location: airport.name
          }) }}</a>
        </p>

        <Map :parkings="parkings" :airport="airport" />
      </div>
    </section>

    <HelpButton
      v-if="[
        'nl-be', 'nl', 'de', 'de-at', 'es', 'it', 'fr-be', 'fr', 'sv-se'
      ].includes(language.lang)"
      :language="language.lang"
    />
  </div>
</template>

<script>
/**
 * @TODO:
 * - Add route planner link
 */
import ReviewSummary from '~/components/reviews/Summary.vue'
import Review from '~/components/reviews/Review.vue'
import Map from '~/components/airport/Map.vue'
import Faq from '~/components/airport/Faq.vue'
import HelpButton from '~/components/airport/HelpButton.vue'
import Usps from '~/components/airport/Usps.vue'

import { getInstance } from '~/services/apiService'

export default {

  components: {
    Usps,
    ReviewSummary,
    Review,
    Map,
    Faq,
    HelpButton
  },

  layout: 'search',

  middleware: ['airportCheck'],
  
  data() {
    return {
      airport: null,
      airports: {},
      airportData: {},
      parkings: [],
      reviews: [],
      reviewsMeta: {},
      languages: {},
      language: null,
      faq: {}
    }
  },

  async fetch() {
    const slug = this.$route.params.airport
    const api = getInstance('parkos', {
      baseURL: 'https://parkos.com/api/v1/'
    })
    this.languages = await api.getLanguages()

    const currentLanguage = await Array.prototype.find.call(this.languages, language => language.domain === this.$paths.langHost)
    this.language = currentLanguage

    //this.airports = await api.getAirports(this.language.lang)
    this.airport = await api.getAirport(slug, this.language.lang)
    this.airportData = await api.getAirportData(slug, this.language.lang)

    this.parkings = await api.getAirportParkings(slug, this.language.lang)

    const reviewData = await api.getAirportReviews(slug, this.language.lang)
    this.reviews = reviewData.data[this.language.lang]
    this.reviewsMeta = reviewData.meta
    const faq = await api.getAirportFaq(slug, this.language.lang)
    this.faq = faq?.data[this.language.lang]
  },

  head() {
    if (this.airport === null) { return {} }

    const links = [{ rel: 'canonical', href: this.$paths.url(false) + this.$route.path }]

    // add alternate language links
    Object.entries(this.airportData.content).forEach(([lang, content]) => {
      // @ts-ignore @todo fix types
      links.push({ rel: 'alternate', hreflang: lang, href: String(content.url) })
    })

    return {
      title: this.airportData.content[this.language.lang].meta.title,
      meta: [
        { property: 'og:title', content: this.airportData.content[this.language.lang].meta.title },
        { name: 'description', content: this.airportData.content[this.language.lang].meta.description },
        { property: 'og:description', content: this.airportData.content[this.language.lang].meta.description },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: this.airportData.content[this.language.lang].meta.title },
        { name: 'twitter:site', content: this.language.socials.twitter ? `@${this.language.socials.twitter.split('/').pop()}` : '' },
        { name: 'twitter:creator', content: this.language.socials.twitter ? `@${this.language.socials.twitter.split('/').pop()}` : '' },
        { name: 'twitter:description', content: this.airportData.content[this.language.lang].meta.description },
        { name: 'twitter:image', content: `${this.$paths.assetsUrl}img/locations/${this.airport.devtitle}.jpg` },
        { property: 'og:type', content: 'place' },
        { property: 'og:locale', content: 'it' },
        { property: 'place:location:latitude', content: String(this.airport.address.latitude) },
        { property: 'place:location:longitude', content: String(this.airport.address.longitude) },
        { property: 'og:image', content: `${this.$paths.assetsUrl}/img/locations/${this.airport.devtitle}.jpg` },
        { property: 'og:url', content: this.$paths.url(false) + this.$route.path }
      ],
      link: links,
      script: [
        {
          hid: 'datalayer',
          innerHTML: `
            var dataLayer = [{
              airportDevTitle: '${this.airport.devtitle}',
              airportSlug: '${this.airport.slug}',
              airportName: '${this.airport.name}',
              pageType: 'locations',
              domainName: '${this.$paths.host}',
              token: '504Z8p2vH6TtWX7BJC0rYaArFl9sYKdAHfisTESx',
            }];
            var cId = document.cookie.match(/cId=([^ ;]*);?/);
            var ul = 0; var ps = '[]';
            if (!(cId === null && typeof cId === "object")) {
                dataLayer[0].cId = cId[1];
            }
          `,
          type: 'text/javascript'
        }
      ],
      __dangerouslyDisableSanitizersByTagID: {
        datalayer: ['innerHTML']
      }
    }
  },

  computed: {
    date() {
      return new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date())
    },
  }
}
</script>

<style>
.grey-text {
  @apply text-gray-700;
}
</style>
