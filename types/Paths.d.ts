export type Paths = {
  langHost: string,
  schema: string;
  host: string;
  assetsUrl: string;
  url: (trailingSlash: boolean) => string;
}
