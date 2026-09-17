import type { HttpClient } from '../http';
import type { UUID, MessageResponse } from '../types/common';
import type {
  SharedEnv,
  CreateSharedEnvInput,
  UpdateSharedEnvInput,
} from '../types/shared-envs';

/**
 * Shared environment variables resource.
 *
 * Coolify exposes four separate scopes for shared env vars:
 *   - team: `/team/envs`
 *   - project: `/projects/{uuid}/envs`
 *   - environment: `/projects/{uuid}/environments/{environment}/envs`
 *   - server: `/servers/{uuid}/envs`
 *
 * Each scope has the same shape for create/update payloads and the same
 * id-based delete/update semantics. This resource groups all four so callers
 * can pick the scope from the method name.
 *
 * The `env_id` used by delete/update is the integer database id, not a UUID.
 */
export class SharedEnvsResource {
  constructor(private readonly http: HttpClient) {}

  // ---- Team scope ----

  /** List team-scoped shared env vars for the current team. */
  async listTeam(): Promise<SharedEnv[]> {
    return this.http.get<SharedEnv[]>('/team/envs');
  }

  /** Create a team-scoped shared env var. */
  async createTeam(data: CreateSharedEnvInput): Promise<SharedEnv> {
    return this.http.post<SharedEnv>('/team/envs', data);
  }

  /** Update a team-scoped shared env var by id. */
  async updateTeam(envId: number, data: UpdateSharedEnvInput): Promise<SharedEnv> {
    return this.http.patch<SharedEnv>(`/team/envs/${envId}`, data);
  }

  /** Delete a team-scoped shared env var by id. */
  async deleteTeam(envId: number): Promise<MessageResponse> {
    return this.http.delete<MessageResponse>(`/team/envs/${envId}`);
  }

  // ---- Project scope ----

  /** List project-scoped shared env vars. */
  async listProject(projectUuid: UUID): Promise<SharedEnv[]> {
    return this.http.get<SharedEnv[]>(`/projects/${projectUuid}/envs`);
  }

  /** Create a project-scoped shared env var. */
  async createProject(projectUuid: UUID, data: CreateSharedEnvInput): Promise<SharedEnv> {
    return this.http.post<SharedEnv>(`/projects/${projectUuid}/envs`, data);
  }

  /** Update a project-scoped shared env var by id. */
  async updateProject(
    projectUuid: UUID,
    envId: number,
    data: UpdateSharedEnvInput
  ): Promise<SharedEnv> {
    return this.http.patch<SharedEnv>(`/projects/${projectUuid}/envs/${envId}`, data);
  }

  /** Delete a project-scoped shared env var by id. */
  async deleteProject(projectUuid: UUID, envId: number): Promise<MessageResponse> {
    return this.http.delete<MessageResponse>(`/projects/${projectUuid}/envs/${envId}`);
  }

  // ---- Environment scope ----

  /** List environment-scoped shared env vars. */
  async listEnvironment(
    projectUuid: UUID,
    environmentNameOrUuid: string
  ): Promise<SharedEnv[]> {
    return this.http.get<SharedEnv[]>(
      `/projects/${projectUuid}/environments/${environmentNameOrUuid}/envs`
    );
  }

  /** Create an environment-scoped shared env var. */
  async createEnvironment(
    projectUuid: UUID,
    environmentNameOrUuid: string,
    data: CreateSharedEnvInput
  ): Promise<SharedEnv> {
    return this.http.post<SharedEnv>(
      `/projects/${projectUuid}/environments/${environmentNameOrUuid}/envs`,
      data
    );
  }

  /** Update an environment-scoped shared env var by id. */
  async updateEnvironment(
    projectUuid: UUID,
    environmentNameOrUuid: string,
    envId: number,
    data: UpdateSharedEnvInput
  ): Promise<SharedEnv> {
    return this.http.patch<SharedEnv>(
      `/projects/${projectUuid}/environments/${environmentNameOrUuid}/envs/${envId}`,
      data
    );
  }

  /** Delete an environment-scoped shared env var by id. */
  async deleteEnvironment(
    projectUuid: UUID,
    environmentNameOrUuid: string,
    envId: number
  ): Promise<MessageResponse> {
    return this.http.delete<MessageResponse>(
      `/projects/${projectUuid}/environments/${environmentNameOrUuid}/envs/${envId}`
    );
  }

  // ---- Server scope ----

  /** List server-scoped shared env vars. */
  async listServer(serverUuid: UUID): Promise<SharedEnv[]> {
    return this.http.get<SharedEnv[]>(`/servers/${serverUuid}/envs`);
  }

  /** Create a server-scoped shared env var. */
  async createServer(serverUuid: UUID, data: CreateSharedEnvInput): Promise<SharedEnv> {
    return this.http.post<SharedEnv>(`/servers/${serverUuid}/envs`, data);
  }

  /** Update a server-scoped shared env var by id. */
  async updateServer(
    serverUuid: UUID,
    envId: number,
    data: UpdateSharedEnvInput
  ): Promise<SharedEnv> {
    return this.http.patch<SharedEnv>(`/servers/${serverUuid}/envs/${envId}`, data);
  }

  /** Delete a server-scoped shared env var by id. */
  async deleteServer(serverUuid: UUID, envId: number): Promise<MessageResponse> {
    return this.http.delete<MessageResponse>(`/servers/${serverUuid}/envs/${envId}`);
  }
}
