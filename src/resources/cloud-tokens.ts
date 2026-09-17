import type { HttpClient } from '../http';
import type { UUID, MessageResponse, UuidResponse } from '../types/common';
import type {
  CloudToken,
  CreateCloudTokenInput,
  UpdateCloudTokenInput,
  CloudTokenValidationResponse,
} from '../types/cloud-tokens';

/**
 * Cloud provider token management (Hetzner / DigitalOcean / Vultr).
 */
export class CloudTokensResource {
  constructor(private readonly http: HttpClient) {}

  /** List all cloud provider tokens for the current team. */
  async list(): Promise<CloudToken[]> {
    return this.http.get<CloudToken[]>('/cloud-tokens');
  }

  /** Get a cloud provider token by UUID. */
  async get(uuid: UUID): Promise<CloudToken> {
    return this.http.get<CloudToken>(`/cloud-tokens/${uuid}`);
  }

  /** Create a new cloud provider token. The token is validated before storage. */
  async create(data: CreateCloudTokenInput): Promise<UuidResponse> {
    return this.http.post<UuidResponse>('/cloud-tokens', data);
  }

  /** Update a cloud provider token (currently only the friendly name). */
  async update(uuid: UUID, data: UpdateCloudTokenInput): Promise<UuidResponse> {
    return this.http.patch<UuidResponse>(`/cloud-tokens/${uuid}`, data);
  }

  /** Delete a cloud provider token. Fails if the token is used by any servers. */
  async delete(uuid: UUID): Promise<MessageResponse> {
    return this.http.delete<MessageResponse>(`/cloud-tokens/${uuid}`);
  }

  /** Validate a cloud provider token against the provider API. */
  async validate(uuid: UUID): Promise<CloudTokenValidationResponse> {
    return this.http.post<CloudTokenValidationResponse>(`/cloud-tokens/${uuid}/validate`);
  }
}
