import { Router } from 'express';
import ControllerMatchs from '../controller/matchs';

class Matchs {
  public matchRoute = Router();

  private _controllerMatchs:ControllerMatchs;

  constructor() {
    this._controllerMatchs = new ControllerMatchs();
    this.Routes();
  }

  Routes() {
    this.matchRoute.get('/', this._controllerMatchs.findAll.bind(this._controllerMatchs));
    this.matchRoute.get(
      '/',
      this._controllerMatchs.findProgres.bind(this._controllerMatchs),
    );
  }
}

export default new Matchs().matchRoute;
