// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useEffect, useState } from 'react'
import './App.css'
import type { Question } from "./interfaces/question";
import { getRandomArrayElement } from './lib/helpers';
import { buildCurrencyQuestion } from './lib/currencySection';
import { buildCapitalQuestion } from './lib/capitalSection';
import { buildRegionQuestion } from './lib/regionSection';


function App() {
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = (newQuestion: Question) => {
      setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
    };
  // https://restcountries.com/
  // https://restcountries.com/v3.1/name/spain
  // https://restcountries.com/v3.1/all?&fields=languages,capital,name,currencies,region,population,flags,cca2,cioc,timezones
  
  useEffect(()=>{
    fetch('https://restcountries.com/v3.1/all?&fields=languages,capital,name,currencies,region,population,flags,cca2,borders,timezones')
    .then(res => res.json())
    .then((res) => { 
  
      // 0. Get the Ramdom Country
      const randomCountryObject = getRandomArrayElement(res);
      
      /* Currency section */
      const currencyQuestion = buildCurrencyQuestion(randomCountryObject, res);
      addQuestion(currencyQuestion);

      /* Capital section */
      const capitalQuestion = buildCapitalQuestion(randomCountryObject, res);
      addQuestion(capitalQuestion);

      /* Region section */
      const regionQuestion = buildRegionQuestion(randomCountryObject, res);
      addQuestion(regionQuestion);

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
        <div >
        { (questions.length > 0) &&
          questions.map((q: Question) => {
            
            return (
              <div key={q.title.replace(/\s/g, '')} className='mb-3'>
              <p>{q.title}</p>
              <ul className='list-group'>
                {
                  q.answers.map((item) => {
                    return(<li key={item.replace(/\s/g, '')} className='list-item'>{item}</li>)
                  })
                }
              </ul>
              <p>Correct position: {q.correct}</p>
              </div>
            )
          })
          
        
        }
        </div>
        <a className='btn btn-bg'>
          Respuesta
        </a>
      </div>
    </>
  )
}

export default App
