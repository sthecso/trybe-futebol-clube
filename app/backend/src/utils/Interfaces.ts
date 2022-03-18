export interface User {
  id: number,
  username: string,
  role: string,
  email: string,
}

export interface UserWithPassword extends User {
  password: string,
}

export interface LoginReturn {
  user: User,
  token: string
}

export interface TokenReturn {
  data: UserWithPassword,
  iat: number,
  exp: number,
}

export interface Match extends MatchData {
  homeClub: ClubName,
  awayClub: ClubName
}

interface ClubName {
  clubName: string
}

export interface UserSentMatchData {
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface MatchData extends UserSentMatchData {
  id: number,
}
