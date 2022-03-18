const throwError = (messageError: string, status: string) => {
  const error = new Error();
  // Utilizei a chave name do método Error para passar o status
  error.name = status;
  error.message = messageError;
  throw error;
};

export default throwError;
