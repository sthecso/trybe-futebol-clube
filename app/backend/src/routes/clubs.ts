import { Router } from 'express';
import ClubsServices from '../services/club.service';

const routes = Router()
const data = new ClubsServices();

routes.get('/', async (_req, res) => {
  const result = await data.findAllClubs()
  res.status(200).json(result);
});

routes.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const result = await data.findOneClub(id);
  res.status(200).json(result)
})

export default routes
