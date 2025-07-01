/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CurrenciesList, CurrenciesObject, CurrencyDetail } from "../interfaces/country";
import type { Ask } from "../interfaces/ask";
import { getOptions, shuffleArray } from "./helpers";

export function buildCurrencyQuestion(countryObject:any, allCountries:any):Ask{

    // 1. Get country currency
    const countryCurrency = Object.values(countryObject.currencies as CurrenciesList)[0].name;

    // 2. Get 3 ramdon currencies but not the correct one
    const allCurrencies:string[] = [];
    
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
        id: 'currency-question',
        title: `What currency ${countryObject.name.common} use?`,
        answers: currenciesOptions,
        correct: currenciesOptions.indexOf(countryCurrency),
        selected: undefined
    }
}