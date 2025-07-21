
import type { Ask } from '../interfaces/ask';

import CapitalQuestion from './CapitalQuestion';
import RegionQuestion from './RegionQuestion';
import CurrencyQuestion from './CurrencyQuestion';

class QuestionFactory {
  static createQuestion(type: string, countryObject:unknown, options:string[]):Ask {

    switch (type) {
      case 'capital':
        return new CapitalQuestion(countryObject, options);
      case 'region':
        return new RegionQuestion(countryObject, options);
      case 'currency':
        return new CurrencyQuestion(countryObject, options);
      default:
        throw new Error(`Unkown question type: ${type}`);
    }
  }
}

export default QuestionFactory;