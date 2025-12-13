import type { HttpClient } from '../http';
import type { UUID, MessageResponse, UuidResponse } from '../types/common';
import type {
  Project,
  CreateProject,
  UpdateProject,
  ProjectEnvironment,
  CreateEnvironment,
  EnvironmentWithResources,
} from '../types/projects';

/**
 * Projects resource for managing Coolify projects
 */
export class ProjectsResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * List all projects
   */
  async list(): Promise<Project[]> {
    return this.http.get<Project[]>('/projects');
  }

  /**
   * Get a specific project by UUID
   */
  async get(uuid: UUID): Promise<Project> {
    return this.http.get<Project>(`/projects/${uuid}`);
  }

  /**
   * Create a new project
   */
  async create(data: CreateProject): Promise<UuidResponse> {
    return this.http.post<UuidResponse>('/projects', data);
  }

  /**
   * Update a project
   */
  async update(uuid: UUID, data: UpdateProject): Promise<Project> {
    return this.http.patch<Project>(`/projects/${uuid}`, data);
  }

  /**
   * Delete a project
   */
  async delete(uuid: UUID): Promise<MessageResponse> {
    return this.http.delete<MessageResponse>(`/projects/${uuid}`);
  }

  /**
   * List environments for a project
   */
  async listEnvironments(projectUuid: UUID): Promise<ProjectEnvironment[]> {
    return this.http.get<ProjectEnvironment[]>(`/projects/${projectUuid}/environments`);
  }

  /**
   * Get a specific environment by name
   */
  async getEnvironment(projectUuid: UUID, environmentName: string): Promise<EnvironmentWithResources> {
    return this.http.get<EnvironmentWithResources>(
      `/projects/${projectUuid}/${encodeURIComponent(environmentName)}`
    );
  }

  /**
   * Create a new environment for a project
   */
  async createEnvironment(projectUuid: UUID, data: CreateEnvironment): Promise<UuidResponse> {
    return this.http.post<UuidResponse>(`/projects/${projectUuid}/environments`, data);
  }

  /**
   * Delete an environment
   */
  async deleteEnvironment(projectUuid: UUID, environmentName: string): Promise<MessageResponse> {
    return this.http.delete<MessageResponse>(
      `/projects/${projectUuid}/${encodeURIComponent(environmentName)}`
    );
  }
}
