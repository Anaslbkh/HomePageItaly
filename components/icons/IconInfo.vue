<template>
  <div class="flex items-center relative">
    <button
      ref="button"
      type="button"
      aria-haspopup="true"
      :aria-expanded="open.toString()"
      class="focus:outline-none"
      @click="toggle"
    >
      <div class="sr-only">
        {{ $i18n('templates.more-information') }}
      </div>
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
    <div
      v-if="open"
      v-click-outside="{exclude: ['button'], handler: toggle}"
      class="absolute flex pr-3.5 shadow-dropdown border-1 border-black border-opacity-20 left-0 rounded bg-white tooltip items-center z-50"
      role="tooltip"
    >
      <p class="whitespace-normal text-sm p-3 max-w-xs">
        <slot />
      </p>
      <button type="button" class="absolute top-0 right-0 p-1 px-2 text-xl focus:outline-none" @click="toggle">
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
  data(): {
    open: boolean
    } {
    return {
      open: false
    }
  },
  methods: {
    toggle() {
      this.open = !this.open
      if (this.open) {
        // this.$refs.tooltipContainer.focus()
      }
    }
  }
})
</script>

<style>
.tooltip {
  min-width: 10rem;
  top: 2.45rem;
  transform: translateX(-6.4rem);

  @media (min-width: 768px) {
    min-width: max-content;
    top: 2rem;
    transform: translateX(-50%);
  }
}
</style>
