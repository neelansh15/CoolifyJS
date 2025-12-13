import type { HttpClient } from '../http';
import type {
  VersionResponse,
  HealthCheckResponse,
  ToggleApiResponse,
} from '../types/system';

/**
 * System resource for Coolify system operations
 */
export class SystemResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * Get the Coolify version
   */
  async version(): Promise<VersionResponse> {
    return this.http.get<VersionResponse>('/version');
  }

  /**
   * Check the health of the Coolify API
   */
  async healthCheck(): Promise<HealthCheckResponse> {
    return this.http.get<HealthCheckResponse>('/healthcheck');
  }

  /**
   * Enable the Coolify API
   */
  async enableApi(): Promise<ToggleApiResponse> {
    return this.http.post<ToggleApiResponse>('/enable');
  }

  /**
   * Disable the Coolify API
   */
  async disableApi(): Promise<ToggleApiResponse> {
    return this.http.post<ToggleApiResponse>('/disable');
  }
}
