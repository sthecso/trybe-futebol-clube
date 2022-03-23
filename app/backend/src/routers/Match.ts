import { NextFunction, Request, Response, Router } from 'express';

import { ValidateToken } from '../middlewares/auth';

import {
  ValidateInProgressQueryString,
  ValidateInProgressBodyRequest,
  ValidateMatchData,
} from '../middlewares/match';

import {
  GetAllMatchesController,
  CreateMatchController,
  FinishMatchController,
  EditMatchByIdController,
} from '../controllers/match';

import { IExpressQuery } from '../interfaces';

import { IMatchPostRequest } from '../interfaces/match';

class Match {
  public router: Router;

  private validateTokenMiddleware = new ValidateToken();

  private validateInProgressQueryString = new ValidateInProgressQueryString();

  private validateInProgressBodyRequest = new ValidateInProgressBodyRequest();

  private validateMatchDataMiddleware = new ValidateMatchData();

  private getAllMatchesController = new GetAllMatchesController();

  private createMatchController = new CreateMatchController();

  private finishMatchController = new FinishMatchController();

  private editMatchByIdController = new EditMatchByIdController();

  constructor() {
    this.isValidToken = this.isValidToken.bind(this);
    this.isValidInProgressQueryString = this.isValidInProgressQueryString.bind(this);
    this.isValidInProgressBodyRequest = this.isValidInProgressBodyRequest.bind(this);
    this.validateMatchData = this.validateMatchData.bind(this);
    this.editMatchById = this.editMatchById.bind(this);
    this.finishMatch = this.finishMatch.bind(this);
    this.getAllMatches = this.getAllMatches.bind(this);
    this.createMatch = this.createMatch.bind(this);

    this.router = Router();

    this.start();
  }

  private isValidToken(req: Request, res: Response, nextMiddleware: NextFunction) {
    try {
      const { authorization: token } = req.headers;

      const response = this.validateTokenMiddleware.handle(token);

      if ('httpStatusCode' in response) {
        const { httpStatusCode, result } = response;

        return res.status(httpStatusCode).json(result);
      }

      req.userDataDecoded = response;

      nextMiddleware();
    } catch (error) {
      nextMiddleware(error);
    }
  }

  private isValidInProgressQueryString(req: Request, res: Response, nextMiddleware: NextFunction) {
    try {
      const { inProgress } = req.query;

      const response = this.validateInProgressQueryString.handle(inProgress?.toString());

      if (response) {
        const { httpStatusCode, result } = response;

        return res.status(httpStatusCode).json(result);
      }

      nextMiddleware();
    } catch (error) {
      nextMiddleware(error);
    }
  }

  private isValidInProgressBodyRequest(req: Request, res: Response, nextMiddleware: NextFunction) {
    try {
      const response = this.validateInProgressBodyRequest.handle(req.body);

      if (response) {
        const { httpStatusCode, result } = response;

        return res.status(httpStatusCode).json(result);
      }

      nextMiddleware();
    } catch (error) {
      nextMiddleware(error);
    }
  }

  private validateMatchData(req: Request, res: Response, nextMiddleware: NextFunction) {
    try {
      const matchData = req.body as IMatchPostRequest;

      const response = this.validateMatchDataMiddleware.handle(matchData);

      if (response) {
        const { httpStatusCode, result } = response;

        return res.status(httpStatusCode).json(result);
      }

      nextMiddleware();
    } catch (error) {
      nextMiddleware(error);
    }
  }

  private async editMatchById(req: Request, res: Response, nextMiddleware: NextFunction) {
    try {
      const { id } = req.params;
      const matchData = req.body as IMatchPostRequest;

      const { httpStatusCode, result } = await this.editMatchByIdController.handle(matchData, id);

      return res.status(httpStatusCode).json(result);
    } catch (error) {
      nextMiddleware(error);
    }
  }

  private async finishMatch(req: Request, res: Response, nextMiddleware: NextFunction) {
    try {
      const { id } = req.params;

      const { httpStatusCode, result } = await this.finishMatchController.handle(id);

      return res.status(httpStatusCode).json(result);
    } catch (error) {
      nextMiddleware(error);
    }
  }

  private async getAllMatches(req: Request, res: Response, nextMiddleware: NextFunction) {
    try {
      const { inProgress } = req.query as unknown as IExpressQuery;

      const { httpStatusCode, result } = await this.getAllMatchesController.handle(inProgress);

      return res.status(httpStatusCode).json(result);
    } catch (error) {
      nextMiddleware(error);
    }
  }

  private async createMatch(req: Request, res: Response, nextMiddleware: NextFunction) {
    try {
      const matchData = req.body as IMatchPostRequest;

      const { httpStatusCode, result } = await this.createMatchController.handle(matchData);

      return res.status(httpStatusCode).json(result);
    } catch (error) {
      nextMiddleware(error);
    }
  }

  private patchRoutes() {
    this.router.patch(
      '/:id',
      this.isValidToken,
      this.editMatchById,
    );

    this.router.patch(
      '/:id/finish',
      this.isValidToken,
      this.finishMatch,
    );
  }

  private start() {
    this.router.get(
      '/',
      this.isValidInProgressQueryString,
      this.getAllMatches,
    );

    this.router.post(
      '/',
      this.isValidToken,
      this.isValidInProgressBodyRequest,
      this.validateMatchData,
      this.createMatch,
    );

    this.patchRoutes();
  }
}

export default Match;
