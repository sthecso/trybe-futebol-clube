import Match from '../../database/models/Matchs';

class FinishMatchModel {
  private matchEntity = Match;

  async handle(id: number): Promise<void> {
    await this.matchEntity.update(
      { inProgress: false },
      { where: { id } },
    );
  }
}

export default FinishMatchModel;
