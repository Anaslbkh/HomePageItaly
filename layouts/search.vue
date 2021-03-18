<template>
  <div>
    <Header />
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

import { Airport as AirportType } from '@/types/Airport'

export default Vue.extend({
  components: {
    Header,
    Footer,
    LegalFooter
  },

  provide(): {
    airports: AirportType[]
    } {
    return {
      airports: this.airports
    }
  },

  data(): {
    lang: string,
    airports: Array<AirportType>
    } {
    return {
      lang: 'nl',
      airports: [] as Array<AirportType>
    }
  },

  async fetch() {
    const defaultParams: {
      lang: string;
    } = {
      lang: this.lang
    }

    const airports = (await this.$axios.$get('airports', { params: defaultParams })).data
    this.airports = airports
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
