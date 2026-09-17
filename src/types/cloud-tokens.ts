import type { UUID, Timestamps } from './common';

/**
 * Cloud provider supported by Coolify's server provisioning.
 */
export type CloudProvider = 'hetzner' | 'digitalocean' | 'vultr';

/**
 * Stored cloud provider API token.
 */
export interface CloudToken extends Partial<Timestamps> {
  uuid: UUID;
  name: string;
  provider: CloudProvider;
  team_id?: number;
  servers_count?: number;
}

/**
 * Create cloud provider token input.
 */
export interface CreateCloudTokenInput {
  provider: CloudProvider;
  token: string;
  name: string;
}

/**
 * Update cloud provider token input.
 */
export interface UpdateCloudTokenInput {
  name?: string;
}

/**
 * Cloud provider token validation response.
 */
export interface CloudTokenValidationResponse {
  valid: boolean;
  message: string;
}
