import type { Ask } from "../interfaces/ask";

function Question({ question, userAnswer}:
  { question:Ask, userAnswer:number}) {
  return <div className="question container w-full">
      <div>
        <p className="text-center"> {question.title} </p>
        <div className="flex flex-wrap">
          {
            question.answers.map((e:string) => {
              
              let color = 'bg-blue';
              if (userAnswer === question.correct){ color = 'bg-green';}
                
              return (<button className={`w-full sm:w-1/2 lg:w-1/4 btn p-4 ${color}`} >
                      {e}
                    </button>)
            })
          }
        </div>
      </div>
    </div>;
}

export default Question;