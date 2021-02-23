export module Parking {
    export interface Address {
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

    export interface RootObject {
        id: number;
        object: string;
        name: string;
        slug: string;
        address: Address;
        country: Country;
        opening_times: OpeningTimes;
    }
}