<template>
  <div class="overflow-x-hidden" :class="{ fixed: navShown }">
    <Header
      @toggle="navToggle"
    />
    <main>
      <Nuxt />
    </main>
    <Footer />
    <LegalFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import LegalFooter from '@/components/LegalFooter.vue'

export default Vue.extend({
  components: {
    Header,
    Footer,
    LegalFooter
  },

  data(): {
    navShown: boolean
    } {
    return {
      navShown: false,
    }
  },

  methods: {
    navToggle(value: boolean) {
      this.navShown = value
    }
  }
})
</script>

<style>
* {
  -webkit-font-smoothing: antialiased;
}
.skew {
  transform: skew(0deg, -1deg);
}
.unskew {
  transform: skew(0deg, 1deg);
}
.skew,
.unskew {
  backface-visibility: hidden;
}
.caret {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 2px;
  vertical-align: middle;
  border-top: 4px dashed;
  border-top: 4px solid\9;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
}
</style>
