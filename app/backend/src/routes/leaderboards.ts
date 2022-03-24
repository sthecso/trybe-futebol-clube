import { Router } from 'express';
import 'express-async-errors';
import ControllerLeaderboards from '../controller/leaderboards';

class Leaderboards {
  public leaderboardsRoutes:Router;

  private _metodos: ControllerLeaderboards;

  constructor() {
    this.leaderboardsRoutes = Router();
    this._metodos = new ControllerLeaderboards();
    this.Routes();
  }

  Routes() {
    this.leaderboardsRoutes.get('/home', this._metodos.findAll.bind(this._metodos));
  }
}

export default new Leaderboards().leaderboardsRoutes;
