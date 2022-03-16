import HttpStatusCode from './HttpStatusCode';

class ErrorCatcher {
  constructor(public httpStatusCode: HttpStatusCode, public message: string) {}
}

export default ErrorCatcher;
