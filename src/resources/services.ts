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
import type { Service, CreateService, UpdateService, ServiceEnvs } from '../types/services';

/**
 * Services resource for managing Coolify services
 */
export class ServicesResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * List all services
   */
  async list(): Promise<Service[]> {
    return this.http.get<Service[]>('/services');
  }

  /**
   * Get a specific service by UUID
   */
  async get(uuid: UUID): Promise<Service> {
    return this.http.get<Service>(`/services/${uuid}`);
  }

  /**
   * Create a new service
   */
  async create(data: CreateService): Promise<UuidResponse> {
    return this.http.post<UuidResponse>('/services', data);
  }

  /**
   * Update a service
   */
  async update(uuid: UUID, data: UpdateService): Promise<Service> {
    return this.http.patch<Service>(`/services/${uuid}`, data);
  }

  /**
   * Delete a service
   */
  async delete(uuid: UUID, deleteConfigurations = false, deleteVolumes = false): Promise<MessageResponse> {
    const params = new URLSearchParams();
    if (deleteConfigurations) params.append('delete_configurations', 'true');
    if (deleteVolumes) params.append('delete_volumes', 'true');
    const query = params.toString();
    return this.http.delete<MessageResponse>(`/services/${uuid}${query ? `?${query}` : ''}`);
  }

  /**
   * List environment variables for a service
   */
  async listEnvs(uuid: UUID): Promise<ServiceEnvs> {
    return this.http.get<ServiceEnvs>(`/services/${uuid}/envs`);
  }

  /**
   * Create an environment variable for a service
   */
  async createEnv(uuid: UUID, data: CreateEnvironmentVariable): Promise<UuidResponse> {
    return this.http.post<UuidResponse>(`/services/${uuid}/envs`, data);
  }

  /**
   * Update an environment variable
   */
  async updateEnv(uuid: UUID, envUuid: UUID, data: UpdateEnvironmentVariable): Promise<MessageResponse> {
    return this.http.patch<MessageResponse>(`/services/${uuid}/envs/${envUuid}`, data);
  }

  /**
   * Bulk update environment variables
   */
  async bulkUpdateEnvs(uuid: UUID, data: BulkUpdateEnvironmentVariables): Promise<MessageResponse> {
    return this.http.patch<MessageResponse>(`/services/${uuid}/envs/bulk`, data);
  }

  /**
   * Delete an environment variable
   */
  async deleteEnv(uuid: UUID, envUuid: UUID): Promise<MessageResponse> {
    return this.http.delete<MessageResponse>(`/services/${uuid}/envs/${envUuid}`);
  }

  /**
   * Start a service
   */
  async start(uuid: UUID): Promise<DeploymentResponse> {
    return this.http.post<DeploymentResponse>(`/services/${uuid}/start`);
  }

  /**
   * Stop a service
   */
  async stop(uuid: UUID): Promise<MessageResponse> {
    return this.http.post<MessageResponse>(`/services/${uuid}/stop`);
  }

  /**
   * Restart a service
   */
  async restart(uuid: UUID): Promise<DeploymentResponse> {
    return this.http.post<DeploymentResponse>(`/services/${uuid}/restart`);
  }
}
