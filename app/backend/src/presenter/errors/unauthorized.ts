class UnauthorizedError extends Error {
  constructor() {
    super('Incorrect email or password');
    this.name = 'UnauthorizedError';
  }
}

export default UnauthorizedError;
