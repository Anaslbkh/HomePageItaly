<template>
  <footer class="bg-blue-300 skew -mt-4 z-10 py-24 text-white">
    <div class="container unskew mx-auto">
      <section class="grid grid-cols-1 md:grid-cols-4 border-b border-gray-500">
        <article>
          <ul class="mb-4 leading-loose">
            <li><strong>{{ $i18n('general.airports') }}</strong></li>
            <li>
              <a class="text-white hover:text-white" :href="`${$paths.url()}parcheggio-malpensa/`">
                Milano Malpensa
              </a>
            </li>
            <li>
              <a class="text-white hover:text-white" :href="`${$paths.url()}parcheggio-orio-al-serio/`">
                Bergamo Orio al Serio
              </a>
            </li>
            <li>
              <a class="text-white hover:text-white" :href="`${$paths.url()}parcheggio-fiumicino/`">
                Roma Fiumicino
              </a>
            </li>
            <li>
              <a
                class="text-white hover:text-white"
                :href="`${$paths.url()}#all`"
                style="text-decoration: underline"
              >
                {{ $i18n('general.all-airports') }}
              </a>
            </li>
          </ul>
        </article>
        <article>
          <ul class="mb-4 leading-loose">
            <li><strong>{{ $i18n('additional.information') }}</strong></li>
            <li>
              <a class="text-white hover:text-white" :href="`${$paths.url()}car-valet.html`">
                Car valet
              </a>
            </li>
            <li>
              <a class="text-white hover:text-white" :href="`${$paths.url()}parcheggio-bus-navetta.html`">
                Parcheggio con bus navetta
              </a>
            </li>
          </ul>
        </article>
        <article>
          <ul class="mb-4 leading-loose">
            <li><strong>{{ $i18n('templates.faq-about-parkos') }}</strong></li>
            <li>
              <a class="text-white hover:text-white" href="https://parkos.zendesk.com/hc/it/">Servizio clienti</a>
            </li>
            <li><a class="text-white hover:text-white" :href="`${$paths.url()}blog/`">Blog</a></li>
          </ul>
        </article>
        <article>
          <figure class="flex justify-center">
            <img
              :src="`${$paths.assetsUrl}img/static/parkos-employees-en-eu.png`"
              width="300"
              height="200"
              alt="Parkos Employees"
              loading="lazy"
            />
          </figure>
        </article>
      </section>
      <section class="flex justify-center items-center flex-wrap">
        <p class="w-full text-center font-bold my-8">
          Prenota e paga in maniera sicura
        </p>

        <ul class="flex flex-wrap justify-center">
          <li class="mx-2">
            <img
              :src="`${$paths.assetsUrl}img/payment-logos/trustpilot.png`"
              width="130"
              height="50"
              alt="TrustPilot"
              loading="lazy"
            />
          </li>
          <li class="mx-2">
            <img
              :src="`${$paths.assetsUrl}img/payment-icons/810.png`"
              width="54"
              height="50"
              alt="Nexi"
              loading="lazy"
            />
          </li>
          <li class="mx-2">
            <img
              :src="`${$paths.assetsUrl}img/payment-icons/138.png`"
              width="50"
              height="50"
              alt="PayPal"
              loading="lazy"
            />
          </li>
          <li class="mx-2">
            <img
              :src="`${$paths.assetsUrl}img/payment-icons/706.png`"
              width="54"
              height="50"
              alt="Mastercard"
              loading="lazy"
            />
          </li>
          <li class="mx-2">
            <img
              :src="`${$paths.assetsUrl}img/payment-icons/707.png`"
              width="53"
              height="50"
              alt="Visa"
              loading="lazy"
            />
          </li>
          <li class="mx-2">
            <img
              :src="`${$paths.assetsUrl}img/payment-logos/footer_american_express_blue_2.png`"
              width="58"
              height="50"
              alt="American Express"
              loading="lazy"
            />
          </li>
          <li class="mx-2">
            <img
              :src="`${$paths.assetsUrl}img/payment-icons/it-postepay.png`"
              width="135"
              height="32"
              alt="PostePay"
              loading="lazy"
              style="max-height: 40px"
            />
          </li>
        </ul>
      </section>
    </div>
  </footer>
</template>

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
