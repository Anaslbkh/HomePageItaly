import { Address } from './Address'
import { Country } from './Country'
import { OpeningTimes } from './OpeningTimes' 

export type Parking = {
    id: number;
    object: string;
    name: string;
    slug: string;
    logo?: string;
    from_price?: number; // Sometimes from_price is not available
    address: Address;
    country: Pick<Country, 'id' | 'code' | 'name'>;
    opening_times: OpeningTimes;
}