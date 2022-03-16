import { Schema } from 'joi';

// source:https://github.com/tryber/mentoria-api-pf2poo/blob/01-api-pf/src/validations/_validations.ts
const runSchema = (schema: Schema) => (value: unknown) => {
  const { error } = schema.validate(value);

  if (error) throw error;
};

export default runSchema;
