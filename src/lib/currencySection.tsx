/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CurrenciesObject, CurrencyDetail } from "../interfaces/country";
import { getOptions, shuffleArray } from "./helpers";

export function buildCurrencyQuestion(countryObject:any, allCountries:any){

    // 1. Get country currency
    const countryCurrency = Object.values(countryObject.currencies)[0].name;

    // 2. Get 3 ramdon currencies but not the correct one
    const allCurrencies:string[] = [];
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    allCountries.map((e:any) => {
        const currenciesObject: CurrenciesObject = e.currencies;
        if (Object.keys(currenciesObject).length > 0) {
            const namesPotentiallyNested = Object.values(currenciesObject).map((currency:CurrencyDetail) => currency.name);
            const allNamesFlat = namesPotentiallyNested.flat(Infinity);
            allCurrencies.push(...allNamesFlat);
        }
    });
    // Delete repeated currencies names
    const uniqueCurrencies = [...new Set(allCurrencies)];
    const currenciesOptionsFake = getOptions(uniqueCurrencies, countryCurrency, 3);
    
    // 3. Set the correct currency in the options array and shuffle it
    currenciesOptionsFake.push(countryCurrency);
    const currenciesOptions = shuffleArray(currenciesOptionsFake);
          
    return {
        title: `What currency ${countryObject.name.common} use?`,
        answers: currenciesOptions,
        correct: currenciesOptions.indexOf(countryCurrency),
        selected: undefined
    }
}