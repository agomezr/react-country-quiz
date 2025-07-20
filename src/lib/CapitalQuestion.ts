import Question from "./Question";

export default class CapitalQuestion extends Question {
    constructor(country, capital) {
      super(country);
      this.capital = capital;
    }
  
    getQuestionText() {
      return `¿Cuál es la capital de ${this.country}?`;
    }
  
    getCorrectAnswer() {
      return this.capital;
    }
  }