import { NextFunction, Request, Response } from 'express';
import Club from '../database/models/Club';

class Validate {
  public static async validateEmailandPass(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: 'All fields must be filled',
      });
    }
    next();
  }

  public static async validateClubs(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam } = req.body;
    const homeTeamExists = await Club.findByPk(homeTeam);
    const awayTeamExists = await Club.findByPk(awayTeam);
    if (!homeTeamExists || !awayTeamExists) {
      return res.status(401).json({
        message: 'There is no team with such id!',
      });
    }
    next();
  }
}

export const validateEmail = Validate.validateEmailandPass;
export const validateClub = Validate.validateClubs;
