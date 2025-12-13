/**
 * Base error class for all Coolify SDK errors
 */
export class CoolifyError extends Error {
  public readonly statusCode?: number;
  public readonly response?: unknown;

  constructor(message: string, statusCode?: number, response?: unknown) {
    super(message);
    this.name = 'CoolifyError';
    this.statusCode = statusCode;
    this.response = response;
    Object.setPrototypeOf(this, CoolifyError.prototype);
  }
}

/**
 * Error thrown when authentication fails (401)
 */
export class CoolifyAuthError extends CoolifyError {
  constructor(message = 'Authentication failed. Please check your API token.') {
    super(message, 401);
    this.name = 'CoolifyAuthError';
    Object.setPrototypeOf(this, CoolifyAuthError.prototype);
  }
}

/**
 * Error thrown when a resource is not found (404)
 */
export class CoolifyNotFoundError extends CoolifyError {
  constructor(resource: string, id?: string) {
    const message = id
      ? `${resource} with id '${id}' not found`
      : `${resource} not found`;
    super(message, 404);
    this.name = 'CoolifyNotFoundError';
    Object.setPrototypeOf(this, CoolifyNotFoundError.prototype);
  }
}

/**
 * Error thrown when validation fails (422)
 */
export class CoolifyValidationError extends CoolifyError {
  public readonly errors?: Record<string, string[]>;

  constructor(message: string, errors?: Record<string, string[]>) {
    super(message, 422);
    this.name = 'CoolifyValidationError';
    this.errors = errors;
    Object.setPrototypeOf(this, CoolifyValidationError.prototype);
  }
}

/**
 * Error thrown when rate limit is exceeded (429)
 */
export class CoolifyRateLimitError extends CoolifyError {
  public readonly retryAfter?: number;

  constructor(retryAfter?: number) {
    super('Rate limit exceeded. Please try again later.', 429);
    this.name = 'CoolifyRateLimitError';
    this.retryAfter = retryAfter;
    Object.setPrototypeOf(this, CoolifyRateLimitError.prototype);
  }
}

/**
 * Error thrown when the server returns an error (500+)
 */
export class CoolifyServerError extends CoolifyError {
  constructor(message = 'Internal server error', statusCode = 500) {
    super(message, statusCode);
    this.name = 'CoolifyServerError';
    Object.setPrototypeOf(this, CoolifyServerError.prototype);
  }
}
