import { IClub, IClubHistory } from '../Club';

export interface IClubsRepository {
  getAllClubs(): Promise<IClub[]>;
  getClubById(id: string): Promise<IClub | undefined>;
  getClubsHomeHistory(): Promise<IClubHistory[]>;
  getClubsAwayHistory(): Promise<IClubHistory[]>;
  getClubsOverallHistory(): Promise<IClubHistory[]>;
}
