<template>
  <div class="bg-gray-200 border-t border-b border-gray-500 py-12 sm:py-24">
    <section>
      <div class="container header">
        <h2 class="text-3xl mb-10 font-heading container">
          I nostri aeroporti
        </h2>
        <p class="container">
          Prenota subito un posto auto in modo sicuro presso le
          {{ totalParkings }} aziende di parcheggio nostre partner vicino ai
          seguenti {{ airports.length }} aeroporti. Il tuo aeroporto di partenza
          non si trova nella lista?
          <a :href="`#`">{{ airports[0].name }}</a> saranno aggiunti a breve.
        </p>
      </div>
      <div class="airports container">
        <div v-for="airport in airports" :key="airport.id" class="airport">
          <div class="thumbnail">
            <a :href="`https://parkos.it/${airport.slug}`">
              <div class="thumbnail-wrapper">
                <img
                  :src="`${$paths.assetsUrl}img/340x250/locations/${airport.devtitle}.jpg`"
                  alt="airportImg"
                />
              </div>
              <div class="caption">
                <p>
                  {{ airport.name }}<br /><span class="grey-text"
                    >Da € {{ airport.from_price }} a settimana</span
                  >
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: ["totalParkings", "airports", "total"],
  data() {
    return {
      parkingNumber: null,
      airprotsNumber: null,
      parkings: [],
      languages: {},
      language: null,
    };
  },
};
</script>

<style>
.container.header {
  margin-left: auto;
  margin-right: auto;
}
.airports {
  margin-top: 30px;
  margin-bottom: 50px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-around;
  align-items: center;
}
.airport {
  width: 335px;
  margin-bottom: 20px;
  height: 316px;
  background-color: white;
}
.thumbnail {
  width: 100%;
  height: 80%;
  border-radius: 4px;
}
.thumbnail a {
  color: #091f2f;
  display: block;
  text-decoration: none;
  position: relative;
  width: 100%;
  height: 100%;
}
.caption {
  width: 100%;
}
.caption p span {
  font-size: 1rem;
}
.thumbnail a p {
  padding: 0.625rem 0.9375rem;
  margin: 0;
}
.thumbnail .thumbnail-wrapper {
  width: 340px;
  height: 250px;
}
.thumbnail .thumbnail-wrapper {
  width: 100%;
  height: 100%;
}
</style>
