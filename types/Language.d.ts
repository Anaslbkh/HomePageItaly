import { Socials } from './Socials'

export type Language = {
    id: number;
    object: string;
    lang: string;
    name: string;
    domain: string;
    gtm_key?: string;
    socials: Socials;
}