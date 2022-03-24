import ModelLeaderboards from '../database/fé/Leaderboards';
import { IMatchsDT02 } from '../interface/match';

interface ILeaderboardsDTO{
  name:string,
  totalPoints: number,
  totalGames: number,
  totalVictories:number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number
}

class Leaderboards {
  private _metodos = new ModelLeaderboards();

  private listTime:ILeaderboardsDTO;

  private _linterMeuInimigo:boolean;

  init() {
    this.listTime = {
      name: '',
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };
  }

  contGols(match:IMatchsDT02) {
    if (this.listTime.name === match.homeClub.clubName) {
      this.listTime.goalsFavor += match.homeTeamGoals;
      this.listTime.goalsOwn += match.awayTeamGoals;
      this.listTime.totalGames += 1;
    } else if (this.listTime.name === match.awayClub.clubName) {
      this.listTime.goalsFavor += match.awayTeamGoals;
      this.listTime.goalsOwn += match.homeTeamGoals;
      this.listTime.totalGames += 1;
    }
  }

  statusGameHome(match:IMatchsDT02) {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      this.listTime.totalVictories += 1;
      this.listTime.totalPoints += 3;
    } else if (match.homeTeamGoals < match.awayTeamGoals) {
      this.listTime.totalLosses += 1;
    } else {
      this.listTime.totalPoints += 1;
      this.listTime.totalDraws += 1;
    }
  }

  statusGameVisit(match:IMatchsDT02) {
    if (match.awayTeamGoals > match.homeTeamGoals) {
      this.listTime.totalVictories += 1;
      this.listTime.totalPoints += 3;
    } else if (match.awayTeamGoals < match.homeTeamGoals) {
      this.listTime.totalLosses += 1;
    } else {
      this.listTime.totalPoints += 1;
      this.listTime.totalDraws += 1;
    }
  }

  contGames(match:IMatchsDT02) {
    if (this.listTime.name === match.homeClub.clubName) {
      this.statusGameHome(match);
    } else if (this.listTime.name === match.awayClub.clubName) {
      this.statusGameVisit(match);
    }
  }

  mate() {
    this.listTime.efficiency = (this.listTime.totalPoints / (this.listTime.totalGames * 3)) * 100;
    this.listTime.efficiency = Math.round(this.listTime.efficiency * 100) / 100;
    this.listTime.goalsBalance = this.listTime.goalsFavor - this.listTime.goalsOwn;
  }
  // 1º Total de Vitórias; 2º Saldo de gols; 3º Gols a favor; 4º Gols contra.

  orderTimes(times:ILeaderboardsDTO[]) {
    this._linterMeuInimigo = true;
    return times.sort((a, b) => {
      if (b.totalPoints - a.totalPoints === 0) {
        if (b.totalVictories - a.totalVictories === 0) {
          if (b.goalsBalance - a.goalsBalance === 0) {
            if (b.goalsFavor - a.goalsFavor === 0) {
              return b.goalsOwn - a.goalsOwn;
            }
            return b.goalsFavor - a.goalsFavor;
          }
          return b.goalsBalance - a.goalsBalance;
        }
        return b.totalVictories - a.totalVictories;
      }
      return b.totalPoints - a.totalPoints;
    });
  }

  findAll = async () => {
    const matchs = await this._metodos.findAll();
    const times = await this._metodos.findAllClubs();
    const teste = times.map((time) => {
      this.init();
      this.listTime.name = time.clubName;
      matchs.forEach((match) => {
        this.contGols(match);
        this.contGames(match);
      });
      this.mate();
      return { ...this.listTime };
    });
    return this.orderTimes(teste);
  };
}

export default Leaderboards;
