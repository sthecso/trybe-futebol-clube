import ModelMatchs from '../database/fé/match';

class ServiceMatchs {
  private ModelClub = new ModelMatchs();

  public findAll = async () => this.ModelClub.findAll();

  public findSearch = async (progress:boolean) => this.ModelClub.findSearch(progress);
}

export default ServiceMatchs;
