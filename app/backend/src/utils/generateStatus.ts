import StatusCode from './statusCode';

class GenerateStatusError {
  constructor(public status: StatusCode, public message: string) {}
}

export default GenerateStatusError;
