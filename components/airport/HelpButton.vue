<template>
  <div>
    <div
      class="
        help-btn
        transition-bg-ease
        opacity-0
        fixed
        right-2
        inline-flex
        bottom-0
        text-white
        bg-blue-500
        z-40
        py-3.5
        px-3.5
        rounded-full
        mb-3
        hover:bg-blue-550
        cursor-pointer
      "
      :class="{ 'opacity-100': isMounted, disabled: isLoading }"
      @click="show()"
    >
      <img
        v-if="!isLoading"
        src="~/static/icons/help.svg"
        width="24"
        height="24"
        aria-hidden="true"
        alt="check"
        loading="lazy"
        class="inline sm:mr-1 relative"
      />
      <img
        v-else
        src="~/static/icons/loop.svg"
        width="24"
        height="24"
        aria-hidden="true"
        alt="check"
        loading="lazy"
        class="inline sm:mr-1 relative"
      />

      <div class="hidden sm:block font-sans px-1.5 font-bold">
        {{ $i18n("general.help") }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data(): {
    isLoading: boolean;
    isLoaded: boolean;
    isMounted: boolean;
  } {
    return {
      isLoading: false,
      isLoaded: false,
      isMounted: false,
    };
  },

  props: {
    language: {
      type: String,
      required: true,
    },
  },

  mounted() {
    this.isMounted = true;
  },

  methods: {
    show() {
      if (!this.isLoaded) {
        this.isLoading = true;
        this.load();
        return;
      }

      this.open();
    },

    open() {
      this.$zendesk.show();
      this.$zendesk.open();

      if (!this.isLoaded) {
        this.isLoaded = true;
      }
    },

    load() {
      this.$zendesk.load();

      this.$zendesk.$on("loaded", () => {
        this.$zendesk.setLocale(this.language);

        this.open();
        this.isLoading = false;
      });
    },
  },
});
</script>

<style>
#launcher {
  display: none !important;
}
</style>
