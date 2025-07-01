import type { Ask } from "../interfaces/ask";

function Option({color='bg-yellow', text} : {color:string, text:string}){
 return (
  <button className={`w-full sm:w-1/2 lg:w-1/4 btn p-4 ${color}`} >
    {text}
  </button>
 )
}

function Question({ question, userAnswer}:
  { question:Ask, userAnswer:number}) {
  return <div className="question container w-full">
      <div>
        <p className="text-center"> {question.title} </p>
        <div className="flex flex-wrap">
          {
            question.answers.map((e:string, i:number) => {
              const optionKey = `${question.id}-${i}`;
              let color = 'bg-blue';
              if (userAnswer === question.correct){ color = 'bg-green';}
                
              return (<Option key={optionKey} color={color} text={e}/>)
            })
          }
        </div>
      </div>
    </div>;
}

export default Question;