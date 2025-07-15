/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Ask } from "../interfaces/ask";
import { getOptions, shuffleArray } from "./helpers";

export function buildCapitalQuestion(countryObject:any, allCountries:any):Ask{

    // 1. Get country capital
    const countryCapital = countryObject.capital[0];

    // 2. Get 3 ramdon capitals but not the correct one
    
    const allCapitals = allCountries.map((e:any) => { 
        return e.capital[0];
    });

    const capitalsOptionsFake = getOptions(allCapitals, countryCapital, 3);
    
    // 3. Set the correct capital in the options array and shuffle it
    capitalsOptionsFake.push(countryCapital);
    const capitalsOptions = shuffleArray(capitalsOptionsFake);
          
    return {
        id: 'capital-question',
        title: `What ${countryObject.name.common} capital is?`,
        answers: capitalsOptions,
        correct: capitalsOptions.indexOf(countryCapital)
    }
}