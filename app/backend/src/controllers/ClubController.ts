import { ClubService } from '../services';

export default class ClubController {
  readonly papiro:string;

  constructor(
    readonly clubService: ClubService,
  ) {}

  public async get(): Promise<void> {
    console.log(this.papiro);
  }
}
