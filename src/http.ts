import type { CoolifyClientConfig, RequestOptions } from './types/common';
import {
  CoolifyError,
  CoolifyAuthError,
  CoolifyNotFoundError,
  CoolifyValidationError,
  CoolifyRateLimitError,
  CoolifyServerError,
} from './errors';

/**
 * HTTP client for making requests to the Coolify API
 */
export class HttpClient {
  private readonly baseUrl: string;
  private readonly token: string;
  private readonly timeout: number;

  constructor(config: CoolifyClientConfig) {
    // Remove trailing slash from base URL
    this.baseUrl = config.baseUrl.replace(/\/+$/, '');
    this.token = config.token;
    this.timeout = config.timeout ?? 30000;
  }

  /**
   * Get default headers for requests
   */
  private getHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    return {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...customHeaders,
    };
  }

  /**
   * Build full URL from path
   */
  private buildUrl(path: string): string {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${this.baseUrl}${normalizedPath}`;
  }

  /**
   * Handle error responses
   */
  private async handleError(response: Response): Promise<never> {
    let body: unknown;
    try {
      body = await response.json();
    } catch {
      body = await response.text().catch(() => null);
    }

    const message = this.extractErrorMessage(body) || response.statusText;

    switch (response.status) {
      case 401:
        throw new CoolifyAuthError(message);
      case 404:
        throw new CoolifyNotFoundError('Resource', undefined);
      case 422:
        throw new CoolifyValidationError(
          message,
          this.extractValidationErrors(body)
        );
      case 429:
        throw new CoolifyRateLimitError(
          this.extractRetryAfter(response)
        );
      default:
        if (response.status >= 500) {
          throw new CoolifyServerError(message, response.status);
        }
        throw new CoolifyError(message, response.status, body);
    }
  }

  /**
   * Extract error message from response body
   */
  private extractErrorMessage(body: unknown): string | undefined {
    if (typeof body === 'string') return body;
    if (body && typeof body === 'object') {
      const obj = body as Record<string, unknown>;
      if (typeof obj.message === 'string') return obj.message;
      if (typeof obj.error === 'string') return obj.error;
    }
    return undefined;
  }

  /**
   * Extract validation errors from response body
   */
  private extractValidationErrors(body: unknown): Record<string, string[]> | undefined {
    if (body && typeof body === 'object') {
      const obj = body as Record<string, unknown>;
      if (obj.errors && typeof obj.errors === 'object') {
        return obj.errors as Record<string, string[]>;
      }
    }
    return undefined;
  }

  /**
   * Extract retry-after header value
   */
  private extractRetryAfter(response: Response): number | undefined {
    const retryAfter = response.headers.get('Retry-After');
    if (retryAfter) {
      const seconds = parseInt(retryAfter, 10);
      if (!isNaN(seconds)) return seconds;
    }
    return undefined;
  }

  /**
   * Make an HTTP request
   */
  async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, headers, timeout = this.timeout } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(this.buildUrl(path), {
        method,
        headers: this.getHeaders(headers),
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      if (!response.ok) {
        await this.handleError(response);
      }

      // Handle empty responses
      const text = await response.text();
      if (!text) {
        return {} as T;
      }

      return JSON.parse(text) as T;
    } catch (error) {
      if (error instanceof CoolifyError) {
        throw error;
      }
      if (error instanceof Error && error.name === 'AbortError') {
        throw new CoolifyError('Request timeout', 408);
      }
      throw new CoolifyError(
        error instanceof Error ? error.message : 'Unknown error occurred'
      );
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Make a GET request
   */
  async get<T>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(path, { ...options, method: 'GET' });
  }

  /**
   * Make a POST request
   */
  async post<T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(path, { ...options, method: 'POST', body });
  }

  /**
   * Make a PUT request
   */
  async put<T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(path, { ...options, method: 'PUT', body });
  }

  /**
   * Make a PATCH request
   */
  async patch<T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(path, { ...options, method: 'PATCH', body });
  }

  /**
   * Make a DELETE request
   */
  async delete<T>(path: string, options?: Omit<RequestOptions, 'method'>): Promise<T> {
    return this.request<T>(path, { ...options, method: 'DELETE' });
  }
}
