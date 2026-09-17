import type { UUID, Timestamps } from './common';

/**
 * S3 storage configuration.
 */
export interface S3Storage extends Partial<Timestamps> {
  uuid: UUID;
  name: string;
  description?: string | null;
  endpoint: string;
  bucket: string;
  region: string;
  is_usable?: boolean;
  team_id?: number;
}

/**
 * Create S3 storage input.
 */
export interface CreateS3StorageInput {
  name: string;
  description?: string | null;
  endpoint: string;
  bucket: string;
  region: string;
  key: string;
  secret: string;
  is_usable?: boolean;
}

/**
 * Update S3 storage input.
 */
export interface UpdateS3StorageInput {
  name?: string;
  description?: string | null;
  endpoint?: string;
  bucket?: string;
  region?: string;
  key?: string;
  secret?: string;
  is_usable?: boolean;
}

/**
 * S3 storage validation response.
 */
export interface S3StorageValidationResponse {
  valid: boolean;
  message: string;
}
