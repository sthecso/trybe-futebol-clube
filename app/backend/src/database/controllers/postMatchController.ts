import { Response, Request } from 'express';
import { UserSentMatchData } from '../../utils/Interfaces';
import postMatchService from '../services/postMatchService';
// import validateLoginService from '../services/validateLoginService';

function verifyData(matchData: UserSentMatchData) {
  if (matchData.awayTeam === undefined || matchData.homeTeam === undefined) {
    return { code: 401, payload: { message: 'Insira um time válido' } };
  }
  if (matchData.awayTeamGoals === undefined || matchData.homeTeamGoals === undefined) {
    return { code: 401, payload: { message: 'Insira um número de gols válido' } };
  }
  if (matchData.inProgress === undefined) {
    return { code: 401, payload: { message: 'Insira se a partida está em progresso ou não' } };
  }
  return { code: 200 };
}

async function postMatchController(req: Request, res: Response) {
  const matchData = req.body;
  console.log(matchData);
  // const token = req.params.authorization;
  const verifiedData = verifyData(matchData);
  if (verifiedData.code !== 200) {
    return res.status(verifiedData.code).json(verifiedData.payload);
  }
  // const tokenVerified = await validateLoginService(token);
  // if (tokenVerified.code !== 200) {
  //   return res.status(401).json({ message: 'Invalid Token' });
  // }
  const createdMatch = await postMatchService(matchData);
  return res.status(createdMatch.code).json(createdMatch.payload);
}

export default postMatchController;
