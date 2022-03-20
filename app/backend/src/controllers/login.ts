import { RequestHandler } from 'express';
import StatusCodes from '../utils/StatusCodes';
import { LoginService } from '../services';

const login: RequestHandler = async (req, res, _next) => {
  const { email, password } = req.body;

  const result = await LoginService.login(email, password);

  return res
    .status(StatusCodes.OK)
    .json(result);
};

/*
  --> Note: convert to OOP later

  export default class LoginController {
    public static async login() {
      const data = await LoginService.login(email, password);

      return data;
    }
  }
*/

const validate: RequestHandler = async (req, res, _next) => {
  const { role } = req.user;

  return res
    .status(StatusCodes.OK)
    .json(role);
};

export { login, validate };
