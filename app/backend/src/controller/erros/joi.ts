import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

enum ListErros{
  'BADREQUEST' = 400,
  'Unauthorized' = 401,
}
class TypesErros {
  private list = ListErros;

  public handleErros:ErrorRequestHandler = (err, _req, res, _next) => {
    if (err instanceof ZodError) {
      return res.status(400).json({ message: err.issues[0].message });
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
