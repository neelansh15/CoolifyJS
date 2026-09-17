import type { HttpClient } from '../http';
import type { MessageResponse } from '../types/common';
import type {
  GitLabApp,
  CreateGitLabApp,
  UpdateGitLabApp,
  UpdateGitLabAppResponse,
} from '../types/gitlab-apps';

/**
 * GitLab Apps resource for managing Coolify GitLab OAuth sources.
 *
 * GitLab apps are identified by their integer database ID rather than a UUID.
 */
export class GitLabAppsResource {
  constructor(private readonly http: HttpClient) {}

  /** List all GitLab apps available to the current team. */
  async list(): Promise<GitLabApp[]> {
    return this.http.get<GitLabApp[]>('/gitlab-apps');
  }

  /** Create a new GitLab app. */
  async create(data: CreateGitLabApp): Promise<GitLabApp> {
    return this.http.post<GitLabApp>('/gitlab-apps', data);
  }

  /** Update a GitLab app by ID. */
  async update(gitlabAppId: number, data: UpdateGitLabApp): Promise<UpdateGitLabAppResponse> {
    return this.http.patch<UpdateGitLabAppResponse>(`/gitlab-apps/${gitlabAppId}`, data);
  }

  /** Delete a GitLab app by ID (only if unused). */
  async delete(gitlabAppId: number): Promise<MessageResponse> {
    return this.http.delete<MessageResponse>(`/gitlab-apps/${gitlabAppId}`);
  }
}
