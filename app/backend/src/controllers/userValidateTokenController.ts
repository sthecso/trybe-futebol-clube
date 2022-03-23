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
    const message = decodedUser.role;
    return res.status(this.statusCode.Ok).json(message);
  }
}

export default UserValidateTokenController;
