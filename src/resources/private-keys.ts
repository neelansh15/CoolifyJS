import type { HttpClient } from '../http';
import type { UUID, MessageResponse, UuidResponse } from '../types/common';
import type { PrivateKey, CreatePrivateKey, UpdatePrivateKey } from '../types/private-keys';

/**
 * Private Keys resource for managing Coolify SSH keys
 */
export class PrivateKeysResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * List all private keys
   */
  async list(): Promise<PrivateKey[]> {
    return this.http.get<PrivateKey[]>('/private-keys');
  }

  /**
   * Get a specific private key by UUID
   */
  async get(uuid: UUID): Promise<PrivateKey> {
    return this.http.get<PrivateKey>(`/private-keys/${uuid}`);
  }

  /**
   * Create a new private key
   */
  async create(data: CreatePrivateKey): Promise<UuidResponse> {
    return this.http.post<UuidResponse>('/private-keys', data);
  }

  /**
   * Update a private key
   */
  async update(uuid: UUID, data: UpdatePrivateKey): Promise<PrivateKey> {
    return this.http.patch<PrivateKey>(`/private-keys/${uuid}`, data);
  }

  /**
   * Delete a private key
   */
  async delete(uuid: UUID): Promise<MessageResponse> {
    return this.http.delete<MessageResponse>(`/private-keys/${uuid}`);
  }
}
