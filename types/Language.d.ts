import { Socials } from './Socials'
import { Country } from './Country'
import { Currency } from './Currency'


export type Language = {
  id: number;
  object: string;
  lang: string;
  name: string;
  // eslint-disable-next-line camelcase
  native_name: string;
  domain: string;
  // eslint-disable-next-line camelcase
  gtm_key?: string;
  socials: Socials;
  country: Country;
  currency: Currency;
}
