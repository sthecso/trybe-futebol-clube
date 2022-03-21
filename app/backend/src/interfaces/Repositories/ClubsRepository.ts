import { IClub } from '../Club/Club';

export interface IClubsRepository {
  getAllClubs(): Promise<IClub[]>;
  getClubById(id: string): Promise<IClub | undefined>;
}
