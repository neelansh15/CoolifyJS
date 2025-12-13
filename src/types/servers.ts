import type { UUID, Timestamps } from './common';

/**
 * Server validation status
 */
export type ServerValidationStatus = 'reachable' | 'unreachable' | 'unknown';

/**
 * Server entity
 */
export interface Server extends Timestamps {
  id: number;
  uuid: UUID;
  name: string;
  description?: string;
  ip: string;
  port?: number;
  user?: string;
  private_key_id?: number;
  proxy_type?: 'traefik' | 'caddy' | 'nginx' | 'none';
  is_reachable?: boolean;
  is_usable?: boolean;
  is_build_server?: boolean;
  is_swarm_manager?: boolean;
  is_swarm_worker?: boolean;
  settings?: ServerSettings;
}

/**
 * Server settings
 */
export interface ServerSettings {
  id: number;
  server_id: number;
  concurrent_builds?: number;
  dynamic_timeout?: number;
  is_build_server?: boolean;
  is_cloudflare_tunnel?: boolean;
  is_jump_server?: boolean;
  is_logdrain_axiom_enabled?: boolean;
  is_logdrain_custom_enabled?: boolean;
  is_logdrain_highlight_enabled?: boolean;
  is_logdrain_newrelic_enabled?: boolean;
  is_metrics_enabled?: boolean;
  is_reachable?: boolean;
  is_sentinel_enabled?: boolean;
  is_swarm_manager?: boolean;
  is_swarm_worker?: boolean;
  is_usable?: boolean;
}

/**
 * Create server input
 */
export interface CreateServer {
  name: string;
  description?: string;
  ip: string;
  port?: number;
  user?: string;
  private_key_uuid: UUID;
  is_build_server?: boolean;
  instant_validate?: boolean;
}

/**
 * Update server input
 */
export interface UpdateServer {
  name?: string;
  description?: string;
  ip?: string;
  port?: number;
  user?: string;
  private_key_uuid?: UUID;
  is_build_server?: boolean;
}

/**
 * Server resources
 */
export interface ServerResources {
  applications?: unknown[];
  databases?: unknown[];
  services?: unknown[];
}

/**
 * Server domains
 */
export interface ServerDomains {
  domains: string[];
}

/**
 * Validate server response
 */
export interface ValidateServerResponse {
  message: string;
  status: ServerValidationStatus;
}
