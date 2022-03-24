import ClubsServices from "./club.service";
import MatchsServices from "./match.service";

interface IFinal {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}


interface IAllMatchs {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  // homeClub: {
  //   id: number,
  //   clubName: string
  // },
  // awayClub: {
  //   id: string
  //   clubName: string
  // }
}

interface IClub {
  id: number,
  clubName: string,
}

export default class LeaderboardServices {
  private clubsServices = new ClubsServices();
  private matchServices = new MatchsServices();

  filterTeam(allMatchs: IAllMatchs[], currTeam: string) {
    const result = allMatchs.filter((match) => match.homeClub.clubName === currTeam);
    return result;
  }

  victoryPoints(allMatchs: IAllMatchs[], currTeam: string) {
    let result = 0;
    const filter = this.filterTeam(allMatchs, currTeam);
    filter.forEach((f: IAllMatchs) => {
      if (f.homeClub.clubName === currTeam && f.homeTeamGoals > f.awayTeamGoals) {
        result += 1;
      }
    })
    return result;
  }

  drawPoints(allMatchs: IAllMatchs[], currTeam: string) {
    let result = 0;
    const filter = this.filterTeam(allMatchs, currTeam);
    filter.forEach((f: IAllMatchs) => {
      if (f.homeClub.clubName === currTeam && f.homeTeamGoals === f.awayTeamGoals) {
        result += 1;
      }
    })
    return result;
  }

  lossPoints(allMatchs: IAllMatchs[], currTeam: string) {
    let result = 0;
    const filter = this.filterTeam(allMatchs, currTeam);
    filter.forEach((f: IAllMatchs) => {
      if (f.homeClub.clubName === currTeam && f.homeTeamGoals < f.awayTeamGoals) {
        result += 1;
      }
    })
    return result;
  }

  async calcPoints(allMatchs: IAllMatchs[], currTeam: string) {
    const totalVictories = this.victoryPoints(allMatchs, currTeam);
    const totalDraws = this.drawPoints(allMatchs, currTeam);
    const totalLosses = this.lossPoints(allMatchs, currTeam);

    const result = {
      totalVictories,
      totalDraws,
      totalLosses,
    }

    return result;
  }


  async leader() {
    let final: IFinal[] = [];
    const allClubs: IClub[] = await this.clubsServices.findAllClubs();
    const allMatchs: IAllMatchs[] = await this.matchServices.allMatchs();

    allClubs.forEach((club) => {
      const data = this.calcPoints(allMatchs, club.clubName);
      final.push({
        name: club.clubName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: data,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 0,
      })
    });
    return final;
  }

}
