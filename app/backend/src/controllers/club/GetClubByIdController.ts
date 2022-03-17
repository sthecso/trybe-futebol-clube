import { NextFunction, Request, Response } from 'express';

import { IClub } from '../../interfaces/club';

import { IErrorMessage } from '../../interfaces';

import { GetClubByIdService } from '../../services/club';

import { ErrorCatcher, HttpStatusCode } from '../../utils';

class GetClubByIdController {
  private getClubByIdService = new GetClubByIdService();

  private httpStatusCode = HttpStatusCode;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(
    req: Request,
    res: Response,
    _nextMiddleware: NextFunction,
  ): Promise<Response<IErrorMessage> | IClub> {
    const { id } = req.params;

    const club = await this.getClubByIdService.handle(id);

    if (club instanceof ErrorCatcher) {
      return res
        .status(club.httpStatusCode)
        .json({ message: club.message });
    }

    return res
      .status(this.httpStatusCode.Ok)
      .json(club);
  }
}

export default GetClubByIdController;
