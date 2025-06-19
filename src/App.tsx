// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [questions, setQuestions] = useState<any[]>([]);


  // https://restcountries.com/
  // https://restcountries.com/v3.1/name/spain
  // https://restcountries.com/v3.1/all?&fields=languages,capital,name,currencies,region,population,flags,cca2,cioc,timezones
  useEffect(()=>{
    fetch('https://restcountries.com/v3.1/all?&fields=languages,capital,name,currencies,region,population,flags,cca2,cioc,timezones')
    .then(res => res.json())
    .then((res) => { 
      const filteredWithCioc = res.filter((e) => {
        return e.cioc;
      })
      setQuestions(filteredWithCioc) 
    })
    .catch(() => console.log('Something goes wrong with the API'));

    return () => {
      setQuestions([]);
    }
  },
[]);

  return (
    <>
      <div className='mx-auto max-w-3xl px-2'>

        <h1 className='text-primary mb-3'>Ejemplo</h1>
        { (questions.length > 0) &&
          questions.map((q: any) => {
            // if (!q.cioc) return <p>{q.name.common} no tiene cioc</p>
            return (
              <p key={q.cioc}>{q.name.common}</p>
            )
          })
        }
        <a className='btn btn-bg'>
          Respuesta
        </a>
      </div>
    </>
  )
}

export default App
