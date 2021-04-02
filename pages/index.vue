<template>
  <div class="flex justify-center">
    <ul>
      <li v-for="link in links" :key="link">
        <router-link :to="link">
          {{ link }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data(): { links: Array<String> } {
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
