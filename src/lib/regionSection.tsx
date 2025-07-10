/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Ask } from "../interfaces/ask";
import { getOptions, shuffleArray } from "./helpers";

export function buildRegionQuestion(countryObject:any, allCountries:any):Ask{

    // 1. Get country region
    const countryRegion = countryObject.region;

    // 2. Get 3 ramdon region but not the correct one
    
    const uniqueRegionsSet = new Set();
    allCountries.forEach((country: { region: string; }) => {
        if (country.region) {
            uniqueRegionsSet.add(country.region);
        }
    });
    const allRegions= Array.from(uniqueRegionsSet) as string[];
    
    const regionsOptionsFake = getOptions(allRegions, countryRegion, 3);
    
    // 3. Set the correct currency in the options array and shuffle it
    regionsOptionsFake.push(countryRegion);
    const regionOptions = shuffleArray(regionsOptionsFake);
          
    return {
        id: 'region-question',
        title: `Where is ${countryObject.name.common}?`,
        answers: regionOptions,
        correct: regionOptions.indexOf(countryRegion),
        selected: undefined
    }
}