class RequiredFieldError extends Error {
  constructor() {
    super('All fields must be filled');
    this.name = 'RequiredFieldError';
  }
}

export default RequiredFieldError;
