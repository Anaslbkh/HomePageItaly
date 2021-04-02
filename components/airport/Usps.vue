<template>
  <div class="container mx-auto text-center">
    <p class="text-3xl text-blue-900 font-heading mb-14">
      {{ $i18n('templates.parkos-usps') }}
    </p>
    <section class="w-full sm:w-3/5 mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12">
      <article class="flex flex-row sm:flex-col items-center justify-start mb-4" v-for="item in items" :key="item.key">
        <img
          :src="item.img.src"
          :alt="item.img.alt"
          class="w-10 h-10 mr-8 sm:mr-0 sm:mb-5"
          aria-hidden="true"
        >
        <p class="text-left sm:text-center" v-html="$i18n(item.key)"></p>
      </article>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  computed: {
    items() {
      return [
        {
          key: 'templates.parkos-usp-1',
          img: {
            src: 'https://assets.parkos.com/assets/images/checklist.svg',
            alt: 'personally inspected parkings'
          }
        },
        {
          key: 'templates.parkos-usp-3',
          img: {
            src: 'https://assets.parkos.com/assets/images/offer.svg',
            alt: 'lowest price'
          }
        },
        {
          key: 'templates.parkos-usp-4',
          img: {
            src: 'https://assets.parkos.com/assets/images/history_blue.svg',
            alt: 'free cancellation'
          }
        }
      ]
    }
  }
})
</script>
