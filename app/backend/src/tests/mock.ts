export const allClubs = [
  {
    id: 1,
    clubName: 'Avaí/Kindermann',
  },
  {
    id: 2,
    clubName: 'Bahia',
  },
  {
    id: 3,
    clubName: 'Botafogo',
  },
  {
    id: 4,
    clubName: 'Corinthians',
  },
]
export const oneClub = { id: 1, clubName: 'Avaí/Kindermann' }
export interface IClubDTO {
  id: number,
  clubName: string
}

export const allMatchs = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: 0,
    homeClub: {
      clubName: "São Paulo",
    },
		awayClub: {
      clubName: "Grêmio"
    }
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: 0,
    homeClub: {
      clubName: "Internacional",
    },
    awayClub: {
      clubName: "Santos"
    }
  },
  {
    id: 3,
    homeTeam: 4,
    homeTeamGoals: 3,
    awayTeam: 11,
    awayTeamGoals: 0,
    inProgress: 0,
    homeClub: {
      clubName: "Corinthians"
    },
    awayClub: {
      clubName: "Napoli-SC"
    }
  },
]

export const matchsTrue = [
  {
		id: 43,
		homeTeam: 11,
		homeTeamGoals: 0,
		awayTeam: 10,
		awayTeamGoals: 0,
		inProgress: true,
		homeClub :{
      clubName: "Napoli-SC"
    } ,
		awayClub:{
      clubName: "Minas Brasília"
    } 
	},
	{
		id: 44,
		homeTeam: 7,
		homeTeamGoals: 2,
		awayTeam: 15,
		awayTeamGoals: 2,
		inProgress: true,
		homeClub:{
      clubName: "Flamengo"
    },
		awayClub:{
      clubName: "São José-SP"
    }
	},
	{
		id: 45,
		homeTeam: 5,
		homeTeamGoals: 1,
		awayTeam: 3,
		awayTeamGoals: 1,
		inProgress: true,
		homeClub:{
      clubName: "Cruzeiro"
    },
		awayClub: {
      clubName: "Botafogo"
    }
	},
]

export interface IMatchsDT0 {
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

export const MockSequlize =[{
  dataValues:matchsTrue[0]
},{
  dataValues:matchsTrue[1]
},{
  dataValues:matchsTrue[2]
}]