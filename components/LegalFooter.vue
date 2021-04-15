<template>
  <section class="bg-blue-900 relative z-20 text-white -mt-6">
    <div class="container mx-auto py-12">
      <div class="flex justify-center mb-12">
        <ul class="flex">
          <li v-for="(link, social) in $currentLanguage.socials" :key="social">
            <a :href="link" target="_blank" rel="noopener nofollow" :aria-label="social" class="w-12 h-12 mx-3 flex items-center justify-center border border-white rounded hover:border-gray-700">
              <img
                :src="`${$paths.assetsUrl}images/${social}.svg`"
                :alt="`Logo: ${social}`"
                width="36"
                height="36"
                class="w-9 h-9"
                loading="lazy">
            </a>
          </li>
        </ul>
      </div>
      <div class="flex justify-center leading-loose flex-col sm:flex-row">
        <p class="mx-4 font-bold">
          &copy; Parkos
        </p>
        <a :href="`${$paths.url()}termini-e-condizioni.html`" class="mx-4 text-white hover:text-white">Termini e condizioni</a>
        <a :href="`${$paths.url()}privacy-policy.html`" class="mx-4 text-white hover:text-white">Privacy Policy</a>
      </div>
    </div>
  </section>
</template>
