import { Router } from 'express';

const routes = Router()

routes.get('/home', async (_req, res) => {
  const result = await
    res.status(200).json(result);
});

export default routes
