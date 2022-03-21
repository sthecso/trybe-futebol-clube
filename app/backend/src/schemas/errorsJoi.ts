import { IErrorStatus } from '../interfaces';

const errorStatus:IErrorStatus = {
  'any.required': 401,
  'any.invalid': 401,
  'string.empty': 401,
  'string.base': 422,
  'number.base': 422,
  'number.positive': 422,
  'boolean.base': 422,
};

export default errorStatus;
