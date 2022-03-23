import IValidation from './interfaces/IValidation';

class ValidationComposite implements IValidation {
  constructor(private readonly validations: IValidation[]) {}

  validate(body: object): Error | null {
    for (let validation = 0; validation < this.validations.length; validation += 1) {
      const error = this.validations[validation].validate(body);
      if (error) {
        return error;
      }
    }
    return null;
  }
}

export default ValidationComposite;
