import { RequestHandler } from 'express';

const notFoundHandler: RequestHandler = (req, res, _next) => {
  const entityName = req.originalUrl.slice(1);
  const entity = entityName.slice(0, 1).toUpperCase()
    .concat(entityName.slice(1).toLowerCase());
  const error = `${entity} not found`;
  return res.status(404).send({ error });
};

export default notFoundHandler;
