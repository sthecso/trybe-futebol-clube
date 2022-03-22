import { Router } from 'express';
import ControllerMatchs from '../controller/matchs';
import ValidToken from '../controller/middleware/validToken';
import 'express-async-errors';

class Matchs {
  public matchRoute = Router();

  private _controllerMatchs:ControllerMatchs;

  private _checkToken: ValidToken;

  constructor() {
    this._controllerMatchs = new ControllerMatchs();
    this._checkToken = new ValidToken();
    this.Routes();
  }

  Routes() {
    this.matchRoute.get('/', this._controllerMatchs.findAll.bind(this._controllerMatchs));
    this.matchRoute.get(
      '/',
      this._controllerMatchs.findProgres.bind(this._controllerMatchs),
    );
    this.matchRoute.patch(
      '/:id/finish',
      this._controllerMatchs.finish.bind(this._controllerMatchs),
    );

    this.matchRoute.patch(
      '/:id',
      this._controllerMatchs.upGols.bind(this._controllerMatchs),
    );

    this.matchRoute.use(this._checkToken.VerifyToken.bind(this._checkToken));

    this.matchRoute.post('/', this._controllerMatchs.create.bind(this._controllerMatchs));
  }
}

export default new Matchs().matchRoute;
