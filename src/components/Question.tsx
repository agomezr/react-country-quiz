import type { Ask } from "../interfaces/ask";

function Question({ question, index, userAnswer, handleAnswer}:
  { question:Ask, index:number, userAnswer:number|undefined, handleAnswer:(questionIndex: number, answerIndex: number) => void}) {
  return <div className="question container mx-auto">
      <div>
        <p className="text-center mb-3 font-extrabold"> {question.title} </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 align-center justify-center max-w-lg mx-auto">
          {
            question.answers.map((e:string, i:number) => {
              const optionKey = `${question.id}-${i}`;
              let color = 'bg-blue-500';
              if (userAnswer === question.correct && i === userAnswer){ color = 'bg-green-500'; }
                
              return (
                <button key={optionKey} className={`btn ${color}`} 
                  onClick={()=> {
                    if (userAnswer !== undefined){
                      console.log('Llamada a handleAnswer');
                      handleAnswer(index, i);
                    } else {
                      console.log('Pregunta ya respondida');
                    }
                    }} >
                  {e}
                </button>
              )
            })
          }
        </div>
      </div>
    </div>;
}

export default Question;