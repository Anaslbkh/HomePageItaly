<template>
  <div>
    <div class="flex justify-center flex-wrap text-white mb-8">
      <h1 v-if="airportData" class="w-full text-4xl md:text-6xl text-center font-heading mb-4">
        {{ airportData.content[language.lang].title }}
      </h1>
      <h1 v-else class="w-full text-6xl text-center font-heading mb-4">
        {{ $i18n('general.compare-parking') }}
      </h1>
      <p>
        {{ $i18n('templates.from-x-euro-day', { amount: pricePerDay }) }}
      </p>
      <button class="ml-4 text-white text-opacity-50 focus:outline-none hover:underline" @click="showAirportSelector = !showAirportSelector">
        {{ $i18n('general.change-airport') }}
      </button>
    </div>

    <form
      :action="`${$paths.url()}${formData.airport}/${$i18n('general.search-slug')}/`"
      class="max-w-full sm:max-w-sm flex flex-col mx-auto mb-12"
    >
      <input v-if="enableNewFastSearch" type="hidden" name="parkosfastsearchtest">

      <transition name="slide">
        <div v-if="showAirportSelector" class="flex mb-4">
          <div
            class="icon px-4 flex items-center justify-center bg-white shadow-input rounded-l border border-r-0 border-gray-500"
          >
            <icon-pin />
          </div>
          <select
            v-model="formData.airport"
            name="airport"
            class="appearance-none p-2.5 py-3.5 mr-1 w-full shadow-input border border-r-0 border-gray-500 focus:outline-none text-gray-800 text-sm bg-white rounded-r"
          >
            <option disabled selected>
              {{ $i18n('general.where-to-park') }}
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
            class="icon px-4 flex items-center justify-center bg-white shadow-input rounded-l border border-r-0 border-gray-500"
            @click="$refs.arrivalDatePicker.showCalendar()"
          >
            <icon-calendar />
          </div>

          <DatePicker
            ref="arrivalDatePicker"
            class="focus:outline-none"
            ref-name="arrivalDatePickerInput"
            name="arrival"
            :placeholder="$i18n('templates.date-from')"
            :lang="language.lang"
            :full-month-name="datePickerParameters.fullMonthName"
            :open-date="datePickerParameters.startDate"
            :disabled-dates="datePickerParameters.disableDates"
            :show-on-select-only="datePickerParameters.showOnSelectOnly"
            :pre-selected-date="datePickerParameters.defaultStartDate"
            :value="formData.arrival"
            input-class="p-3 py-3.5 w-full shadow-input border border-r-0 border-gray-500 focus:outline-none text-gray-800 text-sm"
            @selected="onDateSelected($event, 'arrival')"
          />
        </div>

        <div class="flex w-2/5 relative right-0.5">
          <select
            v-model="formData.arrivalTime"
            name="arrivalTime"
            class="px-4 table-cell w-full shadow-input rounded-r border-l border-b border-t border-gray-500 bg-white focus:outline-none appearance-none text-gray-800 text-sm"
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
          <div class="absolute right-2 top-3">
            <icon-info>{{ $i18n('search.arrival-time-explanation-general') }}</icon-info>
          </div>
        </div>
      </div>

      <div class="flex mb-4">
        <div class="flex w-3/5">
          <div
            class="icon px-4 flex items-center justify-center bg-white shadow-input rounded-l border border-r-0 border-gray-500"
            @click="$refs.departureDatePicker.showCalendar()"
          >
            <icon-calendar />
          </div>

          <DatePicker
            ref="departureDatePicker"
            class="focus:outline-none"
            ref-name="departureDatePickerInput"
            name="departure"
            :placeholder="$i18n('templates.date-until')"
            :lang="language.lang"
            :full-month-name="datePickerParameters.fullMonthName"
            :open-date="datePickerParameters.startDate"
            :disabled-dates="datePickerParameters.disableDates"
            :show-on-select-only="datePickerParameters.showOnSelectOnly"
            :pre-selected-date="preSelectedDateDeparture"
            input-class="p-3 py-3.5 w-full shadow-input border border-r-0 border-gray-500 focus:outline-none text-gray-800 text-sm"
            :value="formData.departure"
            @selected="onDateSelected($event, 'departure')"
          />
        </div>

        <div class="flex w-2/5 relative right-0.5">
          <select
            v-model="formData.departureTime"
            name="arrivalTime"
            class="px-4 table-cell w-full shadow-input rounded-r border-l border-b border-t border-gray-500 bg-white focus:outline-none appearance-none text-gray-800 text-sm"
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
          <div class="absolute right-2 top-3">
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
import { Language as LanguageType } from '../../types/Language'
import IconInfo from '~/components/icons/IconInfo.vue'
import IconCalendar from '~/components/icons/IconCalendar.vue'
import IconPin from '~/components/icons/IconPin.vue'
import DatePicker from '~/plugins/vue-datepicker/components/Datepicker.vue'

import { getInstance } from '~/services/apiService'

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
  defaultStartDate: Date,
}

export default Vue.extend({
  components: {
    IconPin,
    IconCalendar,
    IconInfo,
    DatePicker
  },

  data(): {
    enableNewFastSearch: boolean,
    formData: SearchParameters,
    showAirportSelector: boolean,
    datePickerParameters: DatePickerParameters,
    language?: LanguageType,
    airport?: AirportType,
    airports?: Array<AirportType>,
    airportData: {},
    } {
    return {
      enableNewFastSearch: false,
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
        },
        defaultStartDate: (function() {
          let now = new Date();
          now.setDate(now.getDate() + 7);
          return now;
        })(),
      },
      language: undefined,
      airport: undefined,
      airports: undefined,
      airportData: {}
    }
  },

  async fetch() {
    const slug = this.$route.params.airport
    const api = getInstance('parkos', {
      baseURL: 'https://parkos.com/api/v1/'
    })

    const languages = await api.getLanguages()

    const currentLanguage = await Array.prototype.find.call(languages, language => language.domain === this.$paths.langHost)
    this.language = currentLanguage

    this.airports = await api.getAirports(this.language!.lang)
    this.airport = await api.getAirport(slug, this.language!.lang)

    this.airportData = await api.getAirportData(slug, this.language!.lang)
  },

  computed: {
    preSelectedDateDeparture(): Date {
      const date = new Date()
      date.setDate(this.datePickerParameters.startDate.getDate() + 14)

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
      let obj: { [key: string]: Array<AirportType> } = {}
      const airports = this.airports!.sort((a, b) => (a.name > b.name) ? 1 : -1)
      airports.forEach((airport: AirportType) => {
        if (!Object.prototype.hasOwnProperty.call(obj, airport.country.name)) {
          obj[airport.country.name] = []
        }

        obj[airport.country.name].push(airport)
      })

      obj = Object.fromEntries(
        Object.entries(obj)
          .sort(([, a], [, b]) =>
            a[0].country.name > b[0].country.name ? 1 : (b[0].country.id === this.language!.country.id ? 1 : -1)
          )
      )

      return obj
    },

    pricePerDay(): string {
      return new Intl.NumberFormat(this.language!.lang, {
        style: 'currency',
        currency: 'EUR'
      }).format(this.airport!.from_price / 8)
    }
  },

  created() {
    if (Object.prototype.hasOwnProperty.call(this.$route.params, 'airport')) {
      this.formData.airport = this.$route.params.airport
      this.showAirportSelector = false
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
  }
})
</script>

<style>
select[name="airport"] {
  user-select: none;
  background-image: url(https://assets.parkos.com/assets/images/dropdown.png)!important;
  background-position-x: 95%;
  background-position-y: 14px;
  background-position: right 15px center;
  background-repeat: no-repeat;
  background-size: 11px 20px;
}

.slide-enter-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter, .slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>
