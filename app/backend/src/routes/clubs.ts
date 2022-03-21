import { Router } from 'express';
import ControllerClubs from '../controller/clubs';

class Clubs {
  public clubRoute:Router;

  private _controllerClubs:ControllerClubs;

  constructor() {
    this.clubRoute = Router();
    this._controllerClubs = new ControllerClubs();
    this.Routers();
  }

  Routers() {
    this.clubRoute.get('/', this._controllerClubs.findAll.bind(this._controllerClubs));
    this.clubRoute.get('/:id', this._controllerClubs.findById.bind(this._controllerClubs));
  }
}

export default new Clubs().clubRoute;
