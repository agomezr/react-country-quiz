export interface Question {
  title: string,
  answers: [string, string, string, string],
  correct: number,
  selected: number | undefined
}