<template>
  <div>
    <Dropdown class="border-b-0">
      <template #button>
        <span class="material-icons mr-1 text-xl">flag</span>
        {{ $currentLanguage.lang | uppercase }}
        <span class="material-icons">arrow_drop_down</span>
      </template>
      <template #content>
        <ul class="py-2">
          <li
            v-for="item in languages"
            v-show="item.lang !== $currentLanguage.lang"
            :key="`lang-${item.lang}`"
          >
            <a
              :href="item.url"
              class="block px-4 py-1 whitespace-nowrap sm:hover:bg-gray-200 text-black hover:text-black hover:no-underline"
            >
              {{ $languages.find(language => language.lang === item.lang).native_name }}
            </a>
          </li>
        </ul>
      </template>
    </Dropdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Dropdown from '~/components/header/Dropdown.vue'

export default Vue.extend({
  filters: {
    uppercase: (value: string): string => value.toUpperCase()
  },

  components: {
    Dropdown
  },

  computed: {
    languages(): Array<Object> {
      const content = this.$currentAirportDetails.content

      return Object.keys(content).map((lang: string) => {
        return {
          lang,
          name: this.$languages.find(language => language.lang === lang).native_name,
          url: content[lang].url
        }
      }).sort((a, b) => {
        return a.name > b.name ? 1 : -1
      })
    }
  }
})
</script>
