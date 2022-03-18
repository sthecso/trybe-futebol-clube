import { ErrorRequestHandler } from 'express';

enum ListErros{
  'BADREQUEST' = 400,
}
class TypesErros {
  private list = ListErros;

  public handleErros:ErrorRequestHandler = (err, _req, res, _next) => {
    const [message, code] = err.split('/');
    const status = this.list[code];
    return res.status(+status).json(message);
  };
}

export default new TypesErros().handleErros;
