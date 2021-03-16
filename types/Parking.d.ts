export type Address = {
    street: string;
    zip_code: string;
    city: string;
    latitude: number;
    longitude: number;
}

export type Country = {
    id: number;
    code: string;
}

export type OpeningTimes = {
    from: string;
    till: string;
}

export type Parking = {
    id: number;
    object: string;
    name: string;
    slug: string;
    address: Address;
    country: Country;
    opening_times: OpeningTimes;
}