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
  MoveApplicationInput,
  MoveApplicationResponse,
  MigrateApplicationInput,
  CloneApplicationInput,
  CloneApplicationResponse,
  ApplicationStorage,
  ApplicationStorages,
  CreateApplicationStorage,
  UpdateApplicationStorage,
  RollbackImagesResponse,
  RollbackApplicationInput,
  RollbackApplicationResponse,
  AddApplicationDestinationInput,
  CreateApplicationTagInput,
} from '../types/applications';
import type { Tag } from '../types/tags';

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

  /**
   * Move an application to another environment (organizational only).
   */
  async move(uuid: UUID, data: MoveApplicationInput): Promise<MoveApplicationResponse> {
    return this.http.post<MoveApplicationResponse>(`/applications/${uuid}/move`, data);
  }

  /**
   * Migrate an application to another server/destination.
   */
  async migrate(uuid: UUID, data: MigrateApplicationInput): Promise<MessageResponse> {
    return this.http.post<MessageResponse>(`/applications/${uuid}/migrate`, data);
  }

  /**
   * Clone an application to a destination.
   */
  async clone(uuid: UUID, data: CloneApplicationInput): Promise<CloneApplicationResponse> {
    return this.http.post<CloneApplicationResponse>(`/applications/${uuid}/clone`, data);
  }

  /**
   * List persistent and file storages for an application.
   */
  async listStorages(uuid: UUID): Promise<ApplicationStorages> {
    return this.http.get<ApplicationStorages>(`/applications/${uuid}/storages`);
  }

  /**
   * Create a persistent or file storage for an application.
   */
  async createStorage(uuid: UUID, data: CreateApplicationStorage): Promise<ApplicationStorage> {
    return this.http.post<ApplicationStorage>(`/applications/${uuid}/storages`, data);
  }

  /**
   * Update a storage entry for an application.
   */
  async updateStorage(uuid: UUID, data: UpdateApplicationStorage): Promise<ApplicationStorage> {
    return this.http.patch<ApplicationStorage>(`/applications/${uuid}/storages`, data);
  }

  /**
   * Delete a storage entry for an application by storage UUID.
   */
  async deleteStorage(uuid: UUID, storageUuid: UUID): Promise<MessageResponse> {
    return this.http.delete<MessageResponse>(`/applications/${uuid}/storages/${storageUuid}`);
  }

  /**
   * Delete a preview deployment for a pull request.
   */
  async deletePreviewDeployment(uuid: UUID, pullRequestId: number): Promise<MessageResponse> {
    return this.http.delete<MessageResponse>(`/applications/${uuid}/previews/${pullRequestId}`);
  }

  /**
   * List tags attached to an application.
   */
  async listTags(uuid: UUID): Promise<Tag[]> {
    return this.http.get<Tag[]>(`/applications/${uuid}/tags`);
  }

  /**
   * Add one or more tags to an application.
   */
  async createTag(uuid: UUID, data: CreateApplicationTagInput): Promise<Tag[]> {
    return this.http.post<Tag[]>(`/applications/${uuid}/tags`, data);
  }

  /**
   * Detach a tag from an application by tag UUID.
   */
  async deleteTag(uuid: UUID, tagUuid: UUID): Promise<MessageResponse> {
    return this.http.delete<MessageResponse>(`/applications/${uuid}/tags/${tagUuid}`);
  }

  /**
   * List available rollback images for an application.
   */
  async listRollbackImages(uuid: UUID): Promise<RollbackImagesResponse> {
    return this.http.get<RollbackImagesResponse>(`/applications/${uuid}/rollback-images`);
  }

  /**
   * Queue a rollback deployment for an application.
   */
  async rollback(uuid: UUID, data: RollbackApplicationInput): Promise<RollbackApplicationResponse> {
    return this.http.post<RollbackApplicationResponse>(`/applications/${uuid}/rollback`, data);
  }

  /**
   * List destinations (primary + additional) for a standalone application.
   */
  async listDestinations<T = unknown>(uuid: UUID): Promise<T> {
    return this.http.get<T>(`/applications/${uuid}/destinations`);
  }

  /**
   * Attach an additional standalone Docker destination to an application.
   */
  async addDestination<T = unknown>(
    uuid: UUID,
    data: AddApplicationDestinationInput
  ): Promise<T> {
    return this.http.post<T>(`/applications/${uuid}/destinations`, data);
  }

  /**
   * Remove an additional destination from an application.
   */
  async removeDestination(uuid: UUID, destinationUuid: UUID): Promise<MessageResponse> {
    return this.http.delete<MessageResponse>(
      `/applications/${uuid}/destinations/${destinationUuid}`
    );
  }
}
