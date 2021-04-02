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
      <button class="ml-4 text-white text-opacity-50 focus:outline-none" @click="showAirportSelector = !showAirportSelector">
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
            <icon-pin></icon-pin>
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
        <div class="flex w-3/5">
          <div
            @click="$refs.arrivalDatePicker.showCalendar()"
            class="icon px-4 flex items-center justify-center bg-white shadow-input rounded-l border border-r-0 border-gray-500"
          >
            <icon-calendar></icon-calendar>
          </div>

          <DatePicker
            ref="arrivalDatePicker"
            class="focus:outline-none"
            ref-name="arrivalDatePickerInput"
            name="arrival"
            :placeholder="$i18n('templates.date-from')"
            :lang="$currentLanguage.lang"
            :full-month-name="datePickerParameters.fullMonthName"
            :open-date="datePickerParameters.startDate"
            :disabled-dates="datePickerParameters.disableDates"
            :show-on-select-only="datePickerParameters.showOnSelectOnly"
            :pre-selected-date="datePickerParameters.startDate"
            :value="formData.arrival"
            input-class="p-3 w-full shadow-input border border-r-0 border-gray-500 focus:outline-none text-gray-800 text-sm"
            @selected="onDateSelected($event, 'arrival')"
          ></DatePicker>
        </div>

        <div class="flex w-2/5 relative right-0.5">
          <select
            v-model="formData.arrivalTime"
            name="arrivalTime"
            class="px-4 table-cell w-full shadow-input border-l border-b border-t border-gray-500 bg-white focus:outline-none appearance-none text-gray-800 text-sm"
          >
            <option
              v-for="time in times"
              :key="`arrival-time-${time}`"
              :value="time"
              :selected="time === formData.arrivalTime"
            >
              {{ time }}
            </option>
          </select>
          <div class="absolute right-2 top-2.5">
            <icon-info>{{ $i18n('search.arrival-time-explanation-general') }}</icon-info>
          </div>
        </div>
      </div>

      <div class="flex mb-4">
        <div class="flex w-3/5">
          <div
            @click="$refs.departureDatePicker.showCalendar()"
            class="icon px-4 flex items-center justify-center bg-white shadow-input rounded-l border border-r-0 border-gray-500"
          >
            <icon-calendar></icon-calendar>
          </div>

          <DatePicker
            ref="departureDatePicker"
            class="focus:outline-none"
            ref-name="departureDatePickerInput"
            name="departure"
            :placeholder="$i18n('templates.date-until')"
            :lang="$currentLanguage.lang"
            :full-month-name="datePickerParameters.fullMonthName"
            :open-date="datePickerParameters.startDate"
            :disabled-dates="datePickerParameters.disableDates"
            :show-on-select-only="datePickerParameters.showOnSelectOnly"
            :pre-selected-date="preSelectedDateDeparture"
            input-class="p-3 w-full shadow-input border border-r-0 border-gray-500 focus:outline-none text-gray-800 text-sm"
            :value="formData.departure"
            @selected="onDateSelected($event, 'departure')"
          ></DatePicker>
        </div>

        <div class="flex w-2/5 relative right-0.5">
          <select
            v-model="formData.departureTime"
            name="arrivalTime"
            class="px-4 table-cell w-full shadow-input border-l border-b border-t border-gray-500 bg-white focus:outline-none appearance-none text-gray-800 text-sm"
          >
            <option
              v-for="time in times"
              :key="`departure-time-${time}`"
              :value="time"
              :selected="time === formData.departureTime"
            >
              {{ time }}
            </option>
          </select>
          <div class="absolute right-2 top-2.5">
            <icon-info>{{ $i18n('search.arrival-time-explanation-general') }}</icon-info>
          </div>
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
import IconInfo from '~/components/icons/IconInfo.vue'
import IconCalendar from '~/components/icons/IconCalendar.vue'
import IconPin from '~/components/icons/IconPin.vue'

type SearchParameters = {
  airport: string|undefined;
  arrival: string|Date|undefined;
  departure: string|Date|undefined;
  arrivalTime?: string;
  departureTime?: string;
}

type DatePickerParameters = {
  startDate: Date,
  showOnSelectOnly: boolean,
  fullMonthName: boolean,
  disableDates: Object,
}

export default Vue.extend({
  components: {
    IconPin,
    IconCalendar,
    IconInfo
  },

  data(): {
    formData: SearchParameters,
    showAirportSelector: boolean,
    datePickerParameters: DatePickerParameters,
    } {
    return {
      formData: {
        airport: undefined,
        arrival: undefined,
        departure: undefined,
        arrivalTime: '12:00',
        departureTime: '12:00'
      },
      showAirportSelector: false,
      datePickerParameters: {
        startDate: new Date(),
        showOnSelectOnly: true,
        fullMonthName: true,
        disableDates: {
          to: (new Date()).setDate((new Date()).getDate() - 1)
        }
      }
    }
  },

  computed: {
    preSelectedDateDeparture(): Date {
      const date = new Date()
      date.setDate(this.datePickerParameters.startDate.getDate() + 7)

      return date
    },

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
      const obj: any = {}

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

  methods: {
    onDateSelected(value: Date, inputKey: 'arrival' | 'departure') {
      this.formData[inputKey] = value

      const reverseInputKey = inputKey === 'arrival' ? 'departure' : 'arrival'
      let reverseValue = this.formData[reverseInputKey]
      if (inputKey === 'arrival') {
        reverseValue = reverseValue || this.preSelectedDateDeparture
        if (inputKey === 'arrival' && value > reverseValue) {
          this.$set(this.formData, reverseInputKey, (new Date(value).setDate(value.getDate() + 7)))
        }
      }

      if (inputKey === 'departure' && (!reverseValue || value < reverseValue)) {
        this.$set(this.formData, reverseInputKey, value)
      }
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
