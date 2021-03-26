<template>
  <header class="bg-blue-500 gradient" :class="{ 'skew -mt-8 pt-8': navOpen }">
    <section :class="{ unskew: navOpen }">
      <div class="container mx-auto flex justify-between h-16 items-center">
        <a href="#">
          <Logo />
        </a>
        <nav class="text-white bg-blue-900 sm:bg-transparent absolute sm:static top-0 left-0 bottom-0 right-0 h-screen sm:h-auto z-10">
          <button></button>
          <ul class="inline-flex">
            <Dropdown>
              <template #button>
                <span class="material-icons mr-1 text-xl" aria-hidden="true">flight_takeoff</span>
                {{ $i18n('general.airports') }}
                <span class="material-icons" aria-hidden="true">arrow_drop_down</span>
              </template>
              <template #content>
                <ul class="text-black text-base py-2">
                  <li v-for="airport in $airports" :key="airport.slug">
                    <a :href="airport.slug" class="block px-4 py-1 whitespace-nowrap sm:hover:bg-gray-200">{{ airport.name }}</a>
                  </li>
                </ul>
              </template>
            </Dropdown>
            <li>
              <a href="#" class="inline-flex items-end px-3">
                <span class="material-icons mr-1 text-xl" aria-hidden="true">question_answer</span>
                {{ $i18n('customer.customer-service') }}
              </a>
            </li>
            <li>
              <a href="#" class="inline-flex items-end px-3">
                <span class="material-icons mr-1 text-xl">person</span>
                {{ $i18n('templates.header-login') }}
              </a>
            </li>
            <li>
              <a href="https://parkos.it/chi-siamo.html" class="inline-flex items-end px-3">
                <span class="material-icons mr-1 text-xl">language</span>
                Chi siamo
              </a>
            </li>
            <Dropdown>
              <template #button>
                <span class="material-icons mr-1 text-xl">flag</span>
                {{ $currentLanguage.lang }}
                <span class="material-icons">arrow_drop_down</span>
              </template>
              <template #content>
                <ul class="text-black text-base py-2">
                  <li v-for="language in $languages" :key="`lang-${language.id}`" v-bind="{ 'hidden': language.id === $currentLanguage.id }">
                    <a :href="language.domain" class="block px-4 py-1 whitespace-nowrap hover:bg-gray-200">{{ language.native_name }}</a>
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
              <img src="/icons/check.svg" class="h-4 mr-1" aria-hidden="true">
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
  } {
    return {
      navOpen: true,
    }
  },
})
</script>

<style>
.gradient {
  background-image: url(https://assets.parkos.com/assets/images/pattern.png),
    linear-gradient(0deg, rgba(35, 176, 253, 0.4), rgba(9, 131, 240, 0.4));
}
</style>
