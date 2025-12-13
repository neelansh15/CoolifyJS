import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { HttpClient } from '../src/http';
import {
  CoolifyError,
  CoolifyAuthError,
  CoolifyNotFoundError,
  CoolifyValidationError,
  CoolifyRateLimitError,
  CoolifyServerError,
} from '../src/errors';

describe('HttpClient', () => {
  const baseUrl = 'https://coolify.example.com/api/v1';
  const token = 'test-token';
  let client: HttpClient;

  beforeEach(() => {
    client = new HttpClient({ baseUrl, token });
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should strip trailing slashes from base URL', () => {
      const clientWithSlash = new HttpClient({
        baseUrl: 'https://coolify.example.com/api/v1/',
        token,
      });
      expect(clientWithSlash).toBeDefined();
    });
  });

  describe('request', () => {
    it('should make a successful GET request', async () => {
      const mockData = { id: 1, name: 'Test' };
      vi.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockData)),
      } as Response);

      const result = await client.get<typeof mockData>('/test');

      expect(fetch).toHaveBeenCalledWith(
        `${baseUrl}/test`,
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }),
        })
      );
      expect(result).toEqual(mockData);
    });

    it('should make a POST request with body', async () => {
      const mockData = { uuid: 'test-uuid' };
      const body = { name: 'Test App' };
      vi.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockData)),
      } as Response);

      const result = await client.post<typeof mockData>('/applications', body);

      expect(fetch).toHaveBeenCalledWith(
        `${baseUrl}/applications`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(body),
        })
      );
      expect(result).toEqual(mockData);
    });

    it('should handle empty responses', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(''),
      } as Response);

      const result = await client.delete('/test');

      expect(result).toEqual({});
    });

    it('should throw CoolifyAuthError on 401', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        json: () => Promise.resolve({ message: 'Invalid token' }),
      } as Response);

      await expect(client.get('/test')).rejects.toThrow(CoolifyAuthError);
    });

    it('should throw CoolifyNotFoundError on 404', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: () => Promise.resolve({ message: 'Resource not found' }),
      } as Response);

      await expect(client.get('/test')).rejects.toThrow(CoolifyNotFoundError);
    });

    it('should throw CoolifyValidationError on 422', async () => {
      const validationErrors = { name: ['Name is required'] };
      vi.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: false,
        status: 422,
        statusText: 'Unprocessable Entity',
        json: () => Promise.resolve({ message: 'Validation failed', errors: validationErrors }),
      } as Response);

      await expect(client.post('/test', {})).rejects.toThrow(CoolifyValidationError);
    });

    it('should throw CoolifyRateLimitError on 429', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: false,
        status: 429,
        statusText: 'Too Many Requests',
        headers: new Headers({ 'Retry-After': '60' }),
        json: () => Promise.resolve({}),
      } as Response);

      await expect(client.get('/test')).rejects.toThrow(CoolifyRateLimitError);
    });

    it('should throw CoolifyServerError on 500', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: () => Promise.resolve({ message: 'Something went wrong' }),
      } as Response);

      await expect(client.get('/test')).rejects.toThrow(CoolifyServerError);
    });

    it('should throw CoolifyError on request timeout', async () => {
      vi.spyOn(global, 'fetch').mockImplementationOnce(() => {
        const error = new Error('Aborted');
        error.name = 'AbortError';
        return Promise.reject(error);
      });

      await expect(client.get('/test')).rejects.toThrow(CoolifyError);
    });
  });

  describe('HTTP methods', () => {
    beforeEach(() => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('{}'),
      } as Response);
    });

    it('should make PUT request', async () => {
      await client.put('/test', { data: 'test' });

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ method: 'PUT' })
      );
    });

    it('should make PATCH request', async () => {
      await client.patch('/test', { data: 'test' });

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ method: 'PATCH' })
      );
    });

    it('should make DELETE request', async () => {
      await client.delete('/test');

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ method: 'DELETE' })
      );
    });
  });
});
