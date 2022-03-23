import RequiredFieldError from '../presenter/errors/requiredField';
import IValidation from './interfaces/IValidation';

class FieldExistsValidation implements IValidation {
  constructor(public fieldToValidate: string) {}

  validate(body: object): Error | null {
    if (!body[this.fieldToValidate as keyof typeof body]) {
      return new RequiredFieldError();
    }
    return null;
  }
}

export default FieldExistsValidation;
