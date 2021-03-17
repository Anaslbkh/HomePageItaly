<template>
  <div class="relative">
    <button type="button" aria-haspopup="true" :aria-expanded="open.toString()" @click="open = !open">
      <svg
        fill="#288BE4"
        :width="size"
        :height="size"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z" />
      </svg>
    </button>
    <div v-show="open" class="absolute flex shadow-dropdown border-1 border-black border-opacity-20 left-0 rounded bg-white tooltip items-center z-50" role="tooltip">
      <p class="whitespace-nowrap text-sm p-3 max-w-xs">
        <slot />
      </p>
      <button type="button" class="p-1 px-2 text-xl" @click="open = false">
        x
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({

  props: {
    size: {
      type: Number,
      default: 24
    }
  },
  data (): {
        open: boolean
        } {
    return {
      open: false
    }
  }
})
</script>

<style>
.tooltip {
    transform: translateX(-50%);
}
</style>
