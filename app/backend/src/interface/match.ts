export default interface ICreateMatchDTO{
  homeTeam: number, // O valor deve ser o id do time
  awayTeam: number, // O valor deve ser o id do time
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean // a partida deve ser criada como em progresso
}
export interface Gols{
  homeTeamGoals: number,
  awayTeamGoals: number,
}
