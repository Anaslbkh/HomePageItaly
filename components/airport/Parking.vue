<template>
  <article class="border border-gray-500 rounded">
    <div class="flex items-center justify-center p-12">
      <img
        src="https://assets.parkos.com/assets/img/parkings/logos/247parkeren.png"
        :alt="parking.name"
      >
    </div>
    <p class="flex flex-col text-center p-4 border-t border-gray-500">
      <strong>{{ parking.name }}</strong>
      <span>from { missing } a week</span>
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
  }
})
</script>
