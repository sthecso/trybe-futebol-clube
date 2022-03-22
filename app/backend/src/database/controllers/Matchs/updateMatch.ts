import { Request, Response } from 'express';
import updateMatchService from '../../services/Matchs/updateMatch';

async function updateMatchController(req: Request, res: Response) {
  const { id } = req.params;
  const newScore = req.body;
  const updated = await updateMatchService(id, newScore);
  return res.status(updated.code).json(updated.payload);
}

export default updateMatchController;
