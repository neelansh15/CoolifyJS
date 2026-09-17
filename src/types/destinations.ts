import type { UUID, Timestamps } from './common';

/**
 * Destination type — either a standalone Docker daemon or a Docker Swarm.
 */
export type DestinationType = 'standalone' | 'swarm';

/**
 * A Docker network destination attached to a server.
 */
export interface Destination extends Partial<Timestamps> {
  uuid: UUID;
  name?: string;
  network: string;
  type?: DestinationType;
  server_uuid?: UUID;
}

/**
 * Input for creating a destination on a server.
 */
export interface CreateDestinationInput {
  /** Optional display name. */
  name?: string;
  /** Docker network name. Required. Must match `^[a-zA-Z0-9][a-zA-Z0-9._-]*$`. */
  network: string;
  /** Standalone or swarm. Defaults to standalone. */
  type?: DestinationType;
}

/**
 * Update input — only `name` can be changed via API.
 */
export interface UpdateDestinationInput {
  name?: string;
}
