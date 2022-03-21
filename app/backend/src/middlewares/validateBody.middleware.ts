import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

export const validateBody = (schema: ObjectSchema) => (
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const [code, message] = error.message.split('|');
      return res.status(Number(code)).json({ message });
    }

    next();
  }
);
