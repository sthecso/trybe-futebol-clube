import { ClubService } from "../services";
import { Request, Response } from "express";

class ClubController {
  private ClubService: ClubService;

  constructor() {
    this.ClubService = new ClubService();
  }

  getAll = async (req: Request, res: Response) => {
    const clubs = await this.ClubService.getAll();
    res.status(200).json(clubs);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const clubId = Number(id);
    
    if (clubId) {
      const club = await this.ClubService.getById(clubId);
      return res.status(200).json(club);
    }

    res.status(400).json({ message: 'Id must be a number'});
  };
}

export default ClubController;
