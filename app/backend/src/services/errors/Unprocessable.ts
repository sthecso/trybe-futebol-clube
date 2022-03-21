import StatusCodes from '../../utils/StatusCodes';

export default class UnprocessableError extends Error {
  message: string;

  code: number;

  constructor(message: string) {
    super(message);
    this.code = StatusCodes.UNPROCESSABLE_ENTITY;
  }
}
