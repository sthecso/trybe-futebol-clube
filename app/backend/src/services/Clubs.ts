import { CRUDClub } from '../interfaces/CRUD';
import Clubs from '../database/models/Club';

class ClubService implements CRUDClub {
  getClubs = async () => {
    const clubs = await Clubs.findAll();
    return { code: 200, data: clubs };
  };
}

export default new ClubService();
