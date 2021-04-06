import { Socials } from './Socials'
import { Country } from './Country'

export type Language = {
    id: number;
    object: string;
    lang: string;
    name: string;
    domain: string;
    gtm_key?: string;
    socials: Socials;
    country: Country
}
