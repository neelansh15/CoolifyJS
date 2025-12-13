import type { HttpClient } from '../http';
import type { ListResourcesResponse } from '../types/resources';

/**
 * Resources resource for listing all Coolify resources
 */
export class ResourcesResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * List all resources (applications, databases, services)
   */
  async list(): Promise<ListResourcesResponse> {
    return this.http.get<ListResourcesResponse>('/resources');
  }
}
