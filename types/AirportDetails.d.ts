import { Meta } from './Meta'
import { AirportContent } from '~/types/AirportContent'

export type AirportDetails = {
    id: number;
    object: string;
    title: string;
    name: string;
    meta: Meta;
    content: { [key: string]: AirportContent };
}
