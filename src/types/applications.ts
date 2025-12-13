import type { UUID, Timestamps, ResourceStatus, EnvironmentVariable } from './common';

/**
 * Application build pack types
 */
export type BuildPack =
  | 'nixpacks'
  | 'dockerfile'
  | 'dockercompose'
  | 'dockerimage'
  | 'static';

/**
 * Application source type
 */
export type ApplicationSourceType =
  | 'github'
  | 'gitlab'
  | 'bitbucket'
  | 'git'
  | 'dockerimage'
  | 'dockercompose';

/**
 * Application entity
 */
export interface Application extends Timestamps {
  id: number;
  uuid: UUID;
  name: string;
  description?: string;
  fqdn?: string;
  repository_project_id?: number;
  git_repository?: string;
  git_branch?: string;
  git_commit_sha?: string;
  git_full_url?: string;
  docker_registry_image_name?: string;
  docker_registry_image_tag?: string;
  build_pack: BuildPack;
  static_image?: string;
  install_command?: string;
  build_command?: string;
  start_command?: string;
  ports_exposes?: string;
  ports_mappings?: string;
  base_directory?: string;
  publish_directory?: string;
  dockerfile?: string;
  dockerfile_location?: string;
  dockerfile_target_build?: string;
  docker_compose?: string;
  docker_compose_location?: string;
  docker_compose_custom_start_command?: string;
  docker_compose_custom_build_command?: string;
  docker_compose_domains?: string;
  custom_labels?: string;
  custom_docker_run_options?: string;
  post_deployment_command?: string;
  post_deployment_command_container?: string;
  pre_deployment_command?: string;
  pre_deployment_command_container?: string;
  watch_paths?: string;
  custom_healthcheck_found?: boolean;
  manual_webhook_secret_github?: string;
  manual_webhook_secret_gitlab?: string;
  manual_webhook_secret_bitbucket?: string;
  manual_webhook_secret_gitea?: string;
  redirect?: string;
  preview_url_template?: string;
  health_check_enabled?: boolean;
  health_check_path?: string;
  health_check_port?: string;
  health_check_host?: string;
  health_check_method?: string;
  health_check_return_code?: number;
  health_check_scheme?: string;
  health_check_response_text?: string;
  health_check_interval?: number;
  health_check_timeout?: number;
  health_check_retries?: number;
  health_check_start_period?: number;
  limits_memory?: string;
  limits_memory_swap?: string;
  limits_memory_swappiness?: number;
  limits_memory_reservation?: string;
  limits_cpus?: string;
  limits_cpuset?: string;
  limits_cpu_shares?: number;
  status: ResourceStatus;
  destination_type?: string;
  destination_id?: number;
  source_type?: ApplicationSourceType;
  source_id?: number;
  private_key_id?: number;
  environment_id: number;
  project_uuid?: UUID;
  environment_name?: string;
}

/**
 * Create application from public repository
 */
export interface CreatePublicApplication {
  project_uuid: UUID;
  server_uuid: UUID;
  environment_name?: string;
  destination_uuid?: UUID;
  git_repository: string;
  git_branch: string;
  git_commit_sha?: string;
  build_pack?: BuildPack;
  ports_exposes?: string;
  name?: string;
  description?: string;
  domains?: string;
  instant_deploy?: boolean;
}

/**
 * Create application from private repository (GitHub App)
 */
export interface CreatePrivateGitHubAppApplication {
  project_uuid: UUID;
  server_uuid: UUID;
  environment_name?: string;
  destination_uuid?: UUID;
  github_app_uuid: UUID;
  git_repository: string;
  git_branch: string;
  git_commit_sha?: string;
  build_pack?: BuildPack;
  ports_exposes?: string;
  name?: string;
  description?: string;
  domains?: string;
  instant_deploy?: boolean;
}

/**
 * Create application from private repository (deploy key)
 */
export interface CreatePrivateDeployKeyApplication {
  project_uuid: UUID;
  server_uuid: UUID;
  environment_name?: string;
  destination_uuid?: UUID;
  private_key_uuid: UUID;
  git_repository: string;
  git_branch: string;
  git_commit_sha?: string;
  build_pack?: BuildPack;
  ports_exposes?: string;
  name?: string;
  description?: string;
  domains?: string;
  instant_deploy?: boolean;
}

/**
 * Create application from Dockerfile
 */
export interface CreateDockerfileApplication {
  project_uuid: UUID;
  server_uuid: UUID;
  environment_name?: string;
  destination_uuid?: UUID;
  dockerfile: string;
  name?: string;
  description?: string;
  domains?: string;
  ports_exposes?: string;
  instant_deploy?: boolean;
}

/**
 * Create application from Docker image
 */
export interface CreateDockerImageApplication {
  project_uuid: UUID;
  server_uuid: UUID;
  environment_name?: string;
  destination_uuid?: UUID;
  docker_registry_image_name: string;
  docker_registry_image_tag?: string;
  name?: string;
  description?: string;
  domains?: string;
  ports_exposes?: string;
  instant_deploy?: boolean;
  limits_memory?: string;
  limits_cpus?: string;
}

/**
 * Create application from Docker Compose
 */
export interface CreateDockerComposeApplication {
  project_uuid: UUID;
  server_uuid: UUID;
  environment_name?: string;
  destination_uuid?: UUID;
  docker_compose_raw: string;
  name?: string;
  description?: string;
  instant_deploy?: boolean;
}

/**
 * Update application input
 */
export interface UpdateApplication {
  name?: string;
  description?: string;
  domains?: string;
  git_repository?: string;
  git_branch?: string;
  git_commit_sha?: string;
  docker_registry_image_name?: string;
  docker_registry_image_tag?: string;
  build_pack?: BuildPack;
  static_image?: string;
  install_command?: string;
  build_command?: string;
  start_command?: string;
  ports_exposes?: string;
  ports_mappings?: string;
  base_directory?: string;
  publish_directory?: string;
  dockerfile?: string;
  dockerfile_location?: string;
  dockerfile_target_build?: string;
  docker_compose_location?: string;
  docker_compose_custom_start_command?: string;
  docker_compose_custom_build_command?: string;
  docker_compose_domains?: string;
  docker_compose?: string;
  custom_labels?: string;
  custom_docker_run_options?: string;
  post_deployment_command?: string;
  post_deployment_command_container?: string;
  pre_deployment_command?: string;
  pre_deployment_command_container?: string;
  watch_paths?: string;
  redirect?: string;
  instant_deploy?: boolean;
  health_check_enabled?: boolean;
  health_check_path?: string;
  health_check_port?: string;
  health_check_host?: string;
  health_check_method?: string;
  health_check_return_code?: number;
  health_check_scheme?: string;
  health_check_response_text?: string;
  health_check_interval?: number;
  health_check_timeout?: number;
  health_check_retries?: number;
  health_check_start_period?: number;
  limits_memory?: string;
  limits_memory_swap?: string;
  limits_memory_swappiness?: number;
  limits_memory_reservation?: string;
  limits_cpus?: string;
  limits_cpuset?: string;
  limits_cpu_shares?: number;
}

/**
 * Application environment variables response
 */
export interface ApplicationEnvs {
  envs: EnvironmentVariable[];
}

/**
 * Application logs response
 */
export interface ApplicationLogs {
  logs: string[];
}
