import { RequestHandler } from 'express';
import ServiceLeaderboards from '../services/leaderboards';

class Leaderboards {
  private _metodos = new ServiceLeaderboards();

  findAll:RequestHandler = async (req, res) => {
    const data = await this._metodos.findAll();
    return res.status(200).json(data);
  };
}
export default Leaderboards;
