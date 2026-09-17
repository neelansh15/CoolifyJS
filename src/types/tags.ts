import type { UUID, Timestamps } from './common';

/**
 * Tag entity
 */
export interface Tag extends Partial<Timestamps> {
  id?: number;
  uuid: UUID;
  name: string;
  team_id?: number;
}

/**
 * Create tag input
 */
export interface CreateTagInput {
  name: string;
}

/**
 * Update tag input
 */
export interface UpdateTagInput {
  name: string;
}
