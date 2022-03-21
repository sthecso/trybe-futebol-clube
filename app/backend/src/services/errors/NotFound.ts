import StatusCodes from '../../utils/StatusCodes';

export default class NotFoundError extends Error {
  message: string;

  code: number;

  constructor(message: string) {
    super(message);
    this.code = StatusCodes.NOT_FOUND;
  }
}
