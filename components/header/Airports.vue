<template>
  <li>
    <Dropdown class="border-b">
      <template #button>
        <img
          src="~/static/icons/flight_takeoff.svg"
          width="16"
          height="16"
          aria-hidden="true"
          alt="check"
          loading="lazy"
          class="mr-1 -top-0.5 relative"
        >
        {{ $i18n('general.airports') }}
        <span class="caret" />
      </template>
      <template #content>
        <ul class="py-2 pt-0 sm:pt-2 -ml-2 sm:ml-0">
          <li v-for="airport in airports" :key="airport.slug">
            <a :href="$paths.url() + airport.slug + '/'" class="text-gray-600 text-base sm:text-black hover:text-black hover:no-underline block px-4 py-1 whitespace-nowrap sm:hover:bg-gray-200">
              {{ airport.maintitle }}
            </a>
          </li>
        </ul>
      </template>
    </Dropdown>
  </li>
</template>

<script>
import Dropdown from '~/components/header/Dropdown.vue'
import { getInstance } from '~/services/apiService'

export default {
  components: {
    Dropdown
  },

  data() {
    return {
      airports: []
    }
  },

  async fetch() {
    const slug = this.$route.params.airport
    const api = getInstance('parkos')

    const languages = await api.getLanguages()
    const currentLanguage = await Array.prototype.find.call(languages, language => language.domain === this.$paths.langHost)

    this.airports = await api.getAirports(currentLanguage.lang)
  }
}
</script>
