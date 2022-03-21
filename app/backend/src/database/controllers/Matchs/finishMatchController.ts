import { Request, Response } from 'express';
import finishMatchService from '../../services/Matchs/finishMatchService';

const MSG_GAME_FINALLIZED = { message: 'Partida finalizada!' };

async function finishMatchController(req: Request, res: Response) {
  const { id } = req.params;
  await finishMatchService(id);

  return res.status(200).json(MSG_GAME_FINALLIZED);
}

export default finishMatchController;
