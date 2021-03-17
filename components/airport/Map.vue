<template>
  <div class="flex items-center w-full bg-gray-500 justify-center" style="height: 25rem;">
    sd
  </div>
</template>

<script lang="ts">
import { Loader } from "@googlemaps/js-api-loader"
import Vue from 'vue'

if (process.client) {
  const loader = new Loader({
    apiKey: process.env.GOOGLE_MAPS_API_KEY || '',
    version: "3.44"
  });

  loader.load().then(() => {
    var map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  });
}

export default Vue.extend({
  computed: {
    coordinates () {
      return ''
    }
  }
})
</script>
