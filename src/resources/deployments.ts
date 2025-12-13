import type { HttpClient } from '../http';
import type { UUID, DeploymentResponse } from '../types/common';
import type { Deployment, DeployApplicationInput } from '../types/deployments';

/**
 * Deployments resource for managing Coolify deployments
 */
export class DeploymentsResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * List all deployments
   */
  async list(): Promise<Deployment[]> {
    return this.http.get<Deployment[]>('/deployments');
  }

  /**
   * Get a specific deployment by UUID
   */
  async get(uuid: UUID): Promise<Deployment> {
    return this.http.get<Deployment>(`/deployments/${uuid}`);
  }

  /**
   * Deploy an application
   */
  async deploy(applicationUuid: UUID, options?: DeployApplicationInput): Promise<DeploymentResponse> {
    const params = new URLSearchParams();
    if (options?.force) params.append('force', 'true');
    if (options?.instant_deploy) params.append('instant_deploy', 'true');
    const query = params.toString();
    return this.http.post<DeploymentResponse>(`/deploy?uuid=${applicationUuid}${query ? `&${query}` : ''}`);
  }

  /**
   * List deployments for a specific application
   */
  async listByApplication(applicationUuid: UUID): Promise<Deployment[]> {
    return this.http.get<Deployment[]>(`/applications/${applicationUuid}/deployments`);
  }
}
