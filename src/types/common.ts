/**
 * Configuration options for the Coolify client
 */
export interface CoolifyClientConfig {
  /** Base URL of the Coolify API (e.g., https://coolify.example.com/api/v1) */
  baseUrl: string;
  /** API token for authentication */
  token: string;
  /** Request timeout in milliseconds (default: 30000) */
  timeout?: number;
}

/**
 * HTTP methods supported by the SDK
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * Options for HTTP requests
 */
export interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  timeout?: number;
}

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

/**
 * Paginated API response
 */
export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
}

/**
 * Common pagination parameters
 */
export interface PaginationParams {
  page?: number;
  per_page?: number;
}

/**
 * UUID type for resource identifiers
 */
export type UUID = string;

/**
 * Common status values
 */
export type ResourceStatus = 
  | 'running'
  | 'stopped'
  | 'starting'
  | 'stopping'
  | 'restarting'
  | 'exited'
  | 'degraded';

/**
 * Common timestamp fields
 */
export interface Timestamps {
  created_at: string;
  updated_at: string;
}

/**
 * Message response for operations
 */
export interface MessageResponse {
  message: string;
}

/**
 * UUID response for creation operations
 */
export interface UuidResponse {
  uuid: string;
}

/**
 * Deployment response
 */
export interface DeploymentResponse {
  message: string;
  deployment_uuid?: string;
}

/**
 * Common environment variable structure
 */
export interface EnvironmentVariable {
  id?: number;
  uuid?: string;
  key: string;
  value: string;
  is_build_time?: boolean;
  is_preview?: boolean;
  is_literal?: boolean;
  is_multiline?: boolean;
  is_shown_once?: boolean;
}

/**
 * Create environment variable input
 */
export interface CreateEnvironmentVariable {
  key: string;
  value: string;
  is_build_time?: boolean;
  is_preview?: boolean;
  is_literal?: boolean;
  is_multiline?: boolean;
  is_shown_once?: boolean;
}

/**
 * Update environment variable input
 */
export interface UpdateEnvironmentVariable {
  key?: string;
  value?: string;
  is_build_time?: boolean;
  is_preview?: boolean;
  is_literal?: boolean;
  is_multiline?: boolean;
  is_shown_once?: boolean;
}

/**
 * Bulk update environment variables input
 */
export interface BulkUpdateEnvironmentVariables {
  data: CreateEnvironmentVariable[];
}
