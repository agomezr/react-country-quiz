// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useEffect, useState } from 'react'
import './App.css'
import type { CurrenciesObject, CurrencyDetail } from './interfaces/country';


function App() {
  const [questions, setQuestions] = useState<any[]>([]);


  function getRandomArrayElement<T>(arr: T[]): T | undefined {
    if (arr.length === 0) {
      return undefined; // Or throw an error, or return null, depending on desired behavior for empty arrays
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

/*
  allOptions: array of al string options
  toDelete: the string or option that must be excluded for the result
  amount: the length of the return array
*/
  function getOptions(allOptions:string[], toDelete:string, amount:number = 3){
    const options:string[] = [];
    do {
      const randomIndex = Math.floor(Math.random() * allOptions.length);
      if (!options.includes(allOptions[randomIndex]) && allOptions[randomIndex] !== toDelete){
        options.push(allOptions[randomIndex]);
      }
    } while (options.length < amount);
    return options;
  }

  function shuffleArray(arr:string[]) {

  const shuffleResult = [...arr];

  for (let i = shuffleResult.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));
    [shuffleResult[i], shuffleResult[j]] = [shuffleResult[j], shuffleResult[i]];

  }

  return shuffleResult;
}

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
      setQuestions(res);


      // Currency options
      const allCurrencies:string[] = [];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      res.map((e:any) => {
          const currenciesObject: CurrenciesObject = e.currencies;
          if (Object.keys(currenciesObject).length > 0) {
              const namesPotentiallyNested = Object.values(currenciesObject).map((currency:CurrencyDetail) => currency.name);
              const allNamesFlat = namesPotentiallyNested.flat(Infinity);
              allCurrencies.push(...allNamesFlat);
          }
      });

      // Delete repeated currencies names
      const uniqueCurrencies = [...new Set(allCurrencies)];

      // console.log(uniqueCurrencies);
      // 1. Get the Ramdom Country
      const randomCountryObject = getRandomArrayElement(res);
      
      // 2. Get country currency
      const countryCurrency = randomCountryObject.currencies[0].name;

      // 3. Get 3 ramdon currencies but not the correct one
      let currenciesOptionsFake = getOptions(uniqueCurrencies, countryCurrency, 3);

      // 4. Set the correct currency in the options array and shuffle it
      currenciesOptionsFake.push(countryCurrency);
      const currenciesOptions = shuffleArray(currenciesOptionsFake);
      // 7. Get the correct anwer position and set it to the question object
      
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
