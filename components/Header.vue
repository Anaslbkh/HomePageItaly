<template>
  <header class="bg-blue-500 gradient" :class="{ skew: navOpen }">
    <section :class="{ unskew: navOpen }">
      <div class="container mx-auto flex justify-between h-16 items-center">
        <a href="#">
          <Logo />
        </a>
        <nav class="text-white">
          <button class="inline-flex items-base px-3">
            <span class="material-icons mr-1 text-xl">flight_takeoff</span>
            Airports
            <span class="material-icons">arrow_drop_down</span>
          </button>
          <a href="#" class="inline-flex items-base px-3">
            <span class="material-icons mr-1 text-xl">question_answer</span>
            Customer Service
          </a>
          <a href="#" class="inline-flex items-base px-3">
            <span class="material-icons mr-1 text-xl">person</span>
            Sign In
          </a>
          <a href="#" class="inline-flex items-base px-3">
            <span class="material-icons mr-1 text-xl">language</span>
            About Us
          </a>
          <button class="inline-flex items-base px-3">
            <span class="material-icons mr-1 text-xl">flag</span> 
            EN
            <span class="material-icons">arrow_drop_down</span>
          </button>
        </nav>
      </div>

      <section id="search">
        <div class="container mx-auto">
          <div class="flex justify-center flex-wrap text-white mb-8">
            <h1 class="w-full text-6xl text-center font-heading mb-4">
              Schiphol Parking
            </h1>
            <p>From €1.78 per day!</p>
            <button class="ml-4 text-white text-opacity-50">
              Change airport
            </button>
          </div>
          <form
            action="/schiphol-parking/search/"
            class="w-1/3 flex flex-col mx-auto mb-12"
          >
            <input type="hidden" name="parkosfastsearchtest" />
            <div class="flex mb-4">
              <div
                class="icon w-16 flex items-center justify-center bg-white shadow-input rounded-l border border-r-0 border-gray-500"
              >
                { }
              </div>
              <input
                type="date"
                name="arrival"
                id=""
                class="p-3 w-full shadow-input border border-r-0 border-gray-500"
              />
              <select
                name="arrivalTime"
                id=""
                class="px-4 border-l shadow-input rounded-r border border-gray-500"
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
            </div>

            <div class="flex mb-4">
              <div
                class="icon w-16 flex items-center justify-center bg-white shadow-input rounded-l border border-r-0 border-gray-500"
              >
                { }
              </div>
              <input
                type="date"
                name="departure"
                id=""
                class="p-3 w-full shadow-input border border-r-0 border-gray-500"
              />
              <select
                name="depatureTime"
                id=""
                class="px-4 shadow-input rounded-r border border-gray-500"
              >
                <option
                  v-for="time in times"
                  :key="`depature-time-${time}`"
                  :value="time"
                  :selected="time === '12:00'"
                >
                  {{ time }}
                </option>
              </select>
            </div>

            <button
              type="submit"
              class="bg-primary-500 text-white p-3 text-lg font-heading rounded shadow-button hover:bg-primary-600 focus:bg-primary-700"
            >
              Search parking
            </button>
          </form>

          <section class="grid grid-cols-3 text-white border-t py-8">
            <article class="flex align-items justify-center">
              <span class="material-icons mr-1 text-lg">check</span> Best deals
            </article>
            <article class="flex align-items justify-center">
              <span class="material-icons mr-1 text-lg">check</span> 500,000
              customers worldwide
            </article>
            <article class="flex align-items justify-center">
              <span class="material-icons mr-1 text-lg">check</span>
              Cancel/change reservation for free
            </article>
          </section>
        </div>
      </section>
    </section>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
import Logo from "./Logo.vue";

export default Vue.extend({
  components: {
    Logo,
  },

  data() {
    return {
      navOpen: true,
    };
  },

  computed: {
    times() {
      const interval = 15; //minutes interval
      let times = []; // time array
      let time = 0; // start time

      //loop to increment the time and push results in array
      for (let i = 0; time < 24 * 60; i++) {
        times[i] =
          ("0" + Math.floor(time / 60)).slice(-2) +
          ":" +
          ("0" + (time % 60)).slice(-2);
        time = time + interval;
      }

      return times;
    },
  },
});
</script>

<style>
.gradient {
  background-image: url(https://assets.parkos.com/assets/images/pattern.ba250c.png),
    linear-gradient(0deg, rgba(35, 176, 253, 0.4), rgba(9, 131, 240, 0.4));
}
.skew {
  transform: skew(0deg, -1deg);
  margin-top: -50px;
  padding-top: 50px;
  backface-visibility: hidden;
}
.unskew {
  transform: skew(0deg, 1deg);
  backface-visibility: hidden;
}
</style>