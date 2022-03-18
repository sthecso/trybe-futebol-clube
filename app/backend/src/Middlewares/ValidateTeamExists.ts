import { RequestHandler } from 'express';
import Club from '../database/models/Club';

const ValidateTeamExists:RequestHandler = async (req, res, next) => {
  const { homeTeam, awayTeam } = req.body;
  console.log(req.body);
  console.log(typeof homeTeam, typeof awayTeam);

  const homeTeamId = homeTeam === 0 ? 1 : homeTeam;
  const awayTeamId = awayTeam === 0 ? 1 : awayTeam;
  const homeTeamExists = await Club.findByPk(homeTeamId);
  const awayTeamExists = await Club.findByPk(awayTeamId);
  if (!homeTeamExists || !awayTeamExists) {
    console.log(homeTeamExists, awayTeamExists);

    return res.status(401).json({
      message: 'There is no team with such id!',
    });
  }
  next();
};

export default ValidateTeamExists;
