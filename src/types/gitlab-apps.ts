import type { UUID } from './common';

/**
 * GitLab App entity (OAuth source).
 */
export interface GitLabApp {
  id: number;
  uuid: UUID;
  name: string;
  api_url?: string;
  html_url?: string;
  custom_user?: string;
  custom_port?: number;
  client_id?: string | null;
  group_name?: string | null;
  redirect_uri?: string | null;
  is_system_wide?: boolean;
  is_public?: boolean;
  team_id?: number;
}

/**
 * Create GitLab App input.
 */
export interface CreateGitLabApp {
  name: string;
  html_url: string;
  api_url?: string;
  custom_user?: string;
  custom_port?: number;
  group_name?: string | null;
  client_id?: string | null;
  client_secret?: string | null;
  webhook_token?: string | null;
  redirect_uri?: string | null;
  is_system_wide?: boolean;
}

/**
 * Update GitLab App input.
 */
export interface UpdateGitLabApp {
  name?: string;
  html_url?: string;
  api_url?: string;
  custom_user?: string;
  custom_port?: number;
  group_name?: string | null;
  client_id?: string | null;
  client_secret?: string | null;
  webhook_token?: string | null;
  redirect_uri?: string | null;
  is_system_wide?: boolean;
}

/**
 * Response returned from update endpoints.
 */
export interface UpdateGitLabAppResponse {
  message: string;
  data?: GitLabApp;
}
