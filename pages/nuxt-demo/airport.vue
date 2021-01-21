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
    <section id="reviews" class="py-24 overflow-hidden">
      <div class="container mx-auto mb-16">
        <div class="w-3/5">
          <h2 class="text-3xl mb-10 font-heading">Customers rate our car parking providers with an average of 9.1</h2>
          <p class="text-base">Customers who have booked a parking space through us, rate these with an average of 9.1/10 based on 70 reviews.</p>
        </div>
      </div>
      <section class="grid grid-cols-4 gap-20" style="margin-left: -2rem; margin-right: -2px">
        <article v-for="i in 4" :key="`review-${i}`" class="px-4 py-3 border border-gray-500 rounded" :class="{ 'opacity-50': i === 1 || i === 4}">
          <div class="flex justify-between items-center mb-1">
            <div>
              <p class="text-sm font-semibold text-gray-700">Parkos Customer #{{ i }}</p>
              <p class="font-semibold">{{ date }}</p>
            </div>
            <p class="text-3xl font-semibold border-b-4 border-blue-500 font-heading leading-tight">10</p>
          </div>
          <p class="w-full"><span class="material-icons text-3xl text-blue-500 relative" style="top: 0.5rem;">format_quote</span>{{ reviews[i - 1] }}</p>
        </article>
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
          <article v-for="i in 21" :key="`airport-offers-${i}`" class="border border-gray-500 rounded">
            <div class="flex items-center justify-center p-12">
              <img src="https://assets.parkos.com/assets/img/parkings/logos/247parkeren.png" :alt="`Parking #${i}`">
            </div>
            <p class="flex flex-col text-center p-4 border-t border-gray-500">
              <strong>Parking #{{ i }}</strong>
              <span>from €28.95 a week</span>
            </p>
          </article>
        </section>
      </div>
    </section>
    <section id="map" class="bg-gray-200 border-t border-b border-gray-500 py-24">
      <div class="container mx-auto">
        <h2 class="text-3xl text-blue-900 font-heading mb-4">Schiphol airport parking map</h2>
        <p>For more information about the parking provider in question press on the "P" icon. <a href="https://eu.parkos.com/schiphol-parking/travel-directions/" class="text-blue-700">Plan your route to Schiphol Airport</a></p>

        <div class="flex items-center w-full bg-gray-500 justify-center" style="height: 25rem;">
          { Google Maps }
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

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

  computed: {
    date() {
      return new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date())
    },

    reviews() {
      return [
        "Easy to reach and shuttle ready for dropping off and picking up within 5 minutes. Excellent! I'm going to use it again!...",
        "Uitstekende service. Punctueel en vriendelijk.",
        "Just perfect . Car on place when i back i dnt nwed wait perfect also when i leave car everything perfect 0 minute for wait that s super perfect im ...",
        "I did not have any problems with the parking or the car. The team was very friendly and easy to contact. I missed the plane on the first day so they a..."
      ]
    }
  }
});
</script>