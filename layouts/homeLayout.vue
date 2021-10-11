<template>
  <div class="overflow-x-hidden" :class="{ fixed: navShown }">
    <CookieBar />
    <Header @toggle="navToggle" />
    <main>
      <Nuxt />
    </main>
    <Footer />
    <LegalFooter />
  </div>
</template>

<script >
import Vue from "vue";
import Header from "../components/HeaderB.vue";
import Footer from "../components/Footer.vue";
import LegalFooter from "../components/LegalFooter.vue";

export default Vue.extend({
  data() {
    return {
      navShown: false,
      gtmKey: undefined,
    };
  },
  components: {
    Header,
    Footer,
    LegalFooter,
  },
  methods: {
    navToggle(value) {
      this.navShown = value;
    },
  },
});
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
