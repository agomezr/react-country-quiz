export interface Question {
  title: string,
  answers: string[],
  correct: number,
  selected: number | undefined
}