import type { HttpClient } from '../http';
import type { UUID, MessageResponse, UuidResponse } from '../types/common';
import type {
  S3Storage,
  CreateS3StorageInput,
  UpdateS3StorageInput,
  S3StorageValidationResponse,
} from '../types/s3-storages';

/**
 * S3 storages resource. Configurations may be used as backup targets for
 * databases and application/service persistent storages.
 */
export class S3StoragesResource {
  constructor(private readonly http: HttpClient) {}

  /** List all S3 storages for the current team. */
  async list(): Promise<S3Storage[]> {
    return this.http.get<S3Storage[]>('/s3-storages');
  }

  /** Get an S3 storage by UUID. */
  async get(uuid: UUID): Promise<S3Storage> {
    return this.http.get<S3Storage>(`/s3-storages/${uuid}`);
  }

  /** Create a new S3 storage. */
  async create(data: CreateS3StorageInput): Promise<UuidResponse> {
    return this.http.post<UuidResponse>('/s3-storages', data);
  }

  /** Update an S3 storage by UUID. */
  async update(uuid: UUID, data: UpdateS3StorageInput): Promise<UuidResponse> {
    return this.http.patch<UuidResponse>(`/s3-storages/${uuid}`, data);
  }

  /** Delete an S3 storage by UUID. */
  async delete(uuid: UUID): Promise<MessageResponse> {
    return this.http.delete<MessageResponse>(`/s3-storages/${uuid}`);
  }

  /** Validate an S3 storage connection. */
  async validate(uuid: UUID): Promise<S3StorageValidationResponse> {
    return this.http.post<S3StorageValidationResponse>(`/s3-storages/${uuid}/validate`);
  }
}
