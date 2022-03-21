import { Response, Request } from 'express';
import { UserSentMatchData } from '../../../helpers/Interfaces';
import getClubByIdService from '../../services/Clubs/getClubByIdService';
import postMatchService from '../../services/Matchs/postMatchService';

const MSG_INSERT_VALID_GOALS = { message: 'Insira um número de gols válido' };
const MSG_INSERT_GAME_PROGRESS = { message: 'Insira se a partida está em progresso ou não' };
const MSG_CREATE_MATCH_TEAMS = {
  message: 'It is not possible to create a match with two equal teams',
};
const MSG_INSERT_VALID_TEAM = { message: 'Insira um time válido' };
const MSG_ERROR_TEAM_ID = { message: 'There is no team with such id!' };

function verifyData(matchData: UserSentMatchData) {
  if (matchData.awayTeamGoals === undefined || matchData.homeTeamGoals === undefined) {
    return { code: 401, payload: MSG_INSERT_VALID_GOALS };
  }
  if (matchData.inProgress === undefined) {
    return { code: 401, payload: MSG_INSERT_GAME_PROGRESS };
  }
  return { code: 200 };
}

async function verifyTeams(team1: number | string, team2: number | string) {
  if (team1 === team2) {
    return {
      code: 401,
      payload: MSG_CREATE_MATCH_TEAMS };
  }
  if (team1 === undefined || team2 === undefined) {
    return { code: 401, payload: MSG_INSERT_VALID_TEAM };
  }
  const club1 = await getClubByIdService(team1);
  const club2 = await getClubByIdService(team2);
  if (!club1 || !club2) {
    return { code: 401, payload: MSG_ERROR_TEAM_ID };
  }
  return { code: 200 };
}

async function postMatchController(req: Request, res: Response) {
  const matchData = req.body as UserSentMatchData;
  const verifiedData = verifyData(matchData);
  const verifiedTeams = await verifyTeams(matchData.awayTeam, matchData.homeTeam);
  if (verifiedTeams.code !== 200) {
    return res.status(verifiedTeams.code).json(verifiedTeams.payload);
  }
  if (verifiedData.code !== 200) {
    return res.status(verifiedData.code).json(verifiedData.payload);
  }
  const createdMatch = await postMatchService(matchData);
  return res.status(createdMatch.code).json(createdMatch.payload);
}

export default postMatchController;
