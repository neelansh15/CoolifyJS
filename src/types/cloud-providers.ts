import type { UUID } from './common';

/**
 * Query parameters used by cloud provider listing endpoints.
 * Either the token UUID (preferred) or the deprecated legacy ID may be supplied.
 */
export interface CloudProviderTokenQuery {
  /** Cloud provider token UUID. */
  cloud_provider_token_uuid?: UUID;
  /** @deprecated Use cloud_provider_token_uuid. */
  cloud_provider_token_id?: string;
}

/**
 * Hetzner datacenter location.
 */
export interface HetznerLocation {
  id: number;
  name: string;
  description?: string;
  country?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
}

/**
 * Hetzner server type (instance size).
 */
export interface HetznerServerType {
  id: number;
  name: string;
  description?: string;
  cores?: number;
  memory?: number;
  disk?: number;
  prices?: unknown[];
}

/** Hetzner OS image. */
export interface HetznerImage {
  id: number;
  name?: string;
  description?: string;
  type?: string;
  os_flavor?: string;
  os_version?: string;
  status?: string;
  [key: string]: unknown;
}

/** Hetzner SSH key. */
export interface HetznerSshKey {
  id: number;
  name?: string;
  fingerprint?: string;
  [key: string]: unknown;
}

/** Hetzner firewall. */
export interface HetznerFirewall {
  id: number;
  name?: string;
  [key: string]: unknown;
}

/** Hetzner private network. */
export interface HetznerNetwork {
  id: number;
  name: string;
  ip_range?: string;
  [key: string]: unknown;
}

/**
 * Input for creating a Hetzner server.
 */
export interface CreateHetznerServerInput {
  cloud_provider_token_uuid?: UUID;
  /** @deprecated Use cloud_provider_token_uuid. */
  cloud_provider_token_id?: string;
  location: string;
  server_type: string;
  image: number;
  name?: string;
  private_key_uuid: UUID;
  enable_ipv4?: boolean;
  enable_ipv6?: boolean;
  enable_backups?: boolean;
  hetzner_ssh_key_ids?: number[];
  hetzner_firewall_ids?: number[];
  hetzner_network_ids?: number[];
  cloud_init_script?: string;
  instant_validate?: boolean;
}

/**
 * Response returned after a Hetzner server is created.
 */
export interface CreateHetznerServerResponse {
  uuid: UUID;
  hetzner_server_id?: number;
  ip?: string;
}

/**
 * Generic response from DigitalOcean/Vultr server creation.
 * The exact shape depends on the provider; keep as loose record.
 */
export type CreateCloudServerResponse = Record<string, unknown> & { uuid?: UUID };

/**
 * Import server transfer bundle input (adopt mode by default).
 */
export interface ImportServerBundleInput {
  bundle: Record<string, unknown>;
  passphrase?: string | null;
  dry_run?: boolean;
  preserve_uuids?: boolean;
  adopt_mode?: boolean;
  claim?: boolean;
  write_remote?: boolean;
  rebind_sentinel?: boolean;
}
