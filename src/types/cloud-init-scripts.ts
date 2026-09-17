import type { UUID, Timestamps } from './common';

/**
 * Cloud-init script entity used to bootstrap cloud servers.
 *
 * The API only guarantees `uuid`, `name`, and `script`; other fields depend on
 * server-side model shape.
 */
export interface CloudInitScript extends Partial<Timestamps> {
  uuid: UUID;
  name: string;
  /** Bash script (starting with `#!`) or cloud-config YAML. */
  script: string;
  team_id?: number;
  [key: string]: unknown;
}

/**
 * Create cloud-init script input.
 */
export interface CreateCloudInitScriptInput {
  name: string;
  /** Bash script (`#!`) or cloud-config YAML. */
  script: string;
}

/**
 * Update cloud-init script input.
 */
export interface UpdateCloudInitScriptInput {
  name?: string;
  script?: string;
}
