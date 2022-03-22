import IHttpResponse from '../../../interfaces/IHttpResponse';

const badRequest = (error: Error): IHttpResponse => ({
  statusCode: 401,
  body: error,
});

export default badRequest;
