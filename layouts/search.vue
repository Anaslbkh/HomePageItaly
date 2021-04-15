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
import ApiService from '~/services/apiService';
let i = 0;
let domain = 'parkos.it';
const apiService = new ApiService('https://parkos.com/api/v1/');

export default Vue.extend({
  components: {
    Header,
    Footer,
    LegalFooter
  },

  data(): {
    navShown: boolean
    parkings: Array<object>,
    reviews: Array<object>,
    reviewsMeta: object,
    languages: Array<object>,
    airports: Array<object>,
    airport: object,
    } {
    return {
      navShown: false,
      parkings: [],
      reviews: [],
      reviewsMeta: {},
      languages: [],
      airports: [],
      airport: {}
    }
  },

  async fetch() {
    console.log(i++);
    console.time('test');
    this.languages = await apiService.getLanguages();
    const slug = this.$route.params.airport;
    let currentLanguage = Array.prototype.find.call(this.languages, (language) => language.domain === domain);
    await apiService.getTranslations(currentLanguage.lang)
    this.airports = await apiService.getAirports(currentLanguage.lang)
    this.airport = await apiService.getAirportData(slug)
    const reviewData = await apiService.getAirportReviews(slug, currentLanguage.lang);
    this.reviews = reviewData.data;
    this.reviewsMeta = reviewData.meta;
    await apiService.getAirportFaq(slug, currentLanguage.lang)
    console.timeEnd('test');
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
</style>
