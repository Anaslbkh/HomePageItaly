<template>
  <!-- <div class="flex justify-center">-->
  <div>
    <div class="container mx-auto">
      <p
        class="
          py-10
          sm:py-24
          text-2xl
          md:text-3xl
          text-blue-900
          sm:text-center
          font-heading
        "
        v-html="
          $i18n('location.count-customers-merchants-airports-location', {
            customers: '500.000',
            merchants: parkings,
            airport: airports ? `${airports.length} aeroporti diversi` : '',
          })
        "
      />
    </div>
    <section
      id="usps"
      class="bg-gray-200 border-t border-b border-gray-500 py-12 sm:py-24"
    >
      <Usps />
    </section>
    <div id="support" class="pt-24 pb-16">
      <div class="container flex justify-between mx-auto pb-24">
        <div class="sm:w-1/2">
          <h2 class="text-3xl mb-10 font-heading">
            {{ $i18n("customer.we-support") }}
          </h2>
          <p class="text-base mb-4">
            {{ $i18n("customer.our-experts-description") }}
          </p>
          <a
            href="https://parkos.zendesk.com/hc/it"
            rel="nofollow"
            class="
              inline-block
              bg-primary-500
              text-white
              p-3
              text-lg
              font-heading
              rounded
              shadow-button
              hover:bg-primary-600
              hover:no-underline
              hover:text-white
              focus:bg-primary-700
            "
          >
            {{ $i18n("customer.contact-us") }}
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
            />
          </figure>
        </div>
      </div>
    </div>
    <div class="container mx-auto">
      <div class="border-b border-gray-500" />
    </div>
    <section
      v-if="reviews && reviews.length > 0"
      id="reviews"
      class="pt-10 pb-24 overflow-hidden"
    >
      <div class="container mx-auto mb-16">
        <div class="w-full lg:w-3/5">
          <ReviewSummary :meta="reviewsMeta.reviews" />
        </div>
      </div>

      <section class="relative mb-16">
        <div class="container mx-auto">
          <Review
            :review="reviews[0]"
            style="width: calc(50% - 470px); left: -150px"
            class="absolute top-0 hidden xl:block opacity-50"
          />
          <section class="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <Review :review="reviews[1]" />
            <Review :review="reviews[2]" />
          </section>
          <Review
            :review="reviews[3]"
            style="width: calc(50% - 470px); right: -150px"
            class="absolute top-0 hidden xl:block opacity-50"
          />
        </div>
      </section>
    </section>
    <Description />
    <airportsDisplay
      :totalParkings="parkings"
      :airports="airports"
      :total="total"
    />
    <HelpButton
      v-if="
        [
          'nl-be',
          'nl',
          'de',
          'de-at',
          'es',
          'it',
          'fr-be',
          'fr',
          'sv-se',
        ].includes('it')
      "
      :language="'it'"
    />
  </div>
</template>

<script>
import Vue from "vue";
import Usps from "~/components/airport/Usps.vue";
import Description from "~/components/airport/DescriptionB.vue";
import airportsDisplay from "~/components/airport/airportsDisplayB.vue";
import HelpButton from "~/components/airport/HelpButton.vue";
import { getInstance } from "~/services/apiService";

import ReviewSummary from "~/components/reviews/Summary.vue";
import Review from "~/components/reviews/Review.vue";
export default Vue.extend({
  components: {
    Usps,
    ReviewSummary,
    Review,
    Description,
    airportsDisplay,
    HelpButton,
  },
  layout: "homeLayout",

  async asyncData({ params, $paths }) {
    const api = getInstance("parkos");

    const slug = "parcheggio-orio-al-serio";
    const languages = await api.getLanguages();
    const language = Array.prototype.find.call(
      languages,
      (language) => language.domain === $paths.langHost
    );
    console.time("await timer");

    const promises = [
      api.getAirport(slug, language.lang),
      api.getAirports(language.lang),
      api.getAirportReviews(slug, language.lang),
      api.getAirportFaq(slug, language.lang),
    ];

    return await Promise.all(promises).then(
      async ([airport, airports, reviewData]) => {
        const reviewsB = reviewData.data;
        const reviews = await reviewsB["it"].map((el) => {
          return el;
        });
        let total = [];
        airports.forEach(async (element) => {
          let airportParking = await api.getAirportParkings(element.slug, "it");
          total.push(airportParking.length);
        });
        const reviewsMeta = reviewData.meta;
        console.timeEnd("await timer");
        return {
          total,
          airport,
          airports,
          reviews,
          reviewsMeta,
        };
      }
    );
  },
  computed: {
    parkings() {
      return this.total.reduce((element, num) => {
        //this.totalParkings = this.totalParkings + element;
        return element + num;
      }, 0);
    },
  },
  data() {
    return {
      airport: null,
      airports: {},
      total: [],
      reviews: [],
      reviewsMeta: {},
      languages: {},
      language: null,
      totalParkings: null,
    };
  },
});
</script>

<style>
.grey-text {
  @apply text-gray-700;
}

.list-decimal {
  list-style: decimal;
}
</style>
