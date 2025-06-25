// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useEffect, useState } from 'react'
import './App.css'
import type { CurrenciesObject, CurrencyDetail } from './interfaces/country';
import type { Question } from "./interfaces/question";
import { getOptions, getRandomArrayElement, shuffleArray } from './lib/helpers';


function App() {
  const [questions, setQuestions] = useState<Question[]>([]);


  // https://restcountries.com/
  // https://restcountries.com/v3.1/name/spain
  // https://restcountries.com/v3.1/all?&fields=languages,capital,name,currencies,region,population,flags,cca2,cioc,timezones
  
  useEffect(()=>{
    fetch('https://restcountries.com/v3.1/all?&fields=languages,capital,name,currencies,region,population,flags,cca2,borders,timezones')
    .then(res => res.json())
    .then((res) => { 
      // const filteredWithCioc = res.filter((e) => {
      //   return e.cioc;
      // })
      // setQuestions(filteredWithCioc) 
      // setQuestions(res);

      const addQuestion = (newQuestion: Question) => {
        setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
      };

      // 0. Get the Ramdom Country
      const randomCountryObject = getRandomArrayElement(res);
      
      /* Currency section */

      // 1. Get country currency
      // const countryCurrency = Object.values(randomCountryObject.currencies)[0].name;

      // 2. Get 3 ramdon currencies but not the correct one
      // const allCurrencies:string[] = [];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // res.map((e:any) => {
      //     const currenciesObject: CurrenciesObject = e.currencies;
      //     if (Object.keys(currenciesObject).length > 0) {
      //         const namesPotentiallyNested = Object.values(currenciesObject).map((currency:CurrencyDetail) => currency.name);
      //         const allNamesFlat = namesPotentiallyNested.flat(Infinity);
      //         allCurrencies.push(...allNamesFlat);
      //     }
      // });
      // Delete repeated currencies names
      // const uniqueCurrencies = [...new Set(allCurrencies)];
      // const currenciesOptionsFake = getOptions(uniqueCurrencies, countryCurrency, 3);

      // 3. Set the correct currency in the options array and shuffle it
      // currenciesOptionsFake.push(countryCurrency);
      // const currenciesOptions = shuffleArray(currenciesOptionsFake);
      
      // 4. Build the question object
      // const currencyQuestion = {
      //   title: `What currency ${randomCountryObject.name.common} use?`,
      //   answers: currenciesOptions,
      //   correct: currenciesOptions.indexOf(countryCurrency),
      //   selected: undefined
      // }
      const currencyQuestion = buildCurrencyQuestion(randomCountryObject,res);
      addQuestion(currencyQuestion);
      
    })
    .catch(() => console.log('Something goes wrong with the API'));

    return () => {
      setQuestions([]);
    }
  },[]); //There is no dependencies because only needs one fetch

  return (
    <>
      <div className='mx-auto max-w-3xl px-2'>

        <h1 className='text-primary mb-3'>Ejemplo</h1>
        { /*(questions.length > 0) &&
          questions.map((q: any) => {
            // if (!q.cioc) return <p>{q.name.common} no tiene cioc</p>
            return (
              <p key={q.name.common.replace(/\s/g, '')}>{q.name.common}</p>
            )
          })
        */}
        
        <a className='btn btn-bg'>
          Respuesta
        </a>
      </div>
    </>
  )
}

export default App
