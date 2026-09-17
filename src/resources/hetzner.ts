import type { HttpClient } from '../http';
import type {
  CloudProviderTokenQuery,
  HetznerLocation,
  HetznerServerType,
  HetznerImage,
  HetznerSshKey,
  HetznerFirewall,
  HetznerNetwork,
  CreateHetznerServerInput,
  CreateHetznerServerResponse,
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
 * Hetzner provisioning helpers (catalog lookups + server creation).
 */
export class HetznerResource {
  constructor(private readonly http: HttpClient) {}

  /** List Hetzner datacenter locations. */
  async listLocations(params?: CloudProviderTokenQuery): Promise<HetznerLocation[]> {
    return this.http.get<HetznerLocation[]>(`/hetzner/locations${buildQuery(params)}`);
  }

  /** List Hetzner server types. */
  async listServerTypes(params?: CloudProviderTokenQuery): Promise<HetznerServerType[]> {
    return this.http.get<HetznerServerType[]>(`/hetzner/server-types${buildQuery(params)}`);
  }

  /** List Hetzner system images. */
  async listImages(params?: CloudProviderTokenQuery): Promise<HetznerImage[]> {
    return this.http.get<HetznerImage[]>(`/hetzner/images${buildQuery(params)}`);
  }

  /** List Hetzner SSH keys. */
  async listSshKeys(params?: CloudProviderTokenQuery): Promise<HetznerSshKey[]> {
    return this.http.get<HetznerSshKey[]>(`/hetzner/ssh-keys${buildQuery(params)}`);
  }

  /** List Hetzner firewalls. */
  async listFirewalls(params?: CloudProviderTokenQuery): Promise<HetznerFirewall[]> {
    return this.http.get<HetznerFirewall[]>(`/hetzner/firewalls${buildQuery(params)}`);
  }

  /** List Hetzner private networks. */
  async listNetworks(params?: CloudProviderTokenQuery): Promise<HetznerNetwork[]> {
    return this.http.get<HetznerNetwork[]>(`/hetzner/networks${buildQuery(params)}`);
  }

  /** Create a Hetzner server and register it in Coolify. */
  async createServer(data: CreateHetznerServerInput): Promise<CreateHetznerServerResponse> {
    return this.http.post<CreateHetznerServerResponse>('/servers/hetzner', data);
  }
}
