import { Address } from './Address'
import { Country } from './Country'
import { OpeningTimes } from './OpeningTimes'
export interface Airport {
    id: number;
    object: string;
    name: string;
    slug: string;
    logo: string;
    from_price: number;
    address: Address;
    country: Pick<Country, 'id' | 'code' | 'name'>;
    opening_times: OpeningTimes;
}