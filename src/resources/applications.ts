import type { HttpClient } from '../http';
import type {
  UUID,
  MessageResponse,
  UuidResponse,
  DeploymentResponse,
  CreateEnvironmentVariable,
  UpdateEnvironmentVariable,
  BulkUpdateEnvironmentVariables,
} from '../types/common';
import type {
  Application,
  CreatePublicApplication,
  CreatePrivateGitHubAppApplication,
  CreatePrivateDeployKeyApplication,
  CreateDockerfileApplication,
  CreateDockerImageApplication,
  CreateDockerComposeApplication,
  UpdateApplication,
  ApplicationEnvs,
  ApplicationLogs,
} from '../types/applications';

/**
 * Applications resource for managing Coolify applications
 */
export class ApplicationsResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * List all applications
   */
  async list(): Promise<Application[]> {
    return this.http.get<Application[]>('/applications');
  }

  /**
   * Get a specific application by UUID
   */
  async get(uuid: UUID): Promise<Application> {
    return this.http.get<Application>(`/applications/${uuid}`);
  }

  /**
   * Create an application from a public Git repository
   */
  async createFromPublicRepo(data: CreatePublicApplication): Promise<UuidResponse> {
    return this.http.post<UuidResponse>('/applications/public', data);
  }

  /**
   * Create an application from a private repository using GitHub App
   */
  async createFromPrivateRepoGitHubApp(data: CreatePrivateGitHubAppApplication): Promise<UuidResponse> {
    return this.http.post<UuidResponse>('/applications/private-github-app', data);
  }

  /**
   * Create an application from a private repository using deploy key
   */
  async createFromPrivateRepoDeployKey(data: CreatePrivateDeployKeyApplication): Promise<UuidResponse> {
    return this.http.post<UuidResponse>('/applications/private-deploy-key', data);
  }

  /**
   * Create an application from a Dockerfile
   */
  async createFromDockerfile(data: CreateDockerfileApplication): Promise<UuidResponse> {
    return this.http.post<UuidResponse>('/applications/dockerfile', data);
  }

  /**
   * Create an application from a Docker image
   */
  async createFromDockerImage(data: CreateDockerImageApplication): Promise<UuidResponse> {
    return this.http.post<UuidResponse>('/applications/dockerimage', data);
  }

  /**
   * Create an application from Docker Compose
   */
  async createFromDockerCompose(data: CreateDockerComposeApplication): Promise<UuidResponse> {
    return this.http.post<UuidResponse>('/applications/dockercompose', data);
  }

  /**
   * Update an application
   */
  async update(uuid: UUID, data: UpdateApplication): Promise<Application> {
    return this.http.patch<Application>(`/applications/${uuid}`, data);
  }

  /**
   * Delete an application
   */
  async delete(uuid: UUID, deleteConfigurations = false, deleteVolumes = false): Promise<MessageResponse> {
    const params = new URLSearchParams();
    if (deleteConfigurations) params.append('delete_configurations', 'true');
    if (deleteVolumes) params.append('delete_volumes', 'true');
    const query = params.toString();
    return this.http.delete<MessageResponse>(`/applications/${uuid}${query ? `?${query}` : ''}`);
  }

  /**
   * List environment variables for an application
   */
  async listEnvs(uuid: UUID): Promise<ApplicationEnvs> {
    return this.http.get<ApplicationEnvs>(`/applications/${uuid}/envs`);
  }

  /**
   * Create an environment variable for an application
   */
  async createEnv(uuid: UUID, data: CreateEnvironmentVariable): Promise<UuidResponse> {
    return this.http.post<UuidResponse>(`/applications/${uuid}/envs`, data);
  }

  /**
   * Update an environment variable
   */
  async updateEnv(uuid: UUID, envUuid: UUID, data: UpdateEnvironmentVariable): Promise<MessageResponse> {
    return this.http.patch<MessageResponse>(`/applications/${uuid}/envs/${envUuid}`, data);
  }

  /**
   * Bulk update environment variables
   */
  async bulkUpdateEnvs(uuid: UUID, data: BulkUpdateEnvironmentVariables): Promise<MessageResponse> {
    return this.http.patch<MessageResponse>(`/applications/${uuid}/envs/bulk`, data);
  }

  /**
   * Delete an environment variable
   */
  async deleteEnv(uuid: UUID, envUuid: UUID): Promise<MessageResponse> {
    return this.http.delete<MessageResponse>(`/applications/${uuid}/envs/${envUuid}`);
  }

  /**
   * Start an application
   */
  async start(uuid: UUID): Promise<DeploymentResponse> {
    return this.http.post<DeploymentResponse>(`/applications/${uuid}/start`);
  }

  /**
   * Stop an application
   */
  async stop(uuid: UUID): Promise<MessageResponse> {
    return this.http.post<MessageResponse>(`/applications/${uuid}/stop`);
  }

  /**
   * Restart an application
   */
  async restart(uuid: UUID): Promise<DeploymentResponse> {
    return this.http.post<DeploymentResponse>(`/applications/${uuid}/restart`);
  }

  /**
   * Get application logs
   */
  async logs(uuid: UUID): Promise<ApplicationLogs> {
    return this.http.get<ApplicationLogs>(`/applications/${uuid}/logs`);
  }
}
