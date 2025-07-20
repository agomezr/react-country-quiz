import CapitalQuestion from './CapitalQuestion';
import RegionQuestion from './RegionQuestion';
import CurrencyQuestion from './CurrencyQuestion';

class QuestionFactory {
  static createQuestion(type, countryData) {
    const { country, capital, continent, currency } = countryData;

    switch (type) {
      case 'capital':
        return new CapitalQuestion(country, capital);
      case 'region':
        return new RegionQuestion(country, continent);
      case 'currency':
        return new CurrencyQuestion(country, currency);
      default:
        throw new Error(`Unkown question type: ${type}`);
    }
  }
}

export default QuestionFactory;