import { IErrorStatus } from './interfaces';

const errorStatus:IErrorStatus = {
  'any.required': 401,
  'string.empty': 401,
  'string.min': 401,
  'string.base': 422,
  'string.email': 401,
};

export default errorStatus;
