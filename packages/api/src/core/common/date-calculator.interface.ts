export interface DateCalculator {
  // pego a diferença entre as datas e converto em segundos se for menor que 86400 é false
  // o aluno ou professor não poderá remarcar a aula
  lessThanTwentyFourHours(date: number): boolean
}
