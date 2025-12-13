import type { HttpClient } from '../http';
import type { UUID, MessageResponse, UuidResponse } from '../types/common';
import type {
  Server,
  CreateServer,
  UpdateServer,
  ServerResources,
  ServerDomains,
  ValidateServerResponse,
} from '../types/servers';

/**
 * Servers resource for managing Coolify servers
 */
export class ServersResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * List all servers
   */
  async list(): Promise<Server[]> {
    return this.http.get<Server[]>('/servers');
  }

  /**
   * Get a specific server by UUID
   */
  async get(uuid: UUID): Promise<Server> {
    return this.http.get<Server>(`/servers/${uuid}`);
  }

  /**
   * Create a new server
   */
  async create(data: CreateServer): Promise<UuidResponse> {
    return this.http.post<UuidResponse>('/servers', data);
  }

  /**
   * Update a server
   */
  async update(uuid: UUID, data: UpdateServer): Promise<Server> {
    return this.http.patch<Server>(`/servers/${uuid}`, data);
  }

  /**
   * Delete a server
   */
  async delete(uuid: UUID): Promise<MessageResponse> {
    return this.http.delete<MessageResponse>(`/servers/${uuid}`);
  }

  /**
   * Get resources on a server
   */
  async getResources(uuid: UUID): Promise<ServerResources> {
    return this.http.get<ServerResources>(`/servers/${uuid}/resources`);
  }

  /**
   * Get domains configured on a server
   */
  async getDomains(uuid: UUID): Promise<ServerDomains> {
    return this.http.get<ServerDomains>(`/servers/${uuid}/domains`);
  }

  /**
   * Validate a server connection
   */
  async validate(uuid: UUID): Promise<ValidateServerResponse> {
    return this.http.post<ValidateServerResponse>(`/servers/${uuid}/validate`);
  }
}
