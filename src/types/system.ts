/**
 * System version response
 */
export interface VersionResponse {
  version: string;
}

/**
 * Health check response
 */
export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy';
  message?: string;
}

/**
 * API status response
 */
export interface ApiStatusResponse {
  enabled: boolean;
}

/**
 * Enable/Disable API response
 */
export interface ToggleApiResponse {
  message: string;
}
