import { Router, Request, Response } from 'express';
// import xxController from 'ddddd';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ teste: 'Teste' });
});

export default router;
