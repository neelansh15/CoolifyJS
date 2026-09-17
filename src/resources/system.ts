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
   * Check the health of the Coolify API.
   *
   * Current spec exposes `/health`; older installs use `/healthcheck`. This
   * method tries `/health` first and falls back to `/healthcheck` on 404.
   */
  async healthCheck(): Promise<HealthCheckResponse> {
    try {
      return await this.http.get<HealthCheckResponse>('/health');
    } catch (err: unknown) {
      const status = (err as { status?: number })?.status;
      if (status === 404) {
        return this.http.get<HealthCheckResponse>('/healthcheck');
      }
      throw err;
    }
  }

  /**
   * Direct healthcheck against the legacy `/healthcheck` path. Kept for
   * back-compat with older Coolify versions.
   */
  async healthCheckLegacy(): Promise<HealthCheckResponse> {
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
