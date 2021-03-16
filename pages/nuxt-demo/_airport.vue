<template>
  <div>
    <p class="py-24 text-3xl text-gray-700 text-center font-heading">We help you compare <span class="text-blue-900">parking prices</span> at <span class="text-blue-900">Schiphol Airport</span>.</p>

    <section id="usps" class="bg-gray-200 border-t border-b border-gray-500 py-24">
      <div class="container mx-auto text-center">
        <p class="text-3xl text-blue-900 font-heading mb-8">What makes Parkos unique?</p>
        <section class="w-3/5 mx-auto grid grid-cols-3">
          <article class="flex flex-col items-center justify-start">
            <span class="material-icons text-5xl text-blue-500 mb-4">assignment_turned_in</span>
            <p>All parking lots are carefully <strong>inspected</strong></p>
          </article>
          <article class="flex flex-col items-center justify-start">
            <span class="material-icons text-5xl text-blue-500 mb-4">local_offer</span>
            <p>The best <strong>deals</strong></p>
          </article>
          <article class="flex flex-col items-center justify-start">
            <span class="material-icons text-5xl text-blue-500 mb-4">history</span>
            <p><strong>Free</strong> cancellation up until 24 hours before departure</p>
          </article>
        </section>
      </div>
    </section>
    <div id="support" class="pt-24 pb-16">
      <div class="container flex justify-between mx-auto pb-24 border-b border-gray-500">
        <div class="w-1/2">
          <h2 class="text-3xl mb-10 font-heading">How can we help you?</h2>
          <p class="text-base mb-4">Our experts are here to assist you with comparing parking locations and are happy to answer any questions you may have.</p>
          <a
            href="#support"
            class="inline-block bg-primary-500 text-white p-3 text-lg font-heading rounded shadow-button hover:bg-primary-600 focus:bg-primary-700"
          >
            Please contact us
          </a>
        </div>
        <div>
          <figure>
            <img src="https://assets.parkos.com/assets/img/home-customerservice.jpg" alt="Customer Service Team">
          </figure>
        </div>
      </div>
    </div>
    <section id="reviews" class="pt-10 pb-24 overflow-hidden">
      <div class="container mx-auto mb-16">
        <div class="w-3/5">
          <ReviewSummary :meta="reviewsMeta" />
        </div>
      </div>
      <section class="grid grid-cols-4 gap-20" style="margin-left: -2rem; margin-right: -2px">
        <Review v-for="review in reviews" :key="`review-${review.id}`" :review="review" />
      </section>
    </section>
    <section id="usps" class="bg-gray-200 border-t border-b border-gray-500 py-24">
      <div class="container mx-auto text-center">
      { topblock content }
      </div>
    </section>
    <section id="parkings" class="py-24">
      <div class="container mx-auto mb-16">
        <h2 class="text-3xl text-blue-900 font-heading mb-24">Parking providers at Schiphol Airport</h2>

        <section class="grid grid-cols-4 gap-x-8 gap-y-16">
          <Parking v-for="parking in parkings" :key="parking.slug" :parking="parking" />
        </section>
      </div>
    </section>
    <section id="map" class="bg-gray-200 border-t border-b border-gray-500 py-24">
      <div class="container mx-auto">
        <h2 class="text-3xl text-blue-900 font-heading mb-4">Schiphol airport parking map</h2>
        <p>For more information about the parking provider in question press on the "P" icon. <a href="https://eu.parkos.com/schiphol-parking/travel-directions/" class="text-blue-700">Plan your route to Schiphol Airport</a></p>

        <Map />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Map from '../../components/airport/Map.vue';

import ReviewSummary from '../../components/reviews/Summary.vue';
import Review from '../../components/reviews/Review.vue';
import { Parking as ParkingType } from "../../types/Parking";
import { Review as ReviewType } from "../../types/Review";
import { Airport as AirportType } from '../../types/Airport';

const locale = 'nl-NL';
export default Vue.extend({
  head: {
    title: "Long stay parking at Schiphol? 100% lowest price guarantee",
    meta: [
      { property: 'og:title', content: 'Long stay parking at Schiphol? 100% lowest price guarantee' },
      { name: 'description', content: 'Long stay parking at Schiphol? ✓ 500.000 Customers went before you ✓ Nowhere cheaper ✓ FREE cancellation ✓ Find the #1 DEAL for long stay parking at Schiphol.' },
      { property: 'og:description', content: 'Long stay parking at Schiphol? ✓ 500.000 Customers went before you ✓ Nowhere cheaper ✓ FREE cancellation ✓ Find the #1 DEAL for long stay parking at Schiphol.' },
      { property: 'og:image', content: 'https://assets.parkos.com/assets/img/locations/schiphol-airport.jpg' },
      { property: 'og:url', content: 'https://eu.parkos.com/schiphol-parking/' },
    ]
  },

  components: {
    ReviewSummary,
    Review,
    Map,
  },

  data() {
    return {
      parkings: [] as Array<ParkingType>,
      reviews: [] as Array<ReviewType>,
      reviewsMeta: {},
      airports: [] as Array<AirportType>
    };
  },

  async asyncData({params, $axios}) {
    const parkings = (await $axios.$get('parkings', { params })).data;
    const reviews = await $axios.$get('reviews', { params });
    const airports = (await $axios.$get('airports')).data;
    
    return {
      parkings,
      reviews: reviews.data[locale],
      reviewsMeta: reviews.meta,
      airports,
    }
  },

  computed: {
    date() {
      return new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date())
    },
  }
});
</script>