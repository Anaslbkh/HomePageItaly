<template>
  <div>
    <Dropdown class="border-b">
      <template #button>
        <span class="material-icons mr-1 text-xl" aria-hidden="true">flight_takeoff</span>
        {{ $i18n('general.airports') }}
        <span class="material-icons" aria-hidden="true">arrow_drop_down</span>
      </template>
      <template #content>
        <ul class="py-2">
          <li v-for="airport in $airports" :key="airport.slug">
            <a :href="$paths.url() + airport.slug + '/'" class="text-black hover:text-black hover:no-underline block px-4 py-1 whitespace-nowrap sm:hover:bg-gray-200">
              {{ airport.maintitle }}
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
  components: {
    Dropdown
  }
})
</script>
