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

export interface IMatchsDT02 {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  homeClub: {
    clubName: string
  },
  awayClub: {
    clubName: string
  }
}

export interface ISequelizeValuesDTO<T> {
  desconnhecido: string,
  dataValues:T
}
