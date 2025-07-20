import Question from "./Question";

export default class CurrencyQuestion extends Question {
    constructor(country, currency) {
      super(country);
      this.currency = currency;
    }
  
    getQuestionText() {
      return `¿Cuál es la capital de ${this.country}?`;
    }
  
    getCorrectAnswer() {
      return this.capital;
    }
  }