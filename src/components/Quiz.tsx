import { useState, useEffect } from "react";
import type { Ask } from "../interfaces/ask";

import { getRandomArrayElement } from '../lib/helpers';
import { buildCurrencyQuestion } from '../lib/currencySection';
import { buildCapitalQuestion } from '../lib/capitalSection';
import { buildRegionQuestion } from '../lib/regionSection';
import Question from "./Question";



function Quiz() {
  // const [about, setAbout] = useState<string>('');
  const [questions, setQuestions] = useState<Ask[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);

  const addQuestion = (newQuestion: Ask) => {
    setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
  };

  useEffect(() => {
    // Fetch quiz questions from the API
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
  }, []);

  type HandleAnswerFunction = (questionIndex: number, answerIndex: number) => void;
  const handleAnswer:HandleAnswerFunction = (questionIndex, answerIndex) => {
    // Update user's answer for the current question
    const newAnswers = [...userAnswers]; // Crea una copia del array actual
    newAnswers[questionIndex] = answerIndex; // Actualiza la respuesta en la posición correcta
    setUserAnswers(newAnswers);

    const newQuestions = [...questions];
    const questionToUpdate = { ...newQuestions[questionIndex] };
    questionToUpdate.selected = answerIndex;
    newQuestions[questionIndex] = questionToUpdate;
    setQuestions(newQuestions);
  };

  const handleNextQuestion = () => {
    // Move to the next question
    if(questions.length >= currentQuestion + 1)
    {
      setCurrentQuestion(currentQuestion + 1 )
    }
  };

  const handlePrevQuestion = () => {
    // Move to the previous question
    if(currentQuestion - 1 <= 0)
    {
      setCurrentQuestion(currentQuestion - 1 )
    }
  };

  const handleFinishQuiz = () => {
    // Calculate the quiz result and show the result page
    const total = questions.length + 1;
    let success = 0;
    questions.map((a:Ask) => {
      if (a.correct === a.selected)
        success++;
    });
    console.log(`Total scocre ${success}/${total}`);
    setShowResult(true);
    
  };

  return 
    <div className="quiz">
      <p>
        Current question {currentQuestion}
      </p>
      <p>
        User answers {userAnswers}
      </p>
      <p>
        showResult {showResult}
      </p>
        {(questions.length > 0) &&
          questions.map((q:Ask, i:number) => (
            <Question key={q.id} question={q} userAnswer={userAnswers[i]} handleAnswer={handleAnswer}/>
          ))
        }
    </div>;
}

export default Quiz;