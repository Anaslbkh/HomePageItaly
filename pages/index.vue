<template>
  <div class="flex justify-center">
    <ul>
      <li v-for="link in links" :key="link">
        <a :href="link">
          {{ link }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data(): { links: Array<string> } {
    return {
      links: [
        '/parcheggio-orio-al-serio',
        '/parcheggio-ciampino',
        '/parcheggio-linate',
        '/parcheggio-aeroporto-palermo',
        '/parcheggio-aeroporto-firenze',
        '/parcheggio-aeroporto-torino',
        '/parcheggio-aeroporto-venezia',
        '/parcheggio-cagliari'
      ]
    }
  }
})
</script>

<style>

</style>
