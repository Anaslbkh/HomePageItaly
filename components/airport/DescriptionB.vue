<template>
  <div class="bg-gray-200 border-t border-b border-gray-500 py-12 sm:py-24">
    <section class="description container">
      <div class="flex mb-4 items-start">
        <div class="sm:w-full md:w-full lg:w-2/3 mx-2">
          <h2 class="text-3xl mb-10 font-heading">
            Parcheggiare vicino all'aeroporto
          </h2>
          <p>
            Vuoi parcheggiare vicino a
            <a
              v-for="item in airports"
              :key="item.id"
              :href="`https://parkos.it/${item.slug}`"
              >{{ item.name }},</a
            >
            o ad un altro aeroporto europeo e stai cercando un posto auto ad un
            prezzo competitivo? Parkos confronta fornitori di parcheggio e offre
            tariffe low cost per parcheggi a lungo termine vicino aeroporti in
            Italia, Germania, Francia, Paesi Bassi, Belgio e Svezia. Troverai
            una panoramica completa di tutti i migliori parcheggi attorno i vari
            aeroporti, insieme a tutte le informazioni necessarie su prezzi e
            servizi per aiutarti a fare la scelta migliore. Puoi prenotare in
            modo semplice e veloce e parcheggiare in tutta sicurezza al miglior
            prezzo presso uno degli aeroporti nazionali e internazionali,
            risparmiando tempo e denaro.
          </p>
          <p>
            Oltre alle informazioni generali sulle aziende di parcheggio, ti
            forniamo tutte le informazioni specifiche sui vari servizi che
            offrono, come il car valet, il transfer in bus navetta, il
            parcheggio coperto, le opzioni di pagamento, la posizione e la
            distanza. Parcheggia in tutta tranquillità presso uno degli
            aeroporti, avendo la certezza di aver prenotato un posto auto sicuro
            per la tua sosta lunga con un'azienda leader nel confronto di
            parcheggi vicino agli aeroporti.
          </p>
          <p>
            Offriamo un servizio di confronto migliore grazie alle recensioni
            sui fornitori di parcheggio. Solo i nostri clienti possono lasciare
            una recensione, pertanto si tratta di recensioni autentiche al 100%.
            In questo modo ti aiutiamo a scegliere il miglior parcheggio
            possibile, per iniziare al meglio il tuo viaggio.
          </p>
          <p>
            In poche parole: vuoi prenotare un parcheggio sicuro al miglior
            prezzo? Sei nella pagina giusta!
          </p>
          <p>
            <a
              :href="`https://parkos.it/${airports[0].slug}`"
              class="
                inline-block
                bg-primary-500
                text-white
                p-3
                text-lg
                font-heading
                rounded
                shadow-button
                hover:bg-primary-600
                hover:no-underline
                hover:text-white
                focus:bg-primary-700
                mt-10
              "
            >
              Confronta subito i
              <span class="hidden-xs">{{ airports[0].name }}</span>
            </a>
          </p>
        </div>
        <div class="sm:invisible... lg:w-1/3 mx-2 mt-20">
          <img
            alt=""
            class="parking-picture"
            height="197"
            src="https://assets.parkos.com/assets/img/350x233/static-pages/home-arrival-airport.jpg"
            width="350"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getInstance } from "~/services/apiService";
export default {
  data() {
    return {
      airports: [],
    };
  },
  async fetch() {
    const api = getInstance("parkos");

    const languages = await api.getLanguages();
    const currentLanguage = await Array.prototype.find.call(
      languages,
      (language) => language.domain === this.$paths.langHost
    );

    this.airports = await api.getAirports(currentLanguage.lang);
  },
};
</script>

<style>
.description {
  margin-left: auto;
  margin-right: auto;
}
@media screen and (max-width: 990px) {
  .parking-picture {
    display: none !important;
    visibility: hidden !important;
  }
}
</style>
