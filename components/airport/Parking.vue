<template>
  <article class="border border-gray-500 rounded">
    <div class="flex items-center justify-center p-12">
      <img
        :src="parking.logo"
        :alt="parking.name"
      >
    </div>
    <p class="flex flex-col text-center p-4 border-t border-gray-500">
      <strong>{{ parking.name }}</strong>
      <span>{{ $i18n('templates.from-x-euro-week', { amount: price }) }}</span>
    </p>
  </article>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Parking } from '../../types/Parking'

export default Vue.extend({

  props: {
    parking: {
      type: Object,
      required: true
    } as PropOptions<Parking>
  },

  computed: {
    price(): string {
      if (! this.parking.from_price) return ''

      return new Intl.NumberFormat(this.$currentLanguage.lang, {
        style: 'currency',
        currency: 'EUR'
      }).format(this.parking.from_price)
    }
  }
})
</script>
