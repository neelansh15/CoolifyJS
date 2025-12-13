import type { HttpClient } from '../http';
import type { UUID, MessageResponse, UuidResponse } from '../types/common';
import type {
  GitHubApp,
  CreateGitHubApp,
  UpdateGitHubApp,
  LoadRepositoriesResponse,
  LoadBranchesResponse,
} from '../types/github-apps';

/**
 * GitHub Apps resource for managing Coolify GitHub integrations
 */
export class GitHubAppsResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * List all GitHub Apps
   */
  async list(): Promise<GitHubApp[]> {
    return this.http.get<GitHubApp[]>('/github-apps');
  }

  /**
   * Get a specific GitHub App by UUID
   */
  async get(uuid: UUID): Promise<GitHubApp> {
    return this.http.get<GitHubApp>(`/github-apps/${uuid}`);
  }

  /**
   * Create a GitHub App
   */
  async create(data: CreateGitHubApp): Promise<UuidResponse> {
    return this.http.post<UuidResponse>('/github-apps', data);
  }

  /**
   * Update a GitHub App
   */
  async update(uuid: UUID, data: UpdateGitHubApp): Promise<GitHubApp> {
    return this.http.patch<GitHubApp>(`/github-apps/${uuid}`, data);
  }

  /**
   * Delete a GitHub App
   */
  async delete(uuid: UUID): Promise<MessageResponse> {
    return this.http.delete<MessageResponse>(`/github-apps/${uuid}`);
  }

  /**
   * Load repositories for a GitHub App
   */
  async loadRepositories(uuid: UUID): Promise<LoadRepositoriesResponse> {
    return this.http.get<LoadRepositoriesResponse>(`/github-apps/${uuid}/repositories`);
  }

  /**
   * Load branches for a repository
   */
  async loadBranches(uuid: UUID, repositoryName: string): Promise<LoadBranchesResponse> {
    return this.http.get<LoadBranchesResponse>(
      `/github-apps/${uuid}/repositories/${encodeURIComponent(repositoryName)}/branches`
    );
  }
}
