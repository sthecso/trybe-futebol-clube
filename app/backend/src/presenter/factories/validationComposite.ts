import FieldExistsValidation from '../../validators/field';
import ValidationComposite from '../../validators/composite';

const makeValidationComposite = () => {
  const validations = [
    new FieldExistsValidation('email'),
    new FieldExistsValidation('password'),
  ];
  return new ValidationComposite(validations);
};

export default makeValidationComposite;
