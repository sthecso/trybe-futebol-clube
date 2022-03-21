import { RequestHandler } from 'express';
import ServiceMatchs from '../services/matchs';
import ValidMatch from './utils/isValidMatch';

class ClubsMetodos {
  private ServiceMatchs = new ServiceMatchs();

  private _IsValidMatch:ValidMatch;

  findAll:RequestHandler = async (req, res, next) => {
    const { inProgress } = req.query;
    if (inProgress) return next();
    const data = await this.ServiceMatchs.findAll();

    return res.status(200).json(data);
  };

  findProgres:RequestHandler = async (req, res) => {
    const { inProgress } = req.query;
    const data = await this.ServiceMatchs.findSearch(inProgress === 'true');
    return res.status(200).json(data);
  };

  crete:RequestHandler = async (req, res) => {
    this._IsValidMatch = new ValidMatch(req.body);
    const data = await this.ServiceMatchs.create(req.body);
    return res.status(200).json(data);
  };

  finish:RequestHandler = async (req, res) => {
    const { id } = req.params;
    await this.ServiceMatchs.finish(+id);
    return res.status(200).send();
  };
}

export default ClubsMetodos;
