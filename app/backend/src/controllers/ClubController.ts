import { IClubDTO } from '../interfaces/IClubDTO';
import { ClubService } from '../services';

export default class ClubController {
  readonly papiro:string;

  constructor(
    readonly clubService: ClubService,
  ) {}

  public async get(): Promise<IClubDTO[]> {
    const result = await this.clubService.getAll();

    return result;
  }
}
