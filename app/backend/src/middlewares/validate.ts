import { RequestHandler } from 'express';
import { ObjectSchema } from 'joi'; // any schema

/*
  Curried Function:
  https://javascript.info/currying-partials

  validate(schema)();
*/
const validate = (schema: ObjectSchema): RequestHandler =>
  (req, _res, next) => {
    const { body } = req;
    const { error } = schema.validate(body);

    if (error) next(error);

    next();
  };

export default validate;
