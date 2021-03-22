<template>
  <header class="bg-blue-500 gradient" :class="{ 'skew -mt-8 pt-8': navOpen }">
    <section :class="{ unskew: navOpen }">
      <div class="container mx-auto flex justify-between h-16 items-center">
        <a href="#">
          <Logo />
        </a>
        <nav class="text-white">
          <ul class="inline-flex">
            <Dropdown>
              <template #button>
                <span class="material-icons mr-1 text-xl" aria-hidden="true">flight_takeoff</span>
                Airports
                <span class="material-icons" aria-hidden="true">arrow_drop_down</span>
              </template>
              <template #content>
                <ul class="text-black text-base py-2">
                  <li v-for="airport in airports" :key="airport.slug">
                    <a :href="airport.slug" class="block px-4 py-2 whitespace-nowrap hover:bg-gray-200">{{ airport.name }}</a>
                  </li>
                </ul>
              </template>
            </Dropdown>
            <li>
              <a href="#" class="inline-flex items-end px-3">
                <span class="material-icons mr-1 text-xl" aria-hidden="true">question_answer</span>
                Customer Service
              </a>
            </li>
            <li>
              <a href="#" class="inline-flex items-end px-3">
                <span class="material-icons mr-1 text-xl">person</span>
                Sign In
              </a>
            </li>
            <li>
              <a href="#" class="inline-flex items-end px-3">
                <span class="material-icons mr-1 text-xl">language</span>
                About Us
              </a>
            </li>
            <li>
              <button class="inline-flex items-end px-3">
                <span class="material-icons mr-1 text-xl">flag</span>
                EN
                <span class="material-icons">arrow_drop_down</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <section id="search">
        <div class="container mx-auto">
          <SearchForm />

          <section class="grid grid-cols-3 text-white border-t py-8">
            <article class="flex align-items justify-center">
              <span class="material-icons mr-1 text-lg">check</span> Best deals
            </article>
            <article class="flex align-items justify-center">
              <span class="material-icons mr-1 text-lg">check</span> 500,000
              customers worldwide
            </article>
            <article class="flex align-items justify-center">
              <span class="material-icons mr-1 text-lg">check</span>
              Cancel/change reservation for free
            </article>
          </section>
        </div>
      </section>
    </section>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import SearchForm from '../components/search/index.vue'
import Logo from './Logo.vue'
import Dropdown from './header/Dropdown.vue'

export default Vue.extend({
  components: {
    Logo,
    Dropdown,
    SearchForm
  },

  data() {
    return {
      navOpen: true
    }
  },

  computed: {
    airports() {
      return [{
        id: 1,
        object: 'airport',
        name: 'Schiphol Airport',
        slug: 'schiphol-airport',
        logo: 'URL',
        from_price: 24,
        address: {
          street: 'Vertrekpassage',
          zip_code: '1118AV',
          city: 'Schiphol',
          latitude: 52.31016,
          longitude: 4.76961
        },
        country: {
          id: 1,
          code: 'nl-NL'
        },
        opening_times: {
          from: '0:00',
          till: '24:00'
        }
      }, {
        id: 3,
        object: 'airport',
        name: 'Rotterdam The Hague Airport',
        slug: 'rotterdam-airport',
        logo: 'URL',
        from_price: 24,
        address: {
          street: 'Rotterdam Airportplein 60',
          zip_code: '3045AP',
          city: 'Rotterdam',
          latitude: 51.95601,
          longitude: 4.44036
        },
        country: {
          id: 1,
          code: 'nl-NL'
        },
        opening_times: {
          from: '0:00',
          till: '24:00'
        }
      }]
    }
  }
})
</script>

<style>
.gradient {
  background-image: url(https://assets.parkos.com/assets/images/pattern.ba250c.png),
    linear-gradient(0deg, rgba(35, 176, 253, 0.4), rgba(9, 131, 240, 0.4));
}
</style>
