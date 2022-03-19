type HttpCode = 'alreadyExists' | 'notFound' | 'badRequest' | 'unauthorized' | 'serverError';

class APIError extends Error {
  code: HttpCode;

  message: string;

  constructor(message: string, code: HttpCode) {
    super();
    this.code = code;
    this.message = message;
  }
}

export default APIError;
