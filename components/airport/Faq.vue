<template>
  <section id="faq">
    <div class="container mx-auto mb-16">
      <h2 class="text-3xl text-blue-900 font-heading mb-14">
        {{ $i18n("additional.faq") }}
      </h2>

      <div>
        <ul class="hidden sm:flex border-b border-gray-500 tab-buttons">
          <li v-for="item in items" :key="`q-${item.slug}`" class="mr-1 items-end" :class="{'-mb-0.5': item.slug === active}">
            <button
              :class="{
                'border-gray-500 border-l border-t border-r rounded-t': item.slug === active,
                'border-transparent text-blue-700 hover:bg-gray-300':
                  item.slug !== active,
              }"
              class="inline-block bg-white py-2 px-4 mr-2 rounded-t max-w-sm whitespace-normal focus:outline-none text-left"
              @click.prevent="select(item)"
            >
              {{ item.title }}
            </button>
          </li>
        </ul>

        <ul class="block tab-contents w-full">
          <li
            v-for="(item) in items"
            :key="`a-${item.slug}`"
            :class="{ 'sm:hidden block': item.slug !== active }"
            class="block border sm:border-t-0 border-gray-500 w-full first:rounded-t first:rounded-b relative"
          >
            <a
              :href="`#${item.slug}`"
              role="tab"
              class="tab-title block sm:hidden font-bold px-4 leading-13 opacity-90"
              :class="{ 'bg-gray-200 underline active': item.slug === active }"
              @click.prevent="toggle(item)"
            >
              {{ item.title }}
            </a>

            <div
              :class="{ 'hidden': item.slug !== active }"
              class="sm:rounded-b py-0 pb-3 sm:py-5 px-4 bg-gray-200 sm:bg-white leading-8"
            >
              <span :inner-html.prop="item.content | strip | preview" />
              <a
                :href="`${$route.path}/${item.slug}.html`"
                class="text-blue-700 hover:text-blue-900 hover:underline"
              >{{ $i18n("templates.read-full-answer") }}</a>
            </div>
          </li>
        </ul>
      </div>

      <div class="flex pt-8">
        <a
          href="https://parkos.it/domande-frequenti/"
          target="_blank"
          class="inline-block bg-white text-blue-900 p-3 border border-gray-500 text-lg font-heading rounded shadow-button hover:border-gray-700 hover:shadow-buttonhover ml-auto"
        >
          {{ $i18n("templates.read-all-faqs") }}
        </a>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { FaqItem as FaqItemType } from '~/types/FaqItem'

export default Vue.extend({
  filters: {
    strip: (value: string): string => value.replace(/(<([^>]+)>)/gi, ''),
    preview: (value: string, limit: number = 15): string =>
      value.split(/\s+/).slice(0, limit).join(' ') + '...'
  },

  props: {
    items: {
      type: Array,
      required: true
    } as PropOptions<Array<FaqItemType>>
  },

  data(): {
    active: null|string;
    } {
    return {
      active: this.items[0].slug
    }
  },

  methods: {
    select(item: FaqItemType) {
      this.active = item.slug
    },
    toggle(item: FaqItemType) {
      this.active = this.active === item.slug ? null : item.slug
    },
  },
})
</script>

<style>
  .tab-contents .tab-title:after {
    content: "⌃";
    position: absolute;
    right: 0;
    top: 0;
    font-size: 30px;
    color: #000;
    font-weight: 400!important;
    line-height: 60px;
    height: 100%;
    padding-right: 15px;
    padding-left: 15px;
  }

  .tab-contents .tab-title:not(.active):after {
    color: #828282;
    transform: rotate(
      -180deg
    );
  }
</style>
