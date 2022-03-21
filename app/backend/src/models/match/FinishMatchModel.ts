import { MatchRepository } from '../../database/repositories';

class FinishMatchModel {
  private matchRepository = new MatchRepository();

  async handle(id: number): Promise<void> {
    this.matchRepository.updateOne(
      { inProgress: false },
      { where: { id } },
    );
  }
}

export default FinishMatchModel;
