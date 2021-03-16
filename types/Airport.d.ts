export type Address = {
    street: string;
    zip_code: string;
    city: string;
    latitude: number;
    longitude: number;
}

export interface Country {
    id: number;
    code: string;
}

export interface OpeningTimes {
    from: string;
    till: string;
}

export interface Airport {
    id: number;
    object: string;
    name: string;
    slug: string;
    logo: string;
    from_price: number;
    address: Address;
    country: Country;
    opening_times: OpeningTimes;
}