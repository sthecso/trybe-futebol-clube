import { NextFunction, Request, Response } from 'express';

import { IUserRequest } from '../../interfaces/login';

import { HttpStatusCode, schemaUserRequest } from '../../utils';

import { IErrorMessage } from '../../interfaces';

class ValidateLoginRequest {
  private httpStatusCode = HttpStatusCode;

  private schemaUserRequest = schemaUserRequest;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(
    req: Request,
    res: Response,
    nextMiddleware: NextFunction,
  ): Promise<void | Response<IErrorMessage>> {
    const userData = req.body as IUserRequest;

    const { error } = this.schemaUserRequest.validate(userData);

    if (error) {
      return res
        .status(this.httpStatusCode.NotAuthorized)
        .json({ message: error.message });
    }

    nextMiddleware();
  }
}

export default ValidateLoginRequest;
