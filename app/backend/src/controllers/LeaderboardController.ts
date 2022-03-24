import { Request, Response } from 'express';
import { LeaderboardService } from '../services';

class LeaderboardController {
  private boardService: LeaderboardService;

  constructor() {
    this.boardService = new LeaderboardService();
  }

  getAllHomeMatchs = async (req: Request, res: Response) => {
    const board = await this.boardService.getHomeMatchs();
    res.status(200).json(board);
  };

  getAllAwayMatchs = async (req: Request, res: Response) => {
    const board = await this.boardService.getAwayMatchs();
    res.status(200).json(board);
  };

  getAllMatchs = async (req: Request, res: Response) => {
    const board = await this.boardService.getAllMatchs();
    res.status(200).json(board);
  };
}

export default LeaderboardController;
