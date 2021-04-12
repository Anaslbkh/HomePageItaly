<template>
  <div>
    <div
      class="help-btn transition-bg-ease opacity-0 fixed right-2 inline-flex bottom-0 text-white bg-blue-500 z-50 py-3.5 px-4 rounded-full mb-3 hover:bg-blue-550 cursor-pointer"
      :class="{ 'opacity-100': isMounted }"
      @click="show()"
    >
      <span class="material-icons text-3xl leading-3 top-1.5 relative">
        {{ isLoading ? 'loop' : 'help_outline' }}
      </span>

      <div class="font-sans px-1.5 font-bold">
        {{ $i18n('general.help') }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data(): {
    isLoading: boolean,
    isMounted: boolean
    } {
    return {
      isLoading: true,
      isMounted: false
    }
  },

  mounted() {
    this.load()

    setTimeout(() => {
      this.isMounted = true
    }, 100)
  },

  methods: {
    show() {
      this.$zendesk.show()
      this.$zendesk.open()
    },

    load() {
      this.$zendesk.load()

      this.$zendesk.$on('loaded', () => {
        this.$zendesk.setLocale(this.$currentLanguage.lang)

        this.isLoading = false
      })
    }
  },
})
</script>

<style>
#launcher {
  display: none !important;
}
</style>
