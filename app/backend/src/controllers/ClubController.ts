import { ClubService } from "../services";
import { Request, Response } from 'express';

class ClubController {
    private ClubService: ClubService;

    constructor() {
        this.ClubService = new ClubService();
    }

    getAll =  async (req: Request, res: Response) => {
        const clubs = await this.ClubService.getAll();
        res.status(200).json(clubs);
    }
}

export default ClubController;
