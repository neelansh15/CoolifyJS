import type { HttpClient } from '../http';
import type { UUID, MessageResponse, UuidResponse } from '../types/common';
import type { PrivateKey, CreatePrivateKey, UpdatePrivateKey } from '../types/private-keys';

/**
 * Security Keys resource (SSH private keys) exposed under `/security/keys`.
 *
 * The current Coolify API prefers this path over the older `/private-keys`
 * routes surfaced by {@link PrivateKeysResource}. Both are kept available so
 * existing callers don't break.
 */
export class SecurityKeysResource {
  constructor(private readonly http: HttpClient) {}

  /** List all private keys. */
  async list(): Promise<PrivateKey[]> {
    return this.http.get<PrivateKey[]>('/security/keys');
  }

  /** Get a private key by UUID. */
  async get(uuid: UUID): Promise<PrivateKey> {
    return this.http.get<PrivateKey>(`/security/keys/${uuid}`);
  }

  /** Create a new private key. */
  async create(data: CreatePrivateKey): Promise<UuidResponse> {
    return this.http.post<UuidResponse>('/security/keys', data);
  }

  /** Update a private key. */
  async update(data: UpdatePrivateKey): Promise<UuidResponse> {
    return this.http.patch<UuidResponse>('/security/keys', data);
  }

  /** Delete a private key by UUID. Fails if the key is in use. */
  async delete(uuid: UUID): Promise<MessageResponse> {
    return this.http.delete<MessageResponse>(`/security/keys/${uuid}`);
  }
}
