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
      <span>from {{ parking.from_price | price }} a week</span>
    </p>
  </article>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Parking } from '../../types/Parking'

export default Vue.extend({
  filters: {
    price(value: number): string {
      return new Intl.NumberFormat('nl', {
        style: 'currency',
        currency: 'EUR'
      }).format(value)
    }
  },

  props: {
    parking: {
      type: Object,
      required: true
    } as PropOptions<Parking>
  }
})
</script>
