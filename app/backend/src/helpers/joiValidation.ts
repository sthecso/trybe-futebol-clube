import { Schema } from 'joi';

const validateWithJoi = (schema: Schema, payload: object): void => {
  const { error } = schema.validate(payload);
  if (error) throw error;
};

export default validateWithJoi;
