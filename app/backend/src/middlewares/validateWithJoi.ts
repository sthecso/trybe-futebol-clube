import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import { errorStatus } from '../schemas';

const validateSchema = (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const errorType = error.details[0].type;
      return res.status(errorStatus[errorType]).json({ message: error.message });
    }

    next();
  };

export default validateSchema;
