import type { UUID, Timestamps } from './common';

/**
 * Deployment status
 */
export type DeploymentStatus =
  | 'queued'
  | 'in_progress'
  | 'finished'
  | 'failed'
  | 'cancelled';

/**
 * Deployment entity
 */
export interface Deployment extends Timestamps {
  id: number;
  uuid: UUID;
  application_id: number;
  application_uuid?: UUID;
  application_name?: string;
  deployment_uuid: UUID;
  pull_request_id?: number;
  force_rebuild?: boolean;
  commit?: string;
  commit_message?: string;
  status: DeploymentStatus;
  is_webhook?: boolean;
  logs?: string;
  current_process_id?: string;
  restart_only?: boolean;
  git_type?: string;
  only_this?: boolean;
  rollback?: boolean;
  server_id?: number;
  server_name?: string;
}

/**
 * Deploy application input
 */
export interface DeployApplicationInput {
  /** Force rebuild without cache */
  force?: boolean;
  /** Instant deploy (skip build) */
  instant_deploy?: boolean;
}

/**
 * List deployments response
 */
export interface ListDeploymentsResponse {
  deployments: Deployment[];
}

/**
 * Application deployments list
 */
export interface ApplicationDeployments {
  deployments: Deployment[];
}
