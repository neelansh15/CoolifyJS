import type { HttpClient } from '../http';
import type { UUID } from '../types/common';
import type {
  CloudInitScript,
  CreateCloudInitScriptInput,
  UpdateCloudInitScriptInput,
} from '../types/cloud-init-scripts';

/**
 * Cloud-init Scripts resource for managing reusable server bootstrap scripts.
 *
 * These scripts are attached to servers created via cloud provisioning
 * endpoints (Hetzner/DigitalOcean/Vultr) and run on first boot.
 */
export class CloudInitScriptsResource {
  constructor(private readonly http: HttpClient) {}

  /** List all cloud-init scripts for the current team. */
  async list(): Promise<CloudInitScript[]> {
    return this.http.get<CloudInitScript[]>('/cloud-init-scripts');
  }

  /** Get a cloud-init script by UUID. */
  async get(uuid: UUID): Promise<CloudInitScript> {
    return this.http.get<CloudInitScript>(`/cloud-init-scripts/${uuid}`);
  }

  /** Create a cloud-init script. */
  async create(data: CreateCloudInitScriptInput): Promise<CloudInitScript> {
    return this.http.post<CloudInitScript>('/cloud-init-scripts', data);
  }

  /** Update a cloud-init script by UUID. */
  async update(uuid: UUID, data: UpdateCloudInitScriptInput): Promise<CloudInitScript> {
    return this.http.patch<CloudInitScript>(`/cloud-init-scripts/${uuid}`, data);
  }

  /** Delete a cloud-init script by UUID. */
  async delete(uuid: UUID): Promise<{ message?: string } | void> {
    return this.http.delete<{ message?: string }>(`/cloud-init-scripts/${uuid}`);
  }
}
