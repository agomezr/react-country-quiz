import Question from "./Question";

export default class CapitalQuestion extends Question {

  constructor(countryObject:any, allOptions: string[]) {
    super(
      'capital-question', 
      `What is the capital of ${countryObject.name.common}?`,
      allOptions,
      countryObject.capital[0]
    );      
    
  }

}