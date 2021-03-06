<template>
  <header
    class="bg-blue-500 gradient"
    :class="{ 'skew -mt-8 pt-8': navOpen, 'pb-4': !showSearch }"
  >
    <section
      class="w-full"
      :class="{ unskew: navOpen, 'fixed z-50': navShown }"
    >
      <div class="container mx-auto flex justify-between h-16 items-center">
        <a href="/">
          <div class="sr-only">Parkos</div>
          <Logo />
        </a>
        <button
          class="
            block
            px-4
            h-14
            fixed
            right-0
            mr-4
            sm:hidden
            z-50
            focus:outline-none
          "
          aria-controls="navigation"
          @click="toggleMenu"
        >
          <span class="sr-only">Toggle navigation</span>
          <span
            style="width: 22px"
            class="
              block
              h-0.5
              bg-white bg-opacity-50
              transition-all
              origin-navTop
            "
            :class="{ 'transform  rotate-45': navShown }"
          />
          <span
            style="width: 22px"
            class="block h-0.5 bg-white bg-opacity-50 transition-all mt-1"
            :class="{ 'opacity-0': navShown }"
          />
          <span
            style="width: 22px"
            class="
              block
              h-0.5
              bg-white bg-opacity-50
              transition-all
              mt-1
              origin-navBottom
            "
            :class="{ 'transform -rotate-45': navShown }"
          />
        </button>
        <nav
          id="navigation"
          class="
            sm:block
            text-white
            bg-blue-900
            sm:bg-transparent
            absolute
            sm:static
            top-0
            left-0
            bottom-0
            right-0
            h-screen
            sm:h-auto
            z-10
            py-12
            sm:py-0
            px-6
            sm:px-0
          "
          :class="{ hidden: !navShown, 'block overflow-y-scroll': navShown }"
        >
          <ul
            class="
              flex flex-col
              sm:flex-row
              sm:inline-flex
              text-lg
              sm:text-base
            "
          >
            <Airports />

            <li>
              <a
                :href="`https://parkos.zendesk.com/hc/${zenDeskLangCode}`"
                rel="nofollow"
                class="
                  flex
                  text-white
                  hover:text-white
                  hover:no-underline
                  sm:inline-flex
                  items-center
                  px-3
                  py-6
                  sm:py-0
                  border-b border-white border-opacity-20
                  sm:border-b-0
                "
              >
                <img
                  src="~/static/icons/customerservice.svg"
                  width="16"
                  height="16"
                  aria-hidden="true"
                  alt="check"
                  loading="lazy"
                  class="mr-1 -top-0.5 relative"
                />

                {{ $i18n("general.customer-service") }}
              </a>
            </li>
            <li>
              <a
                :href="`${$paths.url()}login/`"
                class="
                  flex
                  sm:inline-flex
                  text-white
                  hover:text-white
                  hover:no-underline
                  items-center
                  px-3
                  py-6
                  sm:py-0
                  border-b border-white border-opacity-20
                  sm:border-b-0
                "
              >
                <img
                  src="~/static/icons/account.svg"
                  width="16"
                  height="16"
                  aria-hidden="true"
                  alt="check"
                  loading="lazy"
                  class="mr-1 -top-0.5 relative"
                />
                {{ $i18n("templates.header-login") }}
              </a>
            </li>
            <li>
              <a
                :href="aboutPageLink"
                class="
                  flex
                  text-white
                  hover:text-white
                  hover:no-underline
                  sm:inline-flex
                  items-center
                  px-3
                  py-6
                  sm:py-0
                  border-b border-white border-opacity-20
                  sm:border-b-0
                "
              >
                <img
                  src="~/static/icons/globe.svg"
                  width="16"
                  height="16"
                  aria-hidden="true"
                  alt="check"
                  loading="lazy"
                  class="mr-1 -top-0.5 relative"
                />
                {{ $i18n("general.about-us") }}
              </a>
            </li>
            <Languages />
          </ul>
        </nav>
      </div>

      <section v-if="showSearch" id="search">
        <div class="container mx-auto">
          <SearchForm />
        </div>
      </section>
    </section>
  </header>
</template>

<script>
import Vue from "vue";
import Airports from "~/components/header/Airports.vue";
import LOGO from "~/components/Logo.vue";
import Languages from "~/components/header/LanguageB.vue";
import SearchForm from "../components/search/indexB.vue";
export default Vue.extend({
  props: {
    showSearch: {
      default: true,
      type: Boolean,
    },
  },
  data() {
    return {
      navOpen: true,
      navShown: false,
      language: null,
      aboutPageContent: null,
    };
  },
  components: { Airports, Languages, LOGO, SearchForm },
  computed: {
    zenDeskLangCode() {
      if (this.language && this.language.lang) {
        const langCode = this.language.lang;
        if (langCode === "en-eu") {
          return "en-150";
        }
        return langCode;
      }

      return null;
    },

    aboutPageLink() {
      if (this.aboutPageContent && this.language && this.language.lang) {
        const currentContent = this.aboutPageContent[this.language.lang];
        return `${this.$paths.url()}${currentContent.slug}.html`;
      }

      return null;
    },

    aboutPageTitle() {
      if (this.aboutPageContent && this.language && this.language.lang) {
        const currentContent = this.aboutPageContent[this.language.lang];
        return currentContent.title;
      }

      return null;
    },
  },

  methods: {
    toggleMenu() {
      this.navShown = !this.navShown;

      this.$emit("toggle", this.navShown);
    },
  },
});
</script>

<style>
header {
  background-image: url(https://assets.parkos.com/assets/images/pattern.png?c01a783…);
  background-image: url(https://assets.parkos.com/assets/images/pattern.png?c01a783…),
    linear-gradient(0deg, rgba(35, 176, 253, 0.4), rgba(9, 131, 240, 0.4));
}
</style>
