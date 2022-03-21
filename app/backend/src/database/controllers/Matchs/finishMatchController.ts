import { Request, Response } from 'express';
import finishMatchService from '../../services/Matchs/finishMatchService';

async function finishMatchController(req: Request, res: Response) {
  const { id } = req.params;
  await finishMatchService(id);

  return res.status(200).json({ message: 'Partida finalizada!' });
}

export default finishMatchController;
