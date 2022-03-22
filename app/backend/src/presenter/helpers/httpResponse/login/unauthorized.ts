import UnauthorizedError from '../../../errors/unauthorized';
import IHttpResponse from '../../../interfaces/IHttpResponse';

const unauthorized = (): IHttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError(),
});

export default unauthorized;
