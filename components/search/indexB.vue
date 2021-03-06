<template>
  <div class="pb-8">
    <h1 class="h1">Confronta i parcheggi all'aeroporto</h1>
    <form
      :action="`/parkings/${formData.airport}/${$i18n('general.search-slug')}/`"
      class="max-w-full sm:max-w-sm flex flex-col mx-auto mb-12"
    >
      <transition name="slide">
        <div class="flex mb-4">
          <div
            class="
              icon
              px-4
              flex
              items-center
              justify-center
              bg-white
              shadow-input
              rounded-l
              border border-r-0 border-gray-500
            "
          >
            <icon-pin />
          </div>
          <select
            v-model="formData.airport"
            name="airport"
            class="
              appearance-none
              p-2.5
              py-3.5
              mr-1
              w-full
              shadow-input
              border border-r-0 border-gray-500
              focus:outline-none
              text-gray-800 text-sm
              bg-white
              rounded-r
            "
          >
            <option disabled selected="selected">
              {{ $i18n("general.where-to-park") }}
            </option>
            <optgroup
              v-for="(airports, country) in availableAirports"
              :key="country"
              :label="country"
            >
              <option
                v-for="airport in airports"
                :key="airport.slug"
                :value="airport.slug"
              >
                {{ airport.name }}
              </option>
            </optgroup>
          </select>
        </div>
      </transition>

      <div class="flex mb-4">
        <div class="flex w-3/5">
          <div
            class="
              icon
              px-4
              flex
              items-center
              justify-center
              bg-white
              shadow-input
              rounded-l
              border border-r-0 border-gray-500
            "
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
            :lang="'it'"
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
            class="
              px-4
              table-cell
              w-full
              shadow-input
              rounded-r
              border-l border-b border-t border-gray-500
              bg-white
              focus:outline-none
              appearance-none
              text-gray-800 text-sm
            "
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
            <icon-info>{{
              $i18n("search.arrival-time-explanation-general")
            }}</icon-info>
          </div>
        </div>
      </div>

      <div class="flex mb-4">
        <div class="flex w-3/5">
          <div
            class="
              icon
              px-4
              flex
              items-center
              justify-center
              bg-white
              shadow-input
              rounded-l
              border border-r-0 border-gray-500
            "
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
            :lang="'it'"
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
            name="departureTime"
            class="
              px-4
              table-cell
              w-full
              shadow-input
              rounded-r
              border-l border-b border-t border-gray-500
              bg-white
              focus:outline-none
              appearance-none
              text-gray-800 text-sm
            "
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
            <icon-info>{{
              $i18n("search.arrival-time-explanation-general")
            }}</icon-info>
          </div>
        </div>
      </div>

      <button
        type="submit"
        class="
          bg-primary-500
          text-white
          p-3
          text-lg
          font-heading
          rounded
          shadow-button
          hover:bg-primary-600
          focus:bg-primary-700
        "
      >
        {{ $i18n("home.search-parkingplace") }}
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Airport as AirportType } from "../../types/Airport";
import { Language as LanguageType } from "../../types/Language";
import IconInfo from "~/components/icons/IconInfo.vue";
import IconCalendar from "~/components/icons/IconCalendar.vue";
import IconPin from "~/components/icons/IconPin.vue";
import DatePicker from "~/plugins/vue-datepicker/components/Datepicker.vue";

import { getInstance } from "~/services/apiService";
type SearchParameters = {
  airport: string | undefined;
  arrival: string | Date | undefined;
  departure: string | Date | undefined;
  arrivalTime?: string;
  departureTime?: string;
};

type DatePickerParameters = {
  startDate: Date;
  showOnSelectOnly: boolean;
  fullMonthName: boolean;
  disableDates: Object;
  defaultStartDate: Date;
};

export default Vue.extend({
  components: {
    IconPin,
    IconCalendar,
    IconInfo,
    DatePicker,
  },
  data(): {
    enableNewFastSearch: boolean;
    formData: SearchParameters;
    datePickerParameters: DatePickerParameters;
    language?: LanguageType;
    airport?: AirportType;
    airports?: Array<AirportType>;
    airportData: {};
  } {
    return {
      enableNewFastSearch: true,
      formData: {
        airport: undefined,
        arrival: undefined,
        departure: undefined,
        arrivalTime: "12:00",
        departureTime: "12:00",
      },
      datePickerParameters: {
        startDate: new Date(),
        showOnSelectOnly: true,
        fullMonthName: true,
        disableDates: {
          to: new Date().setDate(new Date().getDate() - 1),
        },
        defaultStartDate: (function () {
          let now = new Date();
          now.setDate(now.getDate() + 7);
          return now;
        })(),
      },
      language: undefined,
      airport: undefined,
      airports: undefined,
      airportData: {},
    };
  },
  async fetch() {
    const api = getInstance("parkos");

    const languages = await api.getLanguages();

    this.language = await Array.prototype.find.call(
      languages,
      (language) => language.domain === this.$paths.langHost
    );

    this.airports = await api.getAirports(this.language!.lang);
  },
  computed: {
    preSelectedDateDeparture(): Date {
      const date = new Date();
      date.setDate(this.datePickerParameters.startDate.getDate() + 14);

      return date;
    },

    times(): Array<string> {
      const interval = 15; // minutes interval
      const times = []; // time array
      let time = 0; // start time

      // loop to increment the time and push results in array
      for (let i = 0; time < 24 * 60; i++) {
        times[i] =
          ("0" + Math.floor(time / 60)).slice(-2) +
          ":" +
          ("0" + (time % 60)).slice(-2);
        time = time + interval;
      }

      return times;
    },

    availableAirports() {
      let obj: { [key: string]: Array<AirportType> } = {};
      const airports = this.airports!.sort((a, b) =>
        a.name > b.name ? 1 : -1
      );
      airports.forEach((airport: AirportType) => {
        if (!Object.prototype.hasOwnProperty.call(obj, airport.country.name)) {
          obj[airport.country.name] = [];
        }

        obj[airport.country.name].push(airport);
      });

      obj = Object.fromEntries(
        Object.entries(obj).sort(([, a], [, b]) =>
          a[0].country.name > b[0].country.name
            ? 1
            : b[0].country.id === this.language!.country.id
            ? 1
            : -1
        )
      );

      return obj;
    },
  },
  methods: {
    onDateSelected(value: Date, inputKey: "arrival" | "departure") {
      this.formData[inputKey] = value;

      const reverseInputKey = inputKey === "arrival" ? "departure" : "arrival";
      let reverseValue = this.formData[reverseInputKey];
      if (inputKey === "arrival") {
        reverseValue = reverseValue || this.preSelectedDateDeparture;
        if (inputKey === "arrival" && value > reverseValue) {
          this.$set(
            this.formData,
            reverseInputKey,
            new Date(value).setDate(value.getDate() + 7)
          );
        }
      }

      if (inputKey === "departure" && (!reverseValue || value < reverseValue)) {
        this.$set(this.formData, reverseInputKey, value);
      }
    },
  },
});
</script>

<style>
.h1 {
  font-size: 48px;
  color: white;
  font-weight: bold;
  text-align: center;
}
</style>
