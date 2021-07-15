<template>
  <footer class="bg-blue-300 skew -mt-4 z-10 py-24 text-white">
    <div class="container unskew mx-auto">
      <section class="grid grid-cols-1 md:grid-cols-4 border-b border-gray-500">
        <template v-for="slug in ['footer_airports', 'footer_information', 'footer_about']">
          <PageTemplate :slug="slug" :key="slug" class="text-white leading-loose" :language="language" />
        </template>
        <article>
          <figure class="flex justify-center">
            <img
              :src="`${$paths.assetsUrl}img/static/parkos-employees-en-eu.png`"
              width="300"
              height="200"
              alt="Parkos Employees"
              loading="lazy"
            >
          </figure>
        </article>
      </section>
      <section class="flex justify-center items-center flex-wrap">
        <PageTemplate slug="footer_icons" :language="language" />
      </section>
    </div>
  </footer>
</template>

<script>
import { getInstance } from '~/services/apiService'
import PageTemplate from './PageTemplate.vue';

export default {
  data() {
    return {
      language: {}
    }
  },

  components: {
    PageTemplate,
  },

  async fetch() {
    const api = getInstance('parkos', {
      baseURL: 'https://parkos.com/api/v1/'
    })

    const languages = await api.getLanguages()
    const currentLanguage = await Array.prototype.find.call(languages, language => language.domain === this.$paths.langHost)
    console.log(currentLanguage);
    this.language = currentLanguage;
  }
}
</script>

<style>
footer {
  transform: skew(0deg, -1deg);
  margin-top: -2.5rem;
}

footer .container {
  transform: skew(0deg, 1deg);
}

footer,
footer .footer-content {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
</style>
