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

    <client-only>
      <noscript> <iframe :src="`https://www.googletagmanager.com/ns.html?id=${gtmKey}&noscript=`" height="0" width="0" style="display:none;visibility:hidden"></iframe> </noscript>
    </client-only>
  </div>
</template>

<script>
import Vue from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import LegalFooter from '@/components/LegalFooter.vue'
import { getInstance } from '~/services/apiService'

export default Vue.extend({
  components: {
    Header,
    Footer,
    LegalFooter
  },

  // async validate({params, $paths, isHMR}) {
  //   console.log('testasdfasf')
  //   if (isHMR) return true;

  //   const languages = await api.getLanguages();
  //   const currentLanguage = Array.prototype.find.call(languages, (language) => language.domain === $paths.langHost);
  //   const airport = await api.getAirport(params.airport, currentLanguage.lang);
    
  //   console.log(airport);
  // },

  data() {
    return {
      navShown: false,
      gtmKey: undefined
    }
  },

  async fetch() {
    const api = getInstance('parkos', {
      baseURL: 'https://parkos.com/api/v1/'
    })
    this.languages = await api.getLanguages()

    const currentLanguage = await Array.prototype.find.call(this.languages, language => language.domain === this.$paths.langHost)
    this.gtmKey = currentLanguage.gtm_key
  },

  mounted() {
    this.loadGTM()
  },

  methods: {
    loadGTM() {
      const gtmKey = this.gtmKey;

      if (gtmKey) {
        /* eslint-disable */
        // @ts-ignore
        window.loadTagManager = function(w,d,s,l){ w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=`https://www.googletagmanager.com/gtm.js?id=${gtmKey}`+dl;f.parentNode.insertBefore(j,f); }; if(typeof tagManagerDelay === 'undefined'){ window.loadTagManager(window,document,'script','dataLayer'); }
        /* eslint-enable */
      }
    },

    navToggle(value) {
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
