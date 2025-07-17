import { useState, useEffect } from "react";
import type { Ask } from "../interfaces/ask";

// import res from '../data/result.json';
import '../App.css';

import { getRandomArrayElement } from '../lib/helpers';
import { buildCurrencyQuestion } from '../lib/currencySection';
import { buildCapitalQuestion } from '../lib/capitalSection';
import { buildRegionQuestion } from '../lib/regionSection';
import Question from "./Question";
import Modal from "./Modal";
import loadingGif from "/loading.gif";

interface ApiError {
  message: string;
  code?: number; // Error code optional
}

function Score({partial, total}:{partial:number|undefined, total:number|undefined}){
  const scorePartial = (partial === undefined)? 0 : partial;
  const scoreTotal = (total === undefined)? 0 : total;
  return(
    <div className="btn-bg px-5 py-2 rounded-4xl text-sm font-semibold">
      <div className="flex flex-row items-center justify-center gap-1">
        <span>{scorePartial}</span> / 
        <span>{scoreTotal}</span>
        <span className="ms-2">Points</span>
      </div>
    </div>
  )
}

function Quiz() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | ApiError | null>(null);
  const [score, setScore] = useState<number>(0);
  const [attempt, setAttempt] = useState<number>(1);

  const [questions, setQuestions] = useState<Ask[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<(number|undefined)[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);

  // const addQuestion = (newQuestion: Ask) => {
  //   setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
  // };

  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://restcountries.com/v3.1/all?&fields=languages,capital,name,currencies,region,population,flags,borders,timezones');

        if (!response.ok) {
          let errorData: ApiError | Error;
          try {
            errorData = await response.json() as ApiError;
            if (!errorData.message) {
              errorData = new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }
          } catch {
            errorData = new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
          }
          throw errorData; 
        }

        const res = await response.json(); 

        // 0. Get the Ramdom Country
        const randomCountryObject = getRandomArrayElement(res);
        const buildsQuestions:Ask[] = [];
      
        /* Currency section */
        const currencyQuestion = buildCurrencyQuestion(randomCountryObject, res);
        buildsQuestions.push(currencyQuestion);

        /* Capital section */
        const capitalQuestion = buildCapitalQuestion(randomCountryObject, res);
        buildsQuestions.push(capitalQuestion);

        /* Region section */
        const regionQuestion = buildRegionQuestion(randomCountryObject, res);
        buildsQuestions.push(regionQuestion);

        setQuestions(buildsQuestions);
        setUserAnswers(new Array(buildsQuestions.length).fill(undefined));

      } catch (err: unknown) { 
        console.error("Error fetching data:", err);
        if (err instanceof Error) {
          setError(err);
        } else if (typeof err === 'object' && err !== null && 'message' in err) {
          setError(err as ApiError); 
        } else {
          setError(new Error('An unknown error occurred.'));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    /*
    // Remember uncomment the res import at the start of this file
    const fetchLocalData = () =>{
      const randomCountryObject = getRandomArrayElement(res);
      const buildsQuestions:Ask[] = [];
    
      // Currency section 
      const currencyQuestion = buildCurrencyQuestion(randomCountryObject, res);
      buildsQuestions.push(currencyQuestion);

      // Capital section 
      const capitalQuestion = buildCapitalQuestion(randomCountryObject, res);
      buildsQuestions.push(capitalQuestion);

      // Region section 
      const regionQuestion = buildRegionQuestion(randomCountryObject, res);
      buildsQuestions.push(regionQuestion);

      //... Other cuestions

      setQuestions(buildsQuestions);
      setUserAnswers(new Array(buildsQuestions.length).fill(undefined));
      setLoading(false);
    };
    */

    // fetchLocalData();

    return (()=> { // Clean states on destroy
      setLoading(true);
      setQuestions([]);
      setUserAnswers([]);
      setCurrentQuestion(0);
      setScore(0);
    });

  },[attempt]);

  type HandleAnswerFunction = (questionIndex: number, answerIndex: number) => void;
  const handleAnswer:HandleAnswerFunction = (questionIndex, answerIndex) => {
    // Update user's answer for the current question
    const newAnswers = [...userAnswers]; 
    newAnswers[questionIndex] = answerIndex; 
    setUserAnswers(newAnswers);

    let progress = 0;
    newAnswers.forEach( (i,index) => {
      if(questions[index].correct === i){ progress++; }
    });
    setScore(progress);
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
    // If the user has play all the questions
    if (userAnswers.every(answer => answer !== undefined)){
      setShowResult(true);
    }
    
  };

  const handleCloseModal = () => {
    setShowResult(false); 
  };

  if (loading) {
    return (
        <div className="wrapper md:w-2xl mx-auto">
          <div className="bg-gray-dark rounded-xl px-4 py-8 w-full text-center">
            <img src={loadingGif} alt="Loading Gif" className="mx-auto" />
            <p>Loading Quiz .... Please, wait a bit.</p>
          </div>
        </div>
    );
  }

   if (error) {
    return (
      <div>
        <div className="wrapper md:w-2xl mx-auto">
          <div className="bg-gray-dark rounded-xl px-4 py-8 w-full text-center">
            <p>Somethig goes wrong. Sorry.</p>
            <p>{error.message}</p> 
            <button className="btn btn-bg" title="Retry" onClick={() => window.location.reload()}>Retry!</button>
          </div>
        </div>
      </div>
    );
  }

  return ( 
  <>

    <div className="wrapper md:w-2xl mx-auto">

      <div className="flex flex-row w-full items-center justify-between mb-5">
        <span className="text-white font-bold text-2xl">Country Quiz</span>
        <Score partial={score} total={userAnswers.length}/>
      </div>

      <div className="bg-gray-dark rounded-xl px-4 py-8 w-full">
      
        <div className="bullets mb-4">
          {userAnswers.map( (i,index) => {
            let active = '';
            if ( i !== undefined ){
              active = 'btn-bg';
            }
            if ( currentQuestion === index ){
              active = 'btn-bg shadow-2xl ring';
            }
            return (
              <span className={`btn font-bold ${active} `} onClick={() => setCurrentQuestion(index)}>{index +1}</span>
            )
          })}
        </div>
        {/* Use IIFE (Immediate Invoked Function Expression) to debug */}
        {(() => {
          // console.log(userAnswers);
          return null; 
        })()} 

        <div className="section-group">
          {(questions.length > 0) &&
            questions.map((q:Ask, i:number) => {
              let active = '';
              if (currentQuestion === i) { active = 'active' }
              return (
                <section key={q.id} className={`${active} w-full`}>
                  <Question question={q} index={i} userAnswer={userAnswers} handleAnswer={handleAnswer} />
                </section>
              )
            })
          }
        </div>

        <div className="flex flex-row align-center justify-around mb-5">
          <div className="btn btn-sm" onClick={() => handlePrevQuestion()} 
          style={(currentQuestion === 0)? { opacity: 0.1, cursor: 'not-allowed' } : {opacity: 1}}>
            {'<'} Prev
          </div>
          <div className="btn btn-sm" onClick={() => handleNextQuestion()}
            style={(currentQuestion === questions.length-1 )? { opacity: 0.1, cursor: 'not-allowed' } : {opacity: 1}}>
              Next {'>'}
          </div>
        </div>

        <button className="btn w-2/5 mx-auto mb-3 " onClick={() => handleFinishQuiz()}
        style={(userAnswers.every(answer => answer !== undefined))? {opacity: 1}: { opacity: 0.1, cursor: 'not-allowed' } }>
          Finish!
        </button>

      </div>

      <div className="text-end text-sm opacity-25 w-full">Games: {attempt}</div>
      <div className="btn btn-bg my-4 mb-3 mx-auto" onClick={() => setAttempt(attempt+1)}>New Game</div>

    </div>

    <Modal show={showResult} onClose={handleCloseModal}>
      <h2 className="font-bold text-3xl">Congrats!</h2>
      <p className="font-bold text-xl mb-3">You completed the quiz</p>
      <p className="mb-6">You answer {score} / {questions.length} correctly</p>
      <div className="btn btn-bg font-black mx-3" onClick={() => {setAttempt(attempt+1); setShowResult(false);}}>Play again!</div>
    </Modal>
  </>
      
  );
}

export default Quiz;