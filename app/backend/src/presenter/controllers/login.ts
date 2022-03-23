import { Request } from 'express';
import unauthorized from '../helpers/httpResponse/login/unauthorized';
import ok, { ILoginResponse } from '../helpers/httpResponse/login/ok';
import serverError from '../helpers/httpResponse/shared/serverError';
import badRequest from '../helpers/httpResponse/shared/badRequest';
import IValidation from '../../validators/interfaces/IValidation';
import IAuthentication from '../../domain/usecases/IAuthentication';
import IController from '../interfaces/IController';
import IHttpResponse from '../interfaces/IHttpResponse';

class LoginController implements IController {
  constructor(
    public validator: IValidation,
    public authenticator: IAuthentication,
  ) {}

  async handle(req: Request): Promise<IHttpResponse> {
    try {
      const error = this.validator.validate(req.body);
      if (error) return badRequest(error);
      const { email, password } = req.body;
      const auth = await this.authenticator.auth({ email, password });
      if (!auth) return unauthorized();
      return ok(auth as ILoginResponse);
    } catch (error) {
      return serverError(error as Error);
    }
  }
}

export default LoginController;
