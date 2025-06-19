export interface Country {
  flags: Flags
  name: Name
  cca2: string
  cioc: string
  currencies: Currencies
  capital: string[]
  region: string
  languages: Languages
  population: number
  timezones: string[]
}

export interface Flags {
  png: string
  svg: string
  alt: string
}

export interface Name {
  common: string
  official: string
  nativeName: NativeName
}

export interface NativeName {
  fra: Fra
}

export interface Fra {
  official: string
  common: string
}

export interface Currencies {
  EUR: Eur
}

export interface Eur {
  name: string
  symbol: string
}

export interface Languages {
  fra: string
}
