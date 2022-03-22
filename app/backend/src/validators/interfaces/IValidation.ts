interface IValidation {
  validate: (input: object) => Error | null
}

export default IValidation;
