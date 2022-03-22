import IHttpResponse from '../../../interfaces/IHttpResponse';

const serverError = (error: Error): IHttpResponse => ({
  statusCode: 500,
  body: error,
});

export default serverError;
