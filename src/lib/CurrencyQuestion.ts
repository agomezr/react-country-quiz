import type { CurrenciesList } from "../interfaces/country";
import Question from "./Question";

export default class CurrencyQuestion extends Question {
  constructor(countryObject:any, allOptions: string[]) {
    
    const countryCurrency = Object.values(countryObject.currencies as CurrenciesList)[0].name;

    super(
      'currency-question', 
      `What currency ${countryObject.name.common} use?`,
      allOptions,
      countryCurrency
    );      
    
  }
  }