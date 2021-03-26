import { Meta } from './Meta'

export type FaqItem = {
    object: string;
    title: string;
    slug: string;
    content: string;
    meta: Meta;
}