import { useState, useEffect } from "react";
import type { Ask } from "../interfaces/ask";

import res from '../data/result.json';
import '../App.css';

import { getRandomArrayElement } from '../lib/helpers';
import { buildCurrencyQuestion } from '../lib/currencySection';
import { buildCapitalQuestion } from '../lib/capitalSection';
import { buildRegionQuestion } from '../lib/regionSection';
import Question from "./Question";

function Quiz() {
  // const [about, setAbout] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const [questions, setQuestions] = useState<Ask[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<(number|undefined)[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);


  // const addQuestion = (newQuestion: Ask) => {
  //   setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
  // };

  useEffect(() => {
    
    const randomCountryObject = getRandomArrayElement(res);
    const buildsQuestions:Ask[] = [];
  
    /* Currency section */
    const currencyQuestion = buildCurrencyQuestion(randomCountryObject, res);
    console.log(currencyQuestion);
    buildsQuestions.push(currencyQuestion);

    /* Capital section */
    const capitalQuestion = buildCapitalQuestion(randomCountryObject, res);
    console.log(capitalQuestion);
    buildsQuestions.push(capitalQuestion);

    /* Region section */
    const regionQuestion = buildRegionQuestion(randomCountryObject, res);
    console.log(regionQuestion);
    buildsQuestions.push(regionQuestion);

    setQuestions(buildsQuestions);
    setUserAnswers(new Array(buildsQuestions.length).fill(undefined));
    setLoading(false);


    return (()=> {
      setLoading(true);
      setQuestions([]);
      setUserAnswers([]);
      setCurrentQuestion(0);
    });
    // Fetch quiz questions from the API
    // fetch('https://restcountries.com/v3.1/all?&fields=languages,capital,name,currencies,region,population,flags,borders,timezones')
    // .then(res => res.json())
    // .then((res) => { 
    //   // 0. Get the Ramdom Country
    //   const randomCountryObject = getRandomArrayElement(res);
    //   const buildsQuestions:Ask[] = [];
      
    //   /* Currency section */
    //   const currencyQuestion = buildCurrencyQuestion(randomCountryObject, res);
    //   buildsQuestions.push(currencyQuestion);
    //   // addQuestion(currencyQuestion);

    //   /* Capital section */
    //   const capitalQuestion = buildCapitalQuestion(randomCountryObject, res);
    //   buildsQuestions.push(capitalQuestion);
    //   // addQuestion(capitalQuestion);

    //   /* Region section */
    //   const regionQuestion = buildRegionQuestion(randomCountryObject, res);
    //   buildsQuestions.push(regionQuestion);
    //   // addQuestion(regionQuestion);

    //   setQuestions(buildsQuestions);
    //   setUserAnswers(new Array(buildsQuestions.length+1).fill(undefined));

    // })
    // .catch(() => console.log('Something goes wrong with the API'));

  },[]);

  type HandleAnswerFunction = (questionIndex: number, answerIndex: number) => void;
  const handleAnswer:HandleAnswerFunction = (questionIndex, answerIndex) => {
    // Update user's answer for the current question
    const newAnswers = [...userAnswers]; 
    newAnswers[questionIndex] = answerIndex; 
    setUserAnswers(newAnswers);

    const newQuestions = [...questions];
    const questionToUpdate = { ...newQuestions[questionIndex] };
    questionToUpdate.selected = answerIndex;
    newQuestions[questionIndex] = questionToUpdate;
    setQuestions(newQuestions);
  };

  const handleNextQuestion = () => {
    // Move to the next question
    if(currentQuestion + 1 < questions.length )
    {
      setCurrentQuestion(currentQuestion + 1 )
    }
  };

  const handlePrevQuestion = () => {
    // Move to the previous question
    if(currentQuestion - 1 >= 0)
    {
      setCurrentQuestion(currentQuestion - 1 )
    }
  };

  const handleFinishQuiz = () => {
    // Calculate the quiz result and show the result page
    const total = questions.length;
    let success = 0;
    questions.map((a:Ask) => {
      if (a.correct === a.selected)
        success++;
    });
    console.log(`Total scocre ${success}/${total}`);
    setShowResult(true);
    
  };

  if (loading) {
    return (
      <div className="quiz">
        <div className="w-full h-full mx-auto md:w-2xl p-3">
          <p>Cargando preguntas...</p>
          <button className="btn" onClick={()=> {setLoading(false)}}>Quitar loading.</button>
        </div>
      </div>
    );
  }
  if (questions.length === 0) {
    return (
      <div className="quiz">
        <p>No hay preguntas disponibles. ¡Prueba a cargar algunas!</p>
      </div>
    )
  }

  return ( 
    <div className="quiz">
      <p>
        Current question {currentQuestion}
      </p>
      {/* Usando una IIFE para ejecutar sentencias */}
      {(() => {
        console.log('questions (dentro del JSX con IIFE)');
        console.log(questions);
        console.log(userAnswers);
        return null; // Opcional: devuelve null si no quieres renderizar nada
      })()}
      <div>
       User answers 
      {
        userAnswers.map((e:number|undefined, i:number) => {
          return <p key={i}>index: {i.toString()}, value: {e?.toString()}</p>
        })
      } 
      </div>

      <div>
        {(questions.length > 0) &&
          questions.map((q:Ask, i:number) => {
            let active = '';
            if (currentQuestion === i) { active = 'active' }
            return (
              <section key={q.id} className={active}>
                <Question question={q} index={i} userAnswer={userAnswers} handleAnswer={handleAnswer} />
              </section>
            )
          })
        }
      </div>
        <div className="flex flex-row align-center justify-around">
          <div className="btn" onClick={() => handlePrevQuestion()}>Prev</div>
          <div className="btn" onClick={() => handleNextQuestion()}>Next</div>
        </div>
        <div className="btn mb-3" onClick={() => handleFinishQuiz()}>Finish!</div>
    </div>
  );
}

export default Quiz;