<template>
  <Dropdown class="border-b-0">
    <template #button>
      <img src="~/static/icons/flag.svg" width="16" height="16" aria-hidden="true" alt="check" loading="lazy" class="mr-1 -top-0.5 relative">
      {{ $currentLanguage.lang | uppercase }}
      <span class="caret"></span>
    </template>
    <template #content>
      <ul class="py-2 pt-0 sm:pt-2 -ml-2 sm:ml-0">
        <li
          v-for="item in languages"
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
import Vue from 'vue'
import Dropdown from '~/components/header/Dropdown.vue'
import { getInstance } from '~/services/apiService';

export default {
  data() {
    return {
      languages: [],
      language: undefined,
      airportData: {}
    }
  },

  async fetch() {
    const slug = this.$route.params.airport;
    const api = getInstance('parkos', {
      baseURL: 'https://parkos.com/api/v1/',
    });

    this.languages = await api.getLanguages();
    const currentLanguage = await Array.prototype.find.call(this.languages, (language) => language.domain === this.$paths.langHost);
    this.language = currentLanguage;
    this.airportData = await api.getAirportData(slug, this.language.lang);
  },

  filters: {
    uppercase: (value) => value.toUpperCase()
  },

  components: {
    Dropdown
  },

  computed: {
    languages() {
      const content = { ...this.airportData.content[this.language.lang].content } // @ts-ignore

      return Object.keys(content).map( function(lang) {
        return {
          lang,
          name: this.languages.find((language) => language.lang === lang)?.native_name || '',
          url: content[lang].url
        }
      }).sort((a, b) => {
        return a.name > b.name ? 1 : -1
      })
    }
  }
}
</script>
