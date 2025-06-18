export const HTTP_STATUS = {
  OK: 200 as const,
  CREATED: 201 as const,
  ACCEPTED: 202 as const,
  NO_CONTENT: 204 as const,
  BAD_REQUEST: 400 as const,
  UNAUTHORIZED: 401 as const,
  FORBIDDEN: 403 as const,
  NOT_FOUND: 404 as const,
  METHOD_NOT_ALLOWED: 405 as const,
  CONFLICT: 409 as const,
  INTERNAL_SERVER_ERROR: 500 as const,
  SERVICE_UNAVAILABLE: 503 as const,
};

export type HttpStatus = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];
