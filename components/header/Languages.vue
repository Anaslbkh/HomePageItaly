<template>
  <Dropdown v-if="!$fetchState.pending && contentLanguages.length > 1" key="languages-dropdown" class="border-b-0">
    <template #button>
      <img
        src="~/static/icons/flag.svg"
        width="16"
        height="16"
        aria-hidden="true"
        alt="check"
        loading="lazy"
        class="mr-1 -top-0.5 relative"
      >
      {{ language.lang | uppercase }}
      <span class="caret"/>
    </template>
    <template #content>
      <ul class="py-2 pt-0 sm:pt-2 -ml-2 sm:ml-0">
        <li
          v-for="item in contentLanguages"
          v-show="item.lang !== language.lang"
          :key="`lang-${item.lang}`"
        >
          <a
            :href="item.url"
            class="text-gray-600 text-base sm:text-black hover:text-black hover:no-underline block px-4 py-1 whitespace-nowrap sm:hover:bg-gray-200"
          >
            {{ languages.find(language => language.lang === item.lang).native_name }}
          </a>
        </li>
      </ul>
    </template>
  </Dropdown>
</template>

<script>
  import Dropdown from '~/components/header/Dropdown.vue'
  import {getInstance} from '~/services/apiService'

  export default {

    filters: {
      uppercase: value => value.toUpperCase()
    },

    components: {
      Dropdown
    },
    data() {
      return {
        languages: [],
        language: undefined,
        airportData: {}
      }
    },

    async fetch() {
      const slug = this.$route.params.airport
      const api = getInstance('parkos')

      this.languages = await api.getLanguages()
      this.language = await Array.prototype.find.call(this.languages, language => language.domain === this.$paths.langHost)
      this.airportData = await api.getAirportData(slug, this.language.lang)
    },

    computed: {
      contentLanguages() {
        const availableLanguages = []

        for (const language in this.airportData.content) {
          const _language = this.languages.find(_language => _language.lang === language)

          if (_language) {
            availableLanguages.push({
              lang: language,
              name: _language?.native_name || _language.name,
              url: this.airportData.content[language].url
            })
          }
        }

        return availableLanguages.sort((a, b) => {
          return a.name > b.name ? 1 : -1
        })
      }
    }
  }
</script>
