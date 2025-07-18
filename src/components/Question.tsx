import type { Ask } from "../interfaces/ask";
import ok from "/check_round_fill.svg";
import ko from "/close_round_fill.svg";

function Question({ question, index, userAnswer, handleAnswer}:
  { question:Ask, index:number, userAnswer:(number|undefined)[], 
    handleAnswer:(questionIndex: number, answerIndex: number) => void}) {
  
  return( 
    <div className="question w-full">
      <div>
        <p className="text-center mb-5 font-extrabold text-xl"> {question.title} </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 align-center justify-center mx-auto">
          {
            question.answers.map((e:string, i:number) => {
              const optionKey = `${question.id}-${i}`;
              let color = '';
              if (userAnswer[index] === question.correct && i === userAnswer[index]){ color = 'btn-bg'; }
                
              return (
                <button key={optionKey} className={`btn ${color}`} 
                  onClick={()=> { handleAnswer(index, i); }} >
                  <span>{e}</span>
                  {
                    (userAnswer[index] === question.correct && i === userAnswer[index]) &&
                      <span><img src={ok} title="Answer incorrect"/></span> 
                  }
                  {
                    (userAnswer[index] !== question.correct && i === userAnswer[index]) &&
                      <span><img src={ko} title="Answer incorrect"/></span> 
                  }
                </button>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Question;