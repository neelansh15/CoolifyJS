import type { HttpClient } from '../http';
import type {
  CloudProviderTokenQuery,
  CreateCloudServerResponse,
} from '../types/cloud-providers';

function buildQuery(params?: CloudProviderTokenQuery): string {
  if (!params) return '';
  const search = new URLSearchParams();
  if (params.cloud_provider_token_uuid) {
    search.set('cloud_provider_token_uuid', params.cloud_provider_token_uuid);
  }
  if (params.cloud_provider_token_id) {
    search.set('cloud_provider_token_id', params.cloud_provider_token_id);
  }
  const q = search.toString();
  return q ? `?${q}` : '';
}

/**
 * DigitalOcean provisioning helpers (catalog lookups + server creation).
 */
export class DigitalOceanResource {
  constructor(private readonly http: HttpClient) {}

  /** List available DigitalOcean regions. */
  async listRegions<T = unknown>(params?: CloudProviderTokenQuery): Promise<T> {
    return this.http.get<T>(`/digitalocean/regions${buildQuery(params)}`);
  }

  /** List available DigitalOcean sizes. */
  async listSizes<T = unknown>(params?: CloudProviderTokenQuery): Promise<T> {
    return this.http.get<T>(`/digitalocean/sizes${buildQuery(params)}`);
  }

  /** List available DigitalOcean images. */
  async listImages<T = unknown>(params?: CloudProviderTokenQuery): Promise<T> {
    return this.http.get<T>(`/digitalocean/images${buildQuery(params)}`);
  }

  /** List DigitalOcean SSH keys available to the selected token. */
  async listSshKeys<T = unknown>(params?: CloudProviderTokenQuery): Promise<T> {
    return this.http.get<T>(`/digitalocean/ssh-keys${buildQuery(params)}`);
  }

  /**
   * Create a DigitalOcean droplet and link it to a Coolify server.
   * The exact payload shape is provider-specific; accepts any Record.
   */
  async createServer(
    data: Record<string, unknown>
  ): Promise<CreateCloudServerResponse> {
    return this.http.post<CreateCloudServerResponse>('/servers/digitalocean', data);
  }
}
