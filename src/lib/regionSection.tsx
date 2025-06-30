/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Ask } from "../interfaces/ask";
import { getOptions, shuffleArray } from "./helpers";

export function buildRegionQuestion(countryObject:any, allCountries:any):Ask{

    // 1. Get country region
    const countryRegion = countryObject.region;

    // 2. Get 3 ramdon currencies but not the correct one
    const allRegions:string[] = [];
    
    allCountries.map((e:any) => {
        if (!allRegions.includes(countryRegion)) {
            allRegions.push(e.region);
        }
    });
    
    const regionsOptionsFake = getOptions(allRegions, countryRegion, 3);
    
    // 3. Set the correct currency in the options array and shuffle it
    regionsOptionsFake.push(countryRegion);
    const regionOptions = shuffleArray(regionsOptionsFake);
          
    return {
        id: 'region',
        title: `Where is ${countryObject.name.common}?`,
        answers: regionOptions,
        correct: regionOptions.indexOf(countryRegion),
        selected: undefined
    }
}