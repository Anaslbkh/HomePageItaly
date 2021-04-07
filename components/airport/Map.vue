<template>
  <div id="google-maps" class="flex items-center w-full bg-gray-500 justify-center" style="height: 25rem;" />
</template>

<script lang="ts">
/* global google */
import { Loader } from '@googlemaps/js-api-loader'
import Vue, { PropOptions } from 'vue'
import { Address as AddressType } from '~/types/Address'
import { Parking as ParkingType } from '~/types/Parking'

export default Vue.extend({
  props: {
    parkings: {
      type: Array,
      required: true
    } as PropOptions<Array<ParkingType>>,
  },

  computed: {
    coordinates(): Array<any> {
      return Array.prototype.map.call(this.parkings, (parking: ParkingType) => ({
        latitude: parking.address.latitude,
        longitude: parking.address.longitude,
      }) as Pick<AddressType, 'latitude' | 'longitude'>)
    },
  },

  data(): {
    mapWasInViewPort: boolean,
  } {
    return {
      mapWasInViewPort: false,
    }
  },

  methods: {
    loadMapIfVisible(): void {
      // @ts-ignore
      const mapRect = document.getElementById('google-maps').getBoundingClientRect()

      if (
        this.mapWasInViewPort === false &&
        mapRect.top >= 0 &&
        mapRect.top <= (window.innerHeight || document.documentElement.clientHeight)
      ) {
        this.mapWasInViewPort = true

        const { latitude, longitude } = this.$currentAirport.address
        const coordinatesList: Array<Pick<AddressType, 'latitude' | 'longitude'>> = this.coordinates
        const loader = new Loader({
          apiKey: process.env.GOOGLE_MAPS_API_KEY || '',
          version: '3.44'
        })

        loader.load().then(() => {
          const bounds = new google.maps.LatLngBounds()
          const map = new google.maps.Map(document.getElementById('google-maps') as HTMLElement, {
            center: new google.maps.LatLng(latitude, longitude),
            zoom: 12
          })

          const icon = require('~/assets/airport/maps/marker.svg')

          coordinatesList.forEach(({ latitude, longitude }: Pick<AddressType, 'latitude' | 'longitude'>) => {
            const marker = new google.maps.Marker({
              icon,
              position: new google.maps.LatLng(latitude, longitude),
              map
            })
            // @ts-ignore
            bounds.extend(marker.getPosition())
          })

          map.fitBounds(bounds)
          map.setCenter(bounds.getCenter())
        })
      }
    }
  },

  created(): void {
    if (process.client) {
      window.addEventListener('scroll', this.loadMapIfVisible);
    }
  },

  destroyed(): void {
    if (process.client) {
      window.removeEventListener('scroll', this.loadMapIfVisible);
    }
  },

  mounted(): void {

  }
})
</script>
