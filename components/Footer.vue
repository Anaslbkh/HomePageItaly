<template>
  <footer class="bg-blue-300 skew -mt-4 z-10 py-24 text-white">
    <div class="container unskew mx-auto">
      <section class="grid grid-cols-4 border-b border-gray-500">
        <article>
          <ul>
            <li><strong>Airports</strong></li>
            <li>
              <a href="https://eu.parkos.com/dusseldorf-airport-parking/">
                Düsseldorf Airport
              </a>
            </li>
            <li>
              <a href="https://eu.parkos.com/malpensa-airport-parking/">
                Milano Malpensa Airport
              </a>
            </li>
            <li>
              <a href="https://eu.parkos.com/cologne-airport-parking/">
                Cologne Airport
              </a>
            </li>
            <li>
              <a href="https://eu.parkos.com/#all" class="underline">
                All airports
              </a>
            </li>
          </ul>
        </article>
        <article>
          <ul>
            <li><strong>Information</strong></li>
            <li>
              <a href="https://parkos.com/valet-parking.html">Valet parking</a>
            </li>
            <li>
              <a href="https://parkos.com/self-park.html">Shuttle parking</a>
            </li>
          </ul>
        </article>
        <article>
          <ul>
            <li><b>About Parkos</b></li>
            <li>
              <a href="https://parkos.com/frequently-asked-questions/"
                >Frequently Asked Questions</a
              >
            </li>
            <li>
              <a href="https://eu.parkos.com/partners.html">Become a partner</a>
            </li>
            <li>
              <a href="https://eu.parkos.com/customerservice.html">
                Customer Service
              </a>
            </li>
            <li>
              <a href="https://eu.parkos.com/vacancies-parkos-groningen.html">
                Vacancies and internships
              </a>
            </li>
          </ul>
        </article>
        <article>
          <figure>
            <img
              src="https://assets.parkos.com/assets/img/static/parkos-employees-en-eu.png"
              alt="Parkos Employees"
              loading="lazy"
            />
          </figure>
        </article>
      </section>
      <section class="flex justify-center items-center flex-wrap">
        <p class="w-full text-center font-bold my-8">Book safely and pay securely</p>

        <ul class="flex">
          <li class="mx-2">
            <img
              src="https://assets.parkos.com/assets/img/payment-icons/707.png"
              loading="lazy"
              height="50px"
              alt="Visa"
            />
          </li>
          <li class="mx-2">
            <img
              src="https://assets.parkos.com/assets/img/payment-icons/706.png"
              height="50px"
              loading="lazy"
              alt="Mastercard"
            />
          </li>
          <li class="mx-2">
            <img
              src="https://assets.parkos.com/assets/img/payment-logos/footer_american_express_blue_2.png"
              height="50px"
              loading="lazy"
              alt="American Express"
            />
          </li>
          <li class="mx-2">
            <img
              src="https://assets.parkos.com/assets/img/payment-icons/138.png"
              height="50px"
              loading="lazy"
              alt="PayPal"
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