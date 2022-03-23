import { NextFunction, Request, Response } from 'express';
import IController from '../interfaces/IController';

const routerAdapter = (controller: IController) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const httpResponse = await controller.handle(req);
    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else if (httpResponse.statusCode === 401) {
      res.status(httpResponse.statusCode).json({ message: (httpResponse.body as Error).message });
    } else {
      next(httpResponse.body);
    }
  };

export default routerAdapter;
