export default class Question {
    constructor(country) {
      this.country = country;
    }
  
    getQuestionText() {
      throw new Error("The method 'getQuestionText()' must be implemented on subclases.");
    }
  
    
  }