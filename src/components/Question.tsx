import type { SyntheticEvent } from "react";
import type { Ask } from "../interfaces/ask";

function Question({ question, userAnswer, handleAnswer }:
  { question:Ask, userAnswer:number, handleAnswer:SyntheticEvent}) {
  return <div className="question container w-full">
      <div>
        <p className="text-center"> {question.title} </p>
        <div className="flex flex-wrap">
          {
            question.answers.map((e:string) => {
              return <div className="w-full sm:w-1/2 lg:w-1/4 p-4" onClick={handleAnswer}>{e}</div>
            })
          }
        </div>
      </div>
    </div>;
}

export default Question;