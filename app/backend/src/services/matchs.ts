import ICreateMatchDTO, { Gols } from '../interface/match';
import ModelMatchs from '../database/fé/match';
import ModelClubs from '../database/fé/clubs';

class ServiceMatchs {
  private ModelMatchs = new ModelMatchs();

  private ModelClubs = new ModelClubs();

  public findAll = async () => this.ModelMatchs.findAll();

  public findSearch = async (progress:boolean) => this.ModelMatchs.findSearch(progress);

  public create = async (match:ICreateMatchDTO) => {
    const clubs = await this.ModelClubs.findAllIds(match.homeTeam, match.awayTeam);
    if (clubs.length !== 2) throw new Error('There is no team with such id!/Unauthorized');
    return this.ModelMatchs.create(match);
  };

  public finish = async (id:number) => this.ModelMatchs.update(id);

  public updateGols = async (id:number, gols:Gols) => this.ModelMatchs.updateGols(id, gols);
}

export default ServiceMatchs;
