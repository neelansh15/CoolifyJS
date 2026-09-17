import type { Timestamps } from './common';

/**
 * Scope of a shared environment variable.
 */
export type SharedEnvType = 'team' | 'project' | 'environment' | 'server';

/**
 * Shared environment variable entity.
 *
 * These variables live outside of individual applications and databases and
 * can be referenced by them via `{{team.KEY}}`, `{{project.KEY}}`,
 * `{{environment.KEY}}`, or `{{server.KEY}}` interpolation.
 */
export interface SharedEnv extends Partial<Timestamps> {
  id: number;
  uuid?: string;
  team_id?: number;
  type?: SharedEnvType;
  key: string;
  value: string | null;
  is_literal?: boolean;
  is_multiline?: boolean;
  is_shown_once?: boolean;
  comment?: string | null;
}

/**
 * Create shared env input (shape shared across team/project/environment/server endpoints).
 */
export interface CreateSharedEnvInput {
  key: string;
  value?: string | null;
  is_literal?: boolean;
  is_multiline?: boolean;
  is_shown_once?: boolean;
  comment?: string | null;
}

/**
 * Update shared env input (all fields optional).
 */
export interface UpdateSharedEnvInput {
  key?: string;
  value?: string | null;
  is_literal?: boolean;
  is_multiline?: boolean;
  is_shown_once?: boolean;
  comment?: string | null;
}
