import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

enum ListErros{
  'BADREQUEST' = 400,
  'Unauthorized' = 401,
}
class TypesErros {
  private list = ListErros;

  zodErros(err:ZodError) {
    const [message, code] = err.issues[0].message.split('/');
    const statusCode = code as unknown as number;
    const status = this.list[statusCode] as unknown as number;
    return [status, message];
  }

  public handleErros:ErrorRequestHandler = (err, _req, res, _next) => {
    if (err instanceof ZodError) {
      const [code, message] = this.zodErros(err);
      return res.status(+code).json({ message });
    }
    const [message, code] = err.message.split('/');
    if (code) {
      const status = this.list[code];
      return res.status(+status).json({ message });
    }
    return res.status(500).json('inesperado');
  };
}

export default new TypesErros().handleErros;
