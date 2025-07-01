function Congratulations({ correctAnswers, totalQuestions, handlePlayAgain }:
  { correctAnswers:number, totalQuestions:number, handlePlayAgain:()=> void }

) {
  return (
    <div className="congratulations">
      {/* Render congratulations message and result */}
      <p>{correctAnswers.toString()}</p>
      <p>{totalQuestions.toString()}</p>
      <p className="btn" onClick={()=> handlePlayAgain()}>Jugar otra vez</p>
    </div>
  );
}

export default Congratulations;