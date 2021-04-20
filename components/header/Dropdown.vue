<template>
  <div class="inline-block relative border-white border-opacity-20 sm:border-b-0 z-50" style="z-index: 100">
    <button ref="button" class="flex w-full sm:inline-flex items-center px-3 py-6  pb-3 sm:py-0 focus:outline-none" aria-haspopup="true" :aria-expanded="isExpanded.toString()" @click="toggle">
      <slot name="button" />
    </button>
    <div
      v-show="isExpanded"
      role="menu"
      class="static sm:absolute sm:bg-white text-gray-600 sm:text-black right-0 min-w-min sm:shadow-dropdown border-1 border-black border-opacity-20 rounded-b overflow-hidden z-10 pl-7 sm:pl-0">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    document.addEventListener('click', this.handleOutsideClick);
  },

  destroyed() {
    document.removeEventListener('click', this.handleOutsideClick);
  },

  data() {
    return {
      isExpanded: false
    }
  },

  methods: {
    toggle() {
      this.isExpanded = !this.isExpanded
    },

    handleOutsideClick(e) {
      if (!this.$el.contains(e.target)) {
        this.isExpanded = false;
      }
    }
  }
}
</script>