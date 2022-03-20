import ModelClubs from '../database/fé/clubs';

class ServiceClubs {
  private ModelClub = new ModelClubs();

  public findAll = async () => this.ModelClub.findAll();

  public findId = async (id:number) => this.ModelClub.findId(id);
}

export default ServiceClubs;
