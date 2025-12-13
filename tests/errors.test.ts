import { describe, it, expect } from 'vitest';
import {
  CoolifyError,
  CoolifyAuthError,
  CoolifyNotFoundError,
  CoolifyValidationError,
  CoolifyRateLimitError,
  CoolifyServerError,
} from '../src/errors';

describe('Error classes', () => {
  describe('CoolifyError', () => {
    it('should create a base error', () => {
      const error = new CoolifyError('Something went wrong', 400, { data: 'test' });

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(CoolifyError);
      expect(error.name).toBe('CoolifyError');
      expect(error.message).toBe('Something went wrong');
      expect(error.statusCode).toBe(400);
      expect(error.response).toEqual({ data: 'test' });
    });

    it('should work without optional parameters', () => {
      const error = new CoolifyError('Basic error');

      expect(error.statusCode).toBeUndefined();
      expect(error.response).toBeUndefined();
    });
  });

  describe('CoolifyAuthError', () => {
    it('should create an auth error with default message', () => {
      const error = new CoolifyAuthError();

      expect(error).toBeInstanceOf(CoolifyError);
      expect(error).toBeInstanceOf(CoolifyAuthError);
      expect(error.name).toBe('CoolifyAuthError');
      expect(error.message).toBe('Authentication failed. Please check your API token.');
      expect(error.statusCode).toBe(401);
    });

    it('should create an auth error with custom message', () => {
      const error = new CoolifyAuthError('Token expired');

      expect(error.message).toBe('Token expired');
    });
  });

  describe('CoolifyNotFoundError', () => {
    it('should create a not found error with resource and id', () => {
      const error = new CoolifyNotFoundError('Application', 'app-123');

      expect(error).toBeInstanceOf(CoolifyError);
      expect(error).toBeInstanceOf(CoolifyNotFoundError);
      expect(error.name).toBe('CoolifyNotFoundError');
      expect(error.message).toBe("Application with id 'app-123' not found");
      expect(error.statusCode).toBe(404);
    });

    it('should create a not found error without id', () => {
      const error = new CoolifyNotFoundError('Database');

      expect(error.message).toBe('Database not found');
    });
  });

  describe('CoolifyValidationError', () => {
    it('should create a validation error with errors object', () => {
      const errors = {
        name: ['Name is required', 'Name must be at least 3 characters'],
        email: ['Email is invalid'],
      };
      const error = new CoolifyValidationError('Validation failed', errors);

      expect(error).toBeInstanceOf(CoolifyError);
      expect(error).toBeInstanceOf(CoolifyValidationError);
      expect(error.name).toBe('CoolifyValidationError');
      expect(error.message).toBe('Validation failed');
      expect(error.statusCode).toBe(422);
      expect(error.errors).toEqual(errors);
    });

    it('should work without errors object', () => {
      const error = new CoolifyValidationError('Invalid data');

      expect(error.errors).toBeUndefined();
    });
  });

  describe('CoolifyRateLimitError', () => {
    it('should create a rate limit error with retry after', () => {
      const error = new CoolifyRateLimitError(60);

      expect(error).toBeInstanceOf(CoolifyError);
      expect(error).toBeInstanceOf(CoolifyRateLimitError);
      expect(error.name).toBe('CoolifyRateLimitError');
      expect(error.message).toBe('Rate limit exceeded. Please try again later.');
      expect(error.statusCode).toBe(429);
      expect(error.retryAfter).toBe(60);
    });

    it('should work without retry after', () => {
      const error = new CoolifyRateLimitError();

      expect(error.retryAfter).toBeUndefined();
    });
  });

  describe('CoolifyServerError', () => {
    it('should create a server error with default values', () => {
      const error = new CoolifyServerError();

      expect(error).toBeInstanceOf(CoolifyError);
      expect(error).toBeInstanceOf(CoolifyServerError);
      expect(error.name).toBe('CoolifyServerError');
      expect(error.message).toBe('Internal server error');
      expect(error.statusCode).toBe(500);
    });

    it('should create a server error with custom values', () => {
      const error = new CoolifyServerError('Service unavailable', 503);

      expect(error.message).toBe('Service unavailable');
      expect(error.statusCode).toBe(503);
    });
  });
});
