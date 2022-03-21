import { RequestHandler } from 'express';
import ServiceMatchs from '../services/matchs';

class ClubsMetodos {
  private ServiceClubs = new ServiceMatchs();

  findAll:RequestHandler = async (req, res, next) => {
    if (req.query) return next();
    const data = await this.ServiceClubs.findAll();

    return res.status(200).json(data);
  };

  findProgres:RequestHandler = async (req, res) => {
    const { inProgress } = req.query;
    const data = await this.ServiceClubs.findSearch(inProgress === 'true');
    return res.status(200).json(data);
  };
}

export default ClubsMetodos;
