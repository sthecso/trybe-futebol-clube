import { Schema } from 'joi';

// source:https://github.com/tryber/mentoria-api-pf2poo/blob/01-api-pf/src/validations/_validations.ts
const runSchema = <T>(schema: Schema) => async (value: unknown): Promise<T> => {
  const result = await schema.validateAsync(value);
  return result as T;
};

export default runSchema;
