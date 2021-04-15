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

    <template v-if="$gtmKey">
      <noscript> <iframe :src="`https://www.googletagmanager.com/ns.html?id=${$gtmKey}&noscript=`" height="0" width="0" style="display:none;visibility:hidden"></iframe> </noscript>
    </template>
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
    navShown: boolean,
    } {
    return {
      navShown: false
    }
  },

  mounted() {
    this.loadGTM()
  },

  methods: {
    loadGTM() {
      const gtmKey = this.$gtmKey
      if (gtmKey) {
        /* eslint-disable */
        // @ts-ignore
        window.loadTagManager = function(w,d,s,l){ w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=`https://www.googletagmanager.com/gtm.js?id=${gtmKey}`+dl;f.parentNode.insertBefore(j,f); }; if(typeof tagManagerDelay === 'undefined'){ window.loadTagManager(window,document,'script','dataLayer'); }
        /* eslint-enable */
      }
    },

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
