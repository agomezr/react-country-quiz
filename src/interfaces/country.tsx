export interface CurrencyDetail {
  symbol: string;
  name: string;
}

export interface CurrenciesObject {
  [key: string]: CurrencyDetail;
}


export interface CurrenciesList {
  currencies: {
    [key: string]: CurrenciesObject; 
  }
}