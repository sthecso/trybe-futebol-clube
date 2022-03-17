import { IClubDTO } from '../interfaces/IClubDTO';
import { ClubService } from '../services';

export default class ClubController {
  constructor(
    readonly clubService: ClubService,
  ) {}

  public async get(): Promise<IClubDTO[]> {
    const result = await this.clubService.getAll();

    return result;
  }

  public async getById(id: number): Promise<IClubDTO> {
    const result = await this.clubService.getById(id);

    return result;
  }
}
