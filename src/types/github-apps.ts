import type { UUID, Timestamps } from './common';

/**
 * GitHub App entity
 */
export interface GitHubApp extends Timestamps {
  id: number;
  uuid: UUID;
  name: string;
  organization?: string;
  app_id?: number;
  installation_id?: number;
  client_id?: string;
  client_secret?: string;
  webhook_secret?: string;
  private_key?: string;
  is_system_wide?: boolean;
  html_url?: string;
}

/**
 * Create GitHub App input
 */
export interface CreateGitHubApp {
  name: string;
  organization?: string;
  app_id: number;
  installation_id: number;
  client_id: string;
  client_secret: string;
  webhook_secret: string;
  private_key: string;
  is_system_wide?: boolean;
}

/**
 * Update GitHub App input
 */
export interface UpdateGitHubApp {
  name?: string;
  organization?: string;
  app_id?: number;
  installation_id?: number;
  client_id?: string;
  client_secret?: string;
  webhook_secret?: string;
  private_key?: string;
  is_system_wide?: boolean;
}

/**
 * GitHub repository
 */
export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description?: string;
  default_branch: string;
}

/**
 * GitHub branch
 */
export interface GitHubBranch {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: boolean;
}

/**
 * Load repositories response
 */
export interface LoadRepositoriesResponse {
  repositories: GitHubRepository[];
}

/**
 * Load branches response
 */
export interface LoadBranchesResponse {
  branches: GitHubBranch[];
}
