import type { HttpClient } from '../http';
import type { CreateCloudServerResponse } from '../types/cloud-providers';

/**
 * Vultr provisioning helpers (catalog lookups + server creation).
 */
export class VultrResource {
  constructor(private readonly http: HttpClient) {}

  /** List Vultr regions. */
  async listRegions<T = unknown>(): Promise<T> {
    return this.http.get<T>('/vultr/regions');
  }

  /** List Vultr plans. */
  async listPlans<T = unknown>(): Promise<T> {
    return this.http.get<T>('/vultr/plans');
  }

  /** List Vultr operating systems. */
  async listOperatingSystems<T = unknown>(): Promise<T> {
    return this.http.get<T>('/vultr/os');
  }

  /** List Vultr SSH keys available to the selected token. */
  async listSshKeys<T = unknown>(): Promise<T> {
    return this.http.get<T>('/vultr/ssh-keys');
  }

  /**
   * Create a Vultr instance and register it as a Coolify server.
   */
  async createServer(
    data: Record<string, unknown>
  ): Promise<CreateCloudServerResponse> {
    return this.http.post<CreateCloudServerResponse>('/servers/vultr', data);
  }
}
