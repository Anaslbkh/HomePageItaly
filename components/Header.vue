<template>
  <header class="bg-blue-500 gradient" :class="{ 'skew -mt-8 pt-8': navOpen, 'fixed z-50': navShown }">
    <section :class="{ unskew: navOpen }">
      <div class="container mx-auto flex justify-between h-16 items-center">
        <a href="/">
          <Logo />
        </a>
        <button class="block px-4 h-14 fixed right-0 mr-4 sm:hidden z-50 focus:outline-none" aria-controls="#navigation" @click="toggleMenu">
          <span class="sr-only">Toggle navigation</span>
          <span style="width: 22px;" class="block h-0.5 bg-white bg-opacity-50 transition-all origin-navTop" :class="{ 'transform  rotate-45': navShown }"></span>
          <span style="width: 22px;" class="block h-0.5 bg-white bg-opacity-50 transition-all mt-1" :class="{ 'opacity-0': navShown }"></span>
          <span style="width: 22px;" class="block h-0.5 bg-white bg-opacity-50 transition-all mt-1 origin-navBottom" :class="{ 'transform -rotate-45': navShown }"></span>
        </button>
        <nav id="navigation" class="sm:block text-white bg-blue-900 sm:bg-transparent absolute sm:static top-0 left-0 bottom-0 right-0 h-screen sm:h-auto z-10 py-12 sm:py-0 px-6 sm:px-0" :class="{ 'hidden': !navShown, 'block': navShown }">
          <ul class="flex flex-col sm:flex-row sm:inline-flex text-lg sm:text-base">
            <Dropdown class="border-b">
              <template #button>
                <span class="material-icons mr-1 text-xl" aria-hidden="true">flight_takeoff</span>
                {{ $i18n('general.airports') }}
                <span class="material-icons" aria-hidden="true">arrow_drop_down</span>
              </template>
              <template #content>
                <ul class="py-2">
                  <li v-for="airport in $airports" :key="airport.slug">
                    <a :href="'/' + airport.slug" class="block px-4 py-1 whitespace-nowrap sm:hover:bg-gray-200">{{ airport.maintitle }}</a>
                  </li>
                </ul>
              </template>
            </Dropdown>
            <li>
              <a href="https://parkos.zendesk.com/hc/it" rel="nofollow" class="flex sm:inline-flex items-end px-3 py-6 sm:py-0 border-b border-white border-opacity-20 sm:border-b-0">
                <span class="material-icons mr-1 text-xl" aria-hidden="true">question_answer</span>
                Servizio clienti
              </a>
            </li>
            <li>
              <a href="/login/" class="flex sm:inline-flex items-end px-3 py-6 sm:py-0 border-b border-white border-opacity-20 sm:border-b-0">
                <span class="material-icons mr-1 text-xl">person</span>
                Gestisci prenotazione
              </a>
            </li>
            <li>
              <a href="/chi-siamo.html" class="flex sm:inline-flex items-end px-3 py-6 sm:py-0 border-b border-white border-opacity-20 sm:border-b-0">
                <span class="material-icons mr-1 text-xl">language</span>
                Chi siamo
              </a>
            </li>
            <Dropdown class="border-b-0">
              <template #button>
                <span class="material-icons mr-1 text-xl">flag</span>
                {{ $currentLanguage.lang | uppercase }}
                <span class="material-icons">arrow_drop_down</span>
              </template>
              <template #content>
                <ul class="py-2">
                  <li
                    v-for="(content, lang) in $currentAirportDetails.content"
                    :key="`lang-${lang}`"
                    v-bind="{ 'hidden': lang === $currentLanguage.lang }"
                  >
                    <a
                      :href="content.url"
                      class="block px-4 py-1 whitespace-nowrap sm:hover:bg-gray-200">
                        {{ $languages.find(language => language.lang === lang).native_name }}
                    </a>
                  </li>
                </ul>
              </template>
            </Dropdown>
          </ul>
        </nav>
      </div>

      <section id="search">
        <div class="container mx-auto">
          <SearchForm />

          <section class="grid grid-cols-1 sm:grid-cols-3 text-white border-t py-8">
            <article v-for="i in 3" :key="`header-usp-${i}`" class="flex items-center justify-center">
              <img :src="`${$paths.assetsUrl}images/checkmark.svg`" class="h-4 mr-1" aria-hidden="true" alt="check">
              <span>{{ $i18n(`templates.header-usp-${i}`)}}</span>
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

  data(): {
    navOpen: boolean,
    navShown: boolean,
    } {
    return {
      navOpen: true,
      navShown: false,
    }
  },

  methods: {
    toggleMenu(): void {
      this.navShown = !this.navShown
    },
  },

  filters: {
    uppercase: (value: string): string => value.toUpperCase()
  }
})
</script>

<style>
.gradient {
  background-image: url(https://assets.parkos.com/assets/images/pattern.png),
    linear-gradient(0deg, rgba(35, 176, 253, 0.4), rgba(9, 131, 240, 0.4));
}
</style>
