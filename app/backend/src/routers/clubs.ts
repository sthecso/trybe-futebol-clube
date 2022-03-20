import { Router } from 'express';
import { getAll, getById } from '../controllers/clubController';

const clubs = Router();

clubs.get('/', getAll);
clubs.get('/:id', getById);

export default clubs;
