<template>
  <div>
    <main>
      <Nuxt />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import LegalFooter from '../components/LegalFooter.vue'

export default Vue.extend({
  components: {
    Header,
    Footer,
    LegalFooter
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
</style>
