import Joi = require('joi');

export default class UserValidation {
  constructor(
    private schema: Joi.Schema,
  ) {}

  async bodyLogin(value: unknown) {
    const { error } = await this.schema.validateAsync(value);

    if (error) throw error;
  }
}
