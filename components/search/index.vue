<template>
  <div>
    <div class="flex justify-center flex-wrap text-white mb-8">
      <h1 v-if="$currentAirportContent" class="w-full text-6xl text-center font-heading mb-4">
        {{ $currentAirportContent.title }}
      </h1>
      <h1 v-else class="w-full text-6xl text-center font-heading mb-4">
        {{ $i18n('general.compare-parking') }}
      </h1>
      <p>{{ $i18n('templates.from-x-euro-day', {
        amount: pricePerDay
      }) }} </p>
      <button class="ml-4 text-white text-opacity-50" @click="showAirportSelector = !showAirportSelector">
        {{ $i18n('general.change-airport') }}
      </button>
    </div>

    <form
      action="/schiphol-parking/search/"
      class="max-w-full sm:max-w-sm flex flex-col mx-auto mb-12"
    >
      <input type="hidden" name="parkosfastsearchtest">
      <transition name="slide">
        <div v-if="showAirportSelector" class="flex mb-4">
          <div
            class="icon px-4 flex items-center justify-center bg-white shadow-input rounded-l border border-r-0 border-gray-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 60 60">
              <path fill="#091F2F" fill-rule="nonzero" d="M30 28.45c2.067 0 3.829-.727 5.285-2.182 1.457-1.456 2.185-3.216 2.185-5.282s-.728-3.826-2.185-5.282C33.83 14.25 32.067 13.521 30 13.521s-3.829.728-5.285 2.183c-1.457 1.456-2.185 3.216-2.185 5.282s.728 3.826 2.185 5.282C26.17 27.723 27.933 28.45 30 28.45zM30 0c5.826 0 10.782 2.042 14.87 6.127C48.955 10.21 51 15.164 51 20.986c0 2.91-.728 6.244-2.185 10a61.632 61.632 0 0 1-5.285 10.563 209.912 209.912 0 0 1-6.13 9.226c-2.02 2.863-3.736 5.14-5.145 6.83L30 60a507.618 507.618 0 0 0-2.255-2.606c-.94-1.08-2.63-3.24-5.074-6.479-2.443-3.239-4.58-6.384-6.413-9.436-1.832-3.052-3.5-6.502-5.003-10.352C9.752 27.277 9 23.897 9 20.986c0-5.822 2.044-10.775 6.13-14.86C19.219 2.043 24.175 0 30 0z" />
            </svg>
          </div>
          <select
            id=""
            v-model="formData.airport"
            name="airport"
            class="w-full p-3 py-4 border-l shadow-input rounded-r border border-gray-500 text-sm"
          >
            <option disabled selected>
              {{ $i18n('general.where-to-park')}}
            </option>
            <optgroup v-for="(airports, country) in availableAirports" :key="country" :label="country">
              <option v-for="airport in airports" :key="airport.slug" :value="airport.slug">
                {{ airport.name }}
              </option>
            </optgroup>
          </select>
        </div>
      </transition>
      <div class="flex mb-4">
        <div
          class="icon px-4 flex items-center justify-center bg-white shadow-input rounded-l border border-r-0 border-gray-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 60 60">
            <path fill="#091F2F" fill-rule="nonzero" d="M50.953 54.085v-33.1H9.047v33.1h41.906zm0-48.17c1.594 0 3 .61 4.219 1.831C56.39 8.967 57 10.376 57 11.972v42.113c0 1.596-.61 2.98-1.828 4.154C53.953 59.413 52.547 60 50.953 60H9.047c-1.688 0-3.117-.587-4.29-1.76C3.587 57.065 3 55.68 3 54.084V11.972c0-1.596.586-3.005 1.758-4.226 1.172-1.22 2.601-1.83 4.289-1.83H12V0h6.047v5.915h23.906V0H48v5.915h2.953zM24 27.042v8.85h-9.047v-8.85H24z" />
          </svg>
        </div>
        <input
          id="arrival"
          type="date"
          name="arrival"
          class="p-3 w-full shadow-input border border-r-0 border-gray-500"
        >
        <select
          v-model="formData.arrivalTime"
          name="arrivalTime"
          class="px-4 shadow-input border-l border-b border-t border-gray-500 appearance-none"
        >
          <option
            v-for="time in times"
            :key="`arrival-time-${time}`"
            :value="time"
            :selected="time === '12:00'"
          >
            {{ time }}
          </option>
        </select>
        <div class="px-2 flex items-center justify-center bg-white shadow-input rounded-r border-r border-b border-t border-gray-500">
          <Info>{{ $i18n('search.arrival-time-explanation-general') }}</Info>
        </div>
      </div>

      <div class="flex mb-4">
        <div
          class="icon px-4 flex items-center justify-center bg-white shadow-input rounded-l border border-r-0 border-gray-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 60 60">
            <path fill="#091F2F" fill-rule="nonzero" d="M50.953 54.085v-33.1H9.047v33.1h41.906zm0-48.17c1.594 0 3 .61 4.219 1.831C56.39 8.967 57 10.376 57 11.972v42.113c0 1.596-.61 2.98-1.828 4.154C53.953 59.413 52.547 60 50.953 60H9.047c-1.688 0-3.117-.587-4.29-1.76C3.587 57.065 3 55.68 3 54.084V11.972c0-1.596.586-3.005 1.758-4.226 1.172-1.22 2.601-1.83 4.289-1.83H12V0h6.047v5.915h23.906V0H48v5.915h2.953zM45 39.153v8.805h-9v-8.805h9z" />
          </svg>
        </div>
        <input
          id="departure"
          type="date"
          name="departure"
          class="p-3 w-full shadow-input border border-r-0 border-gray-500"
        >
        <select
          v-model="formData.departureTime"
          name="depatureTime"
          class="px-4 shadow-input border-l border-b border-t border-gray-500 appearance-none"
        >
          <option
            v-for="time in times"
            :key="`depature-time-${time}`"
            :value="time"
          >
            {{ time }}
          </option>
        </select>
        <div class="px-2 flex items-center justify-center bg-white shadow-input rounded-r border-r border-b border-t border-gray-500">
          <Info>{{ $i18n('search.departure-time-explanation-general') }}</Info>
        </div>
      </div>

      <button
        type="submit"
        class="bg-primary-500 text-white p-3 text-lg font-heading rounded shadow-button hover:bg-primary-600 focus:bg-primary-700"
      >
        {{ $i18n('home.search-parkingplace') }}
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Airport as AirportType } from '../../types/Airport'
import Info from '../Info.vue'

type SearchParameters = {
  airport: string|undefined;
  arrival: string|undefined;
  departure: string|undefined;
  arrivalTime?: string;
  departureTime?: string;
}

export default Vue.extend({
  components: {
    Info
  },

  data(): {
    formData: SearchParameters,
    showAirportSelector: boolean,
    } {
    return {
      formData: {
        airport: undefined,
        arrival: undefined,
        departure: undefined,
        arrivalTime: '12:00',
        departureTime: '12:00'
      },
      showAirportSelector: true,
    }
  },

  computed: {
    times(): Array<string> {
      const interval = 15 // minutes interval
      const times = [] // time array
      let time = 0 // start time

      // loop to increment the time and push results in array
      for (let i = 0; time < 24 * 60; i++) {
        times[i] =
                ('0' + Math.floor(time / 60)).slice(-2) +
                ':' +
                ('0' + (time % 60)).slice(-2)
        time = time + interval
      }

      return times
    },

    availableAirports() {
      const obj: any = {};

      this.$airports.forEach((airport: AirportType) => {
        if (!Object.prototype.hasOwnProperty.call(obj, airport.country.name)) {
          obj[airport.country.name] = []
        }

        obj[airport.country.name].push({
          name: airport.name,
          slug: airport.slug
        })
      })

      return obj
    },

    pricePerDay(): string {
      return new Intl.NumberFormat(this.$currentLanguage.lang, {
        style: 'currency',
        currency: 'EUR'
      }).format(this.$currentAirport.from_price / 8)
    }
  },

  mounted() {
    if (Object.prototype.hasOwnProperty.call(this.$route.params, 'airport')) {
      this.formData.airport = this.$route.params.airport
      this.showAirportSelector = false
    }
  },
})
</script>
