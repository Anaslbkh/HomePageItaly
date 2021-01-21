<template>
  <div>
    <section id="search" class="py-24 bg-blue-500"> 
      <div class="container mx-auto">
          <div class="flex justify-center flex-wrap text-white mb-8">
            <h1 class="w-full text-5xl font-semibold text-center">Schiphol Parking</h1>
            <p>From €1.78 per day!</p>
            <button class="ml-4 text-white text-opacity-50">Change airport</button>
          </div>
          <form action="/schiphol-parking/search/" class="w-1/3 flex flex-col mx-auto">
            <input type="hidden" name="parkosfastsearchtest">
            <div class="flex mb-4">
              <div class="icon w-16 flex items-center justify-center bg-white border-r">{ }</div>
              <input type="date" name="arrival" id="" class="p-3 w-full">
              <select name="arrivalTime" id="" class="px-4 border-l">
                <option v-for="time in times" :key="`arrival-time-${time}`" :value="time" :selected="time === '12:00'">{{ time }}</option>
              </select>
            </div>
            
            <div class="flex mb-4">
              <div class="icon w-16 flex items-center justify-center bg-white border-r">{ }</div>
              <input type="date" name="departure" id="" class="p-3 w-full">
              <select name="depatureTime" id="" class="px-4 border-l">
                <option v-for="time in times" :key="`depature-time-${time}`" :value="time" :selected="time === '12:00'">{{ time }}</option>
              </select>
            </div>

            <button type="submit" class="bg-orange-500 text-white p-3">Search parking</button>
          </form>
      </div>
    </section>
    <section id="reviews" class="py-24">
      <div class="container mx-auto mb-16">
        <div class="w-3/5">
          <h2 class="text-3xl font-semibold mb-10">Customers rate our car parking providers with an average of 9.1</h2>
          <p class="text-lg">Customers who have booked a parking space through us, rate these with an average of 9.1/10 based on 70 reviews.</p>
        </div>
      </div>
      <section class="grid grid-cols-4 gap-8 p-8">
        <article v-for="i in 4" :key="`review-${i}`" class="p-4 border">
          <div class="flex justify-between items-center mb-4">
            <div>
              <p class="text-sm font-semibold text-gray-800">Parkos Customer #{{ i }}</p>
              <p class="font-semibold">{{ date }}</p>
            </div>
            <p class="text-4xl font-semibold border-b-4 border-blue-500">10</p>
          </div>
          <p class="w-full">{{ reviews[i - 1] }}</p>
        </article>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
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

    date() {
      return new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date())
    },

    reviews() {
      return [
        "Easy to reach and shuttle ready for dropping off and picking up within 5 minutes. Excellent! I'm going to use it again!...",
        "Uitstekende service. Punctueel en vriendelijk.",
        "Just perfect . Car on place when i back i dnt nwed wait perfect also when i leave car everything perfect 0 minute for wait that s super perfect im ...",
        "I did not have any problems with the parking or the car. The team was very friendly and easy to contact. I missed the plane on the first day so they a..."
      ]
    }
  }
});
</script>