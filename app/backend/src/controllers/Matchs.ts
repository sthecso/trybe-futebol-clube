import { RequestHandler } from 'express';
import * as matchsService from '../Services/Matchs';

const getAll: RequestHandler = async (req, res) => {
  const { inProgress } = req.query;

  if (typeof inProgress === 'undefined') {
    const matchs = await matchsService.getAll();
    return res.status(200).json(matchs);
  }

  const clubs = await matchsService.getByProgress(inProgress === 'true');
  res.status(200).json(clubs);
};

const getById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const club = await matchsService.getById(id);
  res.status(200).json(club);
};

const insertMatch: RequestHandler = async (req, res) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
  console.log(req.body);

  if (homeTeam === awayTeam) {
    return res.status(401).json({
      message: 'It is not possible to create a match with two equal teams' });
  }

  const homeTeamId = homeTeam === 0 ? 1 : homeTeam;
  const awayTeamId = awayTeam === 0 ? 1 : awayTeam;
  const match = await matchsService.insertMatch({
    homeTeam: homeTeamId,
    awayTeam: awayTeamId,
    homeTeamGoals,
    awayTeamGoals,
    inProgress,
  });
  res.status(201).json(match);
};

const finishMatch: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const matchExists = await matchsService.finishMatch(id);
  if (!matchExists) {
    return res.status(404).json({ message: 'Match not found' });
  }
  res.status(200).json({ message: 'Match finished' });
};

export { getAll, getById, insertMatch, finishMatch };
