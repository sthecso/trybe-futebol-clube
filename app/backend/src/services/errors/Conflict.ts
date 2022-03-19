import StatusCodes from '../../utils/StatusCodes';

export default class ConflictError extends Error {
  message: string;

  code: number;

  constructor(message: string) {
    super(message);
    this.code = StatusCodes.BAD_REQUEST;
  }
}
