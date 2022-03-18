import { StatusCodes } from 'http-status-codes';

export default class UnauthorizedError extends Error {
  message: string;

  code: number;

  constructor(message: string) {
    super(message);
    this.code = StatusCodes.UNAUTHORIZED;
  }
}
