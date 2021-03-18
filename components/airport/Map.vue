<template>
  <div id="google-maps" class="flex items-center w-full bg-gray-500 justify-center" style="height: 25rem;" />
</template>

<script lang="ts">
/* global google */
import { Loader } from '@googlemaps/js-api-loader'
import Vue, { PropOptions } from 'vue'
import * as Marker from '@/assets/airport/maps/marker.svg'
import { Address as AddressType } from '~/types/Address'
import { Airport as AirportType } from '~/types/Airport'
import { Parking as ParkingType } from '~/types/Parking'

type LatLng = Pick<AddressType, 'latitude' | 'longitude'>;

export default Vue.extend({
  props: {
    parkings: {
      type: Array,
      required: true
    } as PropOptions<Array<ParkingType>>,
    current: {
      type: Object,
      required: true
    } as PropOptions<AirportType>
  },

  computed: {
    coordinates() {
      return Array.prototype.map.call(this.parkings, (parking: ParkingType): LatLng => {
        const { latitude, longitude } = parking.address
        return { latitude, longitude }
      })
    }
  },

  mounted(): void {
    const { latitude, longitude } = this.current.address
    const coordinatesList: Array<LatLng> = this.coordinates
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

      coordinatesList.forEach(({ latitude, longitude }: { latitude: number, longitude: number }) => {
        const marker = new google.maps.Marker({
          icon: Marker,
          position: new google.maps.LatLng(latitude, longitude),
          map
        })
        bounds.extend(marker.getPosition())
      })

      map.fitBounds(bounds)
      map.setCenter(bounds.getCenter())
    })
  }
})
</script>
