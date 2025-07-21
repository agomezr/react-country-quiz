import type { Ask } from "../interfaces/ask";
import { getOptions, shuffleArray } from "./helpers";

export default class Question  implements Ask {

  id: string;
  title: string;
  answers: string[];
  correct: number;

  constructor(id:string, title:string, allOptions: string[], trueOption:string) {
    
    this.id = id;
    this.title = title;

    // Get 3 fake options
    const questionFakeOptions = getOptions(allOptions, trueOption, 3);
    // Set the true option in the options array and shuffle it
    questionFakeOptions.push(trueOption);
    
    this.answers = shuffleArray(questionFakeOptions);
    this.correct = this.answers.indexOf(trueOption);
  }
  
    
  }