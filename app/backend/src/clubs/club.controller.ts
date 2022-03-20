import { Router } from 'express';
import ClubService from './club.service';

class ClubController {
  router = Router();

  constructor() {
    this.Routes();
  }

  Routes() {
    this.router.get('/', ClubService.getAllClubs);
    this.router.get('/:id', ClubService.getClubById);
  }
}

export default new ClubController();
