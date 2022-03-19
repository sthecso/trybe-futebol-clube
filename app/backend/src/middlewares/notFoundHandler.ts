import { Request, Response, NextFunction } from 'express';

const notFoundHandler = (req: Request, res: Response, _next: NextFunction) => {
  const entityName = req.originalUrl.slice(1);
  const entity = entityName.slice(0, 1).toUpperCase()
    .concat(entityName.slice(1).toLowerCase());
  const message = `${entity} not found`;
  return res.status(404).send({ error: message });
};

export default notFoundHandler;
