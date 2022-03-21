import { Router } from 'express';
import { getAll } from '../controllers/matchController';

const matchs = Router();

matchs.get('/', getAll);

export default matchs;
