import { HTTP_STATUS, HttpStatus } from './status-codes';

type Status = 'success' | 'fail';

interface BaseResponse {
  status: Status;
  message: string;
}

interface FailResponse extends BaseResponse {
  status: 'fail';
  errors?: unknown;
}

function createResponse(
  status: Status,
  message: string,
  payload: object = {},
  statusCode: HttpStatus
): Response {
  const body: BaseResponse & object = {
    status,
    message,
    ...(Object.keys(payload).length > 0 ? payload : {}),
  };

  return new Response(JSON.stringify(body), {
    status: statusCode,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function success<T extends object = object>(
  payload?: T,
  message = 'Request was successful'
): Response {
  return createResponse('success', message, payload ?? {}, HTTP_STATUS.OK);
}

export function created<T extends object = object>(
  payload?: T,
  message = 'Resource created successfully'
): Response {
  return createResponse('success', message, payload ?? {}, HTTP_STATUS.CREATED);
}

export function fail(
  message: string,
  statusCode: HttpStatus = HTTP_STATUS.BAD_REQUEST,
  errors?: unknown
): Response {
  const body: FailResponse = {
    status: 'fail',
    message,
    ...(errors !== undefined ? { errors } : {}),
  };
  return new Response(JSON.stringify(body), {
    status: statusCode,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Specific responses
export function notFound(message = 'Resource not found') {
  return fail(message, HTTP_STATUS.NOT_FOUND);
}

export function methodNotAllowed(message = 'Method not allowed') {
  return fail(message, HTTP_STATUS.METHOD_NOT_ALLOWED);
}

export function internalServerError(message = 'Internal Server Error') {
  return fail(message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
}

export function conflict(message = 'Conflict') {
  return fail(message, HTTP_STATUS.CONFLICT);
}

export function unauthorized(message = 'Unauthorized') {
  return fail(message, HTTP_STATUS.UNAUTHORIZED);
}

export function validationError(errors: unknown[] = []) {
  return fail('Validation failed', HTTP_STATUS.BAD_REQUEST, errors);
}

export function authenticationError(message = 'Authentication failed') {
  return fail(message, HTTP_STATUS.UNAUTHORIZED);
}

export function forbidden(message = 'Access forbidden') {
  return fail(message, HTTP_STATUS.FORBIDDEN);
}

export function badRequest(message = 'Bad request') {
  return fail(message, HTTP_STATUS.BAD_REQUEST);
}
