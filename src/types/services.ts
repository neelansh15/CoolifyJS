import type { UUID, Timestamps, ResourceStatus, EnvironmentVariable } from './common';

/**
 * Service entity
 */
export interface Service extends Timestamps {
  id: number;
  uuid: UUID;
  name: string;
  description?: string;
  docker_compose_raw?: string;
  docker_compose?: string;
  status: ResourceStatus;
  destination_type?: string;
  destination_id?: number;
  environment_id: number;
  project_uuid?: UUID;
  environment_name?: string;
  server_id?: number;
  connect_to_docker_network?: boolean;
}

/**
 * Create service input
 */
export interface CreateService {
  project_uuid: UUID;
  server_uuid: UUID;
  environment_name?: string;
  destination_uuid?: UUID;
  type: string;
  name?: string;
  description?: string;
  instant_deploy?: boolean;
}

/**
 * Update service input
 */
export interface UpdateService {
  name?: string;
  description?: string;
  docker_compose_raw?: string;
}

/**
 * Service environment variables response
 */
export interface ServiceEnvs {
  envs: EnvironmentVariable[];
}

/**
 * Predefined service type
 */
export interface ServiceType {
  name: string;
  description?: string;
  logo?: string;
  minversion?: string;
  documentation?: string;
}
