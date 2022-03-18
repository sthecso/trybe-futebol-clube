import { Response, Request } from 'express';
import { UserSentMatchData } from '../../utils/Interfaces';
import getClubByIdService from '../services/getClubByIdService';
import postMatchService from '../services/postMatchService';
// import validateLoginService from '../services/validateLoginService';

function verifyData(matchData: UserSentMatchData) {
  if (matchData.awayTeamGoals === undefined || matchData.homeTeamGoals === undefined) {
    return { code: 401, payload: { message: 'Insira um número de gols válido' } };
  }
  if (matchData.inProgress === undefined) {
    return { code: 401, payload: { message: 'Insira se a partida está em progresso ou não' } };
  }
  return { code: 200 };
}

async function verifyTeams(team1: number | string, team2: number | string) {
  if (team1 === team2) {
    return {
      code: 401,
      payload: { message: 'It is not possible to create a match with two equal teams' } };
  }
  if (team1 === undefined || team2 === undefined) {
    return { code: 401, payload: { message: 'Insira um time válido' } };
  }
  const club1 = await getClubByIdService(team1);
  const club2 = await getClubByIdService(team2);
  if (!club1 || !club2) {
    return { code: 401, payload: { message: 'There is no team with such id!' } };
  }
  return { code: 200 };
}

async function postMatchController(req: Request, res: Response) {
  const matchData = req.body as UserSentMatchData;
  // const token = req.params.authorization;
  const verifiedData = verifyData(matchData);
  const verifiedTeams = await verifyTeams(matchData.awayTeam, matchData.homeTeam);
  if (verifiedTeams.code !== 200) {
    return res.status(verifiedTeams.code).json(verifiedTeams.payload);
  }
  if (verifiedData.code !== 200) {
    return res.status(verifiedData.code).json(verifiedData.payload);
  }
  // const tokenVerified = await validateLoginService(token);
  // if (tokenVerified.code !== 200) {return res.status(401).json({ message: 'Invalid Token' });}
  const createdMatch = await postMatchService(matchData);
  return res.status(createdMatch.code).json(createdMatch.payload);
}

export default postMatchController;
