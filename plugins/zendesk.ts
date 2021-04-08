// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import Vue from 'vue'

type ZendeskInstance = {
  zE(action: string, property: string, ...args: any): void;
  show(): void;
  toggle(): void;
  open(): void;
  load(): void;
  setLocale(locale: string): void;
  $on(event: string, fn: (property?: any) => void): void;
}

declare module 'vue/types/vue' {
  interface Vue {
    $zendesk: ZendeskInstance
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $zendesk: ZendeskInstance
  }
}
