import { RequestHandler } from 'express';
import * as clubsService from '../Services/Clubs';

const getAll: RequestHandler = async (_req, res) => {
  const clubs = await clubsService.getAll();
  res.status(200).json(clubs);
};

const getById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const club = await clubsService.getById(id);
  res.status(200).json(club);
};

export { getAll, getById };
