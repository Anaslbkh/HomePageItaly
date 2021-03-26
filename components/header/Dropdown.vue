<template>
  <div class="inline-block relative">
    <button class="flex w-full sm:inline-flex items-end px-3" aria-haspopup="true" :aria-expanded="isExpanded.toString()" @click="toggle">
      <slot name="button" />
    </button>
    <div role="menu" v-bind="{ 'hidden': !isExpanded }" class="static sm:absolute sm:bg-white text-white sm:text-black right-0 min-w-min shadow-dropdown border-1 border-black border-opacity-20 rounded-b overflow-hidden z-10">
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
