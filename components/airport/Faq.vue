<template>
  <section id="faq">
    <div class="container mx-auto mb-16">
      <h2 class="text-3xl text-blue-900 font-heading mb-14">
        {{ $i18n("additional.faq") }}
      </h2>

      <ul role="tablist" class="hidden sm:flex items-end questions">
        <li
          v-for="(item, index) in items"
          :key="`q-${item.slug}`"
          role="presentation"
        >
          <button
            type="button"
            role="tab"
            :data-target="`#${item.slug}`"
            :id="`question-${index}`"
            class="inline-block border border-b-0 py-3 px-4 mr-2 rounded-t max-w-sm whitespace-normal"
            :class="{
              'bg-white border-gray-500': item.slug === active,
              'border-transparent text-blue-700 hover:bg-gray-300':
                item.slug !== active,
            }"
            @click="select"
          >
            {{ item.title }}
          </button>
        </li>
      </ul>

      <section
        v-for="(item, index) in items"
        :key="`a-${item.slug}`"
        class="border border-gray-500 questions"
        :class="{ 'sm:border-transparent sm:rounded-b': item.slug !== active }"
      >
        <a
          :href="`#${item.slug}`"
          role="tab"
          @click="select"
          class="block sm:hidden font-bold py-3 px-4"
          :class="{ 'bg-gray-200': item.slug === active }"
        >
          {{ item.title }}
        </a>
        <div
          role="tabpanel"
          v-bind="{ hidden: item.slug !== active }"
          :id="item.slug"
          :aria-labelledby="`question-${index}`"
          class="sm:rounded-b py-3 px-4 bg-gray-200 sm:bg-white"
        >
          {{ item.content | strip | preview }}

          <a
            :href="`${$route.path}/${item.slug}.html`"
            class="text-blue-700 hover:text-blue-900 hover:underline"
            >{{ $i18n("templates.read-full-answer") }}</a
          >
        </div>
      </section>

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
import { FaqItem as FaqItemType } from "~/types/FaqItem";

import Vue, { PropOptions } from "vue";
export default Vue.extend({
  props: {
    items: {
      type: Array,
      required: true,
    } as PropOptions<Array<FaqItemType>>,
  },

  data(): {
    active: string;
  } {
    return {
      active: this.items[0].slug,
    };
  },

  methods: {
    select($event: MouseEvent) {
      // @ts-ignore
      const target: string = $event.target.getAttribute('data-target')!.slice(1);

      // @ts-ignore
      $event.target.blur();

      this.active = target;
    },
  },

  filters: {
    strip: (value: string): string => value.replace(/(<([^>]+)>)/gi, ""),
    preview: (value: string, limit: number = 15): string =>
      value.split(/\s+/).slice(0, limit).join(" ") + "...",
  },
});
</script>

<style>
.questions {
  margin-bottom: -1px;
}
</style>
