interface IMatchReq {
  homeTeam: number, // O valor deve ser o id do time
  awayTeam: number, // O valor deve ser o id do time
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: true // a partida deve ser criada como em progresso
}

export default IMatchReq;
