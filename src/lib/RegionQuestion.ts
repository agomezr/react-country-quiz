import Question from "./Question";

export default class RegionQuestion extends Question {
  constructor(countryObject:any, allOptions: string[]) {

    super(
      'region-question', 
      `Where is ${countryObject.name.common}?`,
      allOptions,
      countryObject.region
    );      
    
  }
}