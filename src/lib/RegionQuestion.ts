import Question from "./Question";

export default class RegionQuestion extends Question {
    constructor(country, continent) {
      super(country);
      this.continent = continent; // Podría ser una descripción más detallada de la ubicación
    }
  
    getQuestionText() {
      return `¿Dónde se encuentra ${this.country}?`;
    }
  
    getCorrectAnswer() {
      return this.continent;
    }
  }