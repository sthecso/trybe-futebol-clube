import { Request, Response } from 'express';
import finishMatchService from '../services/finishMatchService';

// não importa o que eu faço, não consigo passar isso pro teste, parece que ele nem chama esse metódo, vou dar uma olhada na mentoria segunda

async function finishMatchController(req: Request, res: Response) {
  const { id } = req.params;
  await finishMatchService(id);

  return res.status(200).json({ message: 'Partida finalizada!' });
}

export default finishMatchController;
