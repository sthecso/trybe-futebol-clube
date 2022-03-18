import StatusCodes from '../../utils/StatusCodes';

export default class UnauthorizedError extends Error {
  message: string;

  code: number;

  constructor(message: string) {
    super(message);
    this.code = StatusCodes.UNAUTHORIZED;
  }
}
