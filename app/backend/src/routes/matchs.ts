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

export default routes
