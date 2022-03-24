import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const routes = Router()
const data = new MatchController();

routes.get('/', async (req, res) => {
  const { inProgress } = req.query;
  if (typeof inProgress === 'string') {
    const result = await data.findByInProgress(inProgress);
    return res.status(200).json(result)
  }
  const result = await data.allMatchs()
  return res.status(200).json(result)
})

routes.post('/', async (req, res) => {
  const { inProgress, homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(401).json(
      { message: 'It is not possible to create a match with two equal teams' },
    );
  }

  const homeTeamIsValid = await data.findById(homeTeam);
  const awayTeamIsValid = await data.findById(awayTeam);

  if (!homeTeamIsValid || !awayTeamIsValid) {
    return res.status(401).json(
      { message: 'There is no team with such id!' },
    );
  }

  if (inProgress) {
    const matchCreated = await data.create(req.body);
    return res.status(201).json(matchCreated);
  }
})

routes.patch('/:id/finish', async (req, res) => {
  const { id } = req.params;
  const editMatch = await data.editMatch(Number(id));
  res.status(200).json(editMatch)
})

routes.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const updated = await data.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
  return res.status(200).json(updated);
})

export default routes
