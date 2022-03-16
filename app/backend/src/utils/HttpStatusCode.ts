enum HttpStatusCode {
  Ok = 200,
  Created,
  NoContent = 204,
  BadRequest = 400,
  NotAuthorized,
  NotFound = 404,
  Conflict = 409,
  InternalServerError = 500,
}

export default HttpStatusCode;
