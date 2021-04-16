<template>
  <div class="container mx-auto text-center">
    <p class="sm:text-3xl text-2xl text-blue-900 font-heading sm:mb-12 mb-4">
      {{ $i18n('templates.parkos-usps') }}
    </p>
    <section class="w-full sm:w-7/10 mx-auto grid grid-cols-1 sm:grid-cols-3 md:gap-12 gap-4">
      <article class="flex flex-row sm:flex-col items-center justify-start" v-for="item in items" :key="item.key">
        <img
          :src="item.img.src"
          :alt="item.img.alt"
          width="40"
          height="40"
          class="sm:w-10 sm:h-10 w-8.5 h-8.5 mr-8 sm:mr-0 sm:mb-5"
          aria-hidden="true"
          loading="lazy"
        >
        <p class="text-left sm:text-center text-md sm:text-base" v-html="$i18n(item.key)"></p>
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
            src: `${this.$paths.assetsUrl}images/checklist.svg`,
            alt: 'personally inspected parkings'
          }
        },
        {
          key: 'templates.parkos-usp-3',
          img: {
            src: `${this.$paths.assetsUrl}images/offer.svg`,
            alt: 'lowest price'
          }
        },
        {
          key: 'templates.parkos-usp-4',
          img: {
            src: `${this.$paths.assetsUrl}images/history_blue.svg`,
            alt: 'free cancellation'
          }
        }
      ]
    }
  }
})
</script>
