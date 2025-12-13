import type { UUID, Timestamps } from './common';

/**
 * Private key entity
 */
export interface PrivateKey extends Timestamps {
  id: number;
  uuid: UUID;
  name: string;
  description?: string;
  private_key: string;
  is_git_related?: boolean;
  team_id?: number;
}

/**
 * Create private key input
 */
export interface CreatePrivateKey {
  name: string;
  description?: string;
  private_key: string;
}

/**
 * Update private key input
 */
export interface UpdatePrivateKey {
  name?: string;
  description?: string;
  private_key?: string;
}
