import { Request, Response } from 'express';
import StatusCode from '../utils/statusCode';

class UserValidateTokenController {
  private statusCode = StatusCode;

  constructor() {
    this.verifyControllerAuth = this.verifyControllerAuth.bind(this);
  }

  verifyControllerAuth(req:Request, res: Response) {
    const { decodedUser } = req;
    if (!decodedUser) {
      const message = 'Usuario nao authenticado';
      return res.status(this.statusCode.Unauthorized).json({ message });
    }
    return res.status(this.statusCode.Ok).send(`${decodedUser.role}`);
  }
}

export default UserValidateTokenController;
