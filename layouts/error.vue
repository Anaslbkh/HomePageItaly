<template>
  <div class="overflow-x-hidden" :class="{ fixed: false }">
    <Header
      @toggle="navToggle"
      :show-search="false"
    />
    <main>
      <div class="container mx-auto py-12">
        <h1 class="sm:text-3xl text-2xl text-blue-900 font-heading mb-3">{{ error.message }}</h1>
        <p class="text-base">{{ error.description }}</p>

        <div class="grid grid-cols-2">
            <div>
                <ul class="list-disc pl-14">
                    <li v-for="airport in airports" :key="`airport-${airport.id}`" class="text-base py-1">
                        <a :href="`${$paths.url()}${airport.slug}/`">{{ airport.maintitle }}</a>
                    </li>
                </ul>
            </div>
            <div class="hidden sm:flex justify-end items-start">
                <img class="img-responsive" src="https://assets.parkos.com/assets/img/error-404.jpg" height="333" width="500">
            </div>
        </div>
      </div>
    </main>
    <Footer />
    <LegalFooter />

    <client-only>
      <noscript> <iframe :src="`https://www.googletagmanager.com/ns.html?id=${gtmKey}&noscript=`" height="0" width="0" style="display:none;visibility:hidden"></iframe> </noscript>
    </client-only>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import LegalFooter from '@/components/LegalFooter.vue'
import { getInstance } from '~/services/apiService';

export default {
  components: {
    Header,
    Footer,
    LegalFooter
  },

  props: ['error'],
  
  data() {
    return {
      airports: []
    }
  },

  layout: 'blog', // you can set a custom layout for the error page

  mounted() {
    this.loadGTM()
  },

  async fetch() {
    const api = getInstance('parkos', {
      baseURL: 'https://parkos.com/api/v1/',
    });
    
    this.airports = await api.getAirports(this.error.language.lang);
  },

  methods: {
    loadGTM() {
      const gtmKey = this.error.language.gtmKey;
      if (gtmKey) {
        /* eslint-disable */
        window.loadTagManager = function(w,d,s,l){ w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=`https://www.googletagmanager.com/gtm.js?id=${gtmKey}`+dl;f.parentNode.insertBefore(j,f); }; if(typeof tagManagerDelay === 'undefined'){ window.loadTagManager(window,document,'script','dataLayer'); }
        /* eslint-enable */
      }
    },

    navToggle(value) {
      this.navShown = value
    }
  }
}
</script>