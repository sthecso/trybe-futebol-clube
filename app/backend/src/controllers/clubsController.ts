import * as express from 'express';
import clubsService from '../services/clubsService';

const clubsController = {
  getAll: async (req: express.Request, res: express.Response) => {
    const clubs = await clubsService.getAll();
    return res.status(200).send(clubs);
  },
  getById: async (req: express.Request, res: express.Response) => {
    const club = await clubsService.getById(req.params.id);
    return res.status(200).send(club);
  },
};

export default clubsController;
