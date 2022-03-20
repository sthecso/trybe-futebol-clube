import { MatchRepository } from '../../database/repositories';

class FinishMatchModel {
  private matchRepository = new MatchRepository();

  async handle(id: number): Promise<void> {
    this.matchRepository.updateOne(
      { inProgress: false },
      { id },
    );
  }
}

export default FinishMatchModel;
