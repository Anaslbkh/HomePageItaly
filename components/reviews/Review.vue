<template>
  <article class="px-4 py-3 border border-gray-500 rounded">
    <div class="flex justify-between items-center mb-1">
      <div>
        <p class="text-sm font-semibold text-gray-700">
          {{ review.name }}
        </p>
        <p class="font-semibold">
          {{ date }}
        </p>
      </div>
      <p class="text-3xl font-semibold border-b-4 border-blue-500 font-heading leading-tight">
        {{ review.score }}
      </p>
    </div>
    <p class="w-full">
      <span class="material-icons text-3xl text-blue-500 relative" style="top: 0.5rem;">format_quote</span>{{ review.content }}
    </p>
  </article>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Review } from '../../types/Review'

export default Vue.extend({
  props: {
    review: {
      type: Object,
      required: true
    } as PropOptions<Review>
  },

  computed: {
    date(): string {
      return new Intl.DateTimeFormat(this.$currentLanguage.lang, {
        dateStyle: 'full'
      }).format(new Date(this.review.date));
    }
  }
})
</script>
