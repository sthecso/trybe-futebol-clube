import IClubStats from '../interfaces/IClubStats';

const sortClubs = (board: IClubStats[]) => {
  board.sort((clubA, clubB) => {
    if (clubA.totalPoints > clubB.totalPoints) return -1;
    if (clubA.totalPoints < clubB.totalPoints) return 1;

    if (clubA.totalVictories > clubB.totalVictories) return -1;
    if (clubA.totalVictories < clubB.totalVictories) return 1;

    if (clubA.goalsBalance > clubB.goalsBalance) return -1;
    if (clubA.goalsBalance < clubB.goalsBalance) return 1;

    if (clubA.goalsFavor > clubB.goalsFavor) return -1;
    if (clubA.goalsFavor < clubB.goalsFavor) return 1;

    if (clubA.goalsOwn < clubB.goalsOwn) return -1;
    if (clubA.goalsOwn > clubB.goalsOwn) return 1;

    return 0;
  });
};

export default sortClubs;
