import { Router } from 'express';
import ControllerClubs from '../controller/clubs';

class Clubs {
  public clubRouts:Router;

  private _controllerClubs:ControllerClubs;

  constructor() {
    this.clubRouts = Router();
    this._controllerClubs = new ControllerClubs();
    this.Routers();
  }

  Routers() {
    this.clubRouts.get('/', this._controllerClubs.findAll.bind(this._controllerClubs));
    this.clubRouts.get('/:id', this._controllerClubs.findById.bind(this._controllerClubs));
  }
}

export default new Clubs().clubRouts;
