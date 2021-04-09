<template>
  <div class="inline-block relative border-white border-opacity-20 sm:border-b-0 z-50" style="z-index: 100">
    <button ref="button" class="flex w-full sm:inline-flex items-end px-3 py-6  pb-3 sm:py-0 focus:outline-none" aria-haspopup="true" :aria-expanded="isExpanded.toString()" @click="toggle">
      <slot name="button" />
    </button>
    <div
      v-if="isExpanded"
      v-click-outside="{exclude: ['button'], handler: toggle}"
      role="menu"
      class="static sm:absolute sm:bg-white text-gray-600 sm:text-black right-0 min-w-min sm:shadow-dropdown border-1 border-black border-opacity-20 rounded-b overflow-hidden z-10 pl-7 sm:pl-0">
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      isExpanded: false
    }
  },

  methods: {
    toggle(_event: MouseEvent, state: boolean|undefined = undefined) {
      this.isExpanded = state ?? !this.isExpanded
    }
  }
})
</script>
