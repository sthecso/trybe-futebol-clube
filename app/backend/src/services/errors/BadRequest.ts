import StatusCodes from '../../utils/StatusCodes';

export default class BadRequestError extends Error {
  message: string;

  code: number;

  constructor(message: string) {
    super(message);
    this.code = StatusCodes.BAD_REQUEST;
  }
}
