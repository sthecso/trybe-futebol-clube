import Club from '../modelsSequelize/club';

class ClubsModels {
  private clubeEntity = Club;

  async getAllClubs() {
    const clubs = await this.clubeEntity.findAll();
    if (!clubs || !clubs.length) return null;
    return clubs;
  }

  async findOneClub(id: number) {
    const club = await this.clubeEntity.findOne({ where: { id } });
    if (!club) return null;
    return club;
  }
}

export default ClubsModels;
