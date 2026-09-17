import type { HttpClient } from '../http';
import type { UUID, MessageResponse } from '../types/common';
import type {
  Destination,
  CreateDestinationInput,
  UpdateDestinationInput,
} from '../types/destinations';

/**
 * Destinations resource for managing Docker network destinations attached to servers.
 *
 * A destination is where Coolify actually runs your containers — a Docker
 * network on a specific server. Each server may host multiple destinations
 * (e.g. one standalone network plus one swarm network).
 */
export class DestinationsResource {
  constructor(private readonly http: HttpClient) {}

  /** List all destinations for the authenticated team. */
  async list(): Promise<Destination[]> {
    return this.http.get<Destination[]>('/destinations');
  }

  /** List destinations attached to a specific server. */
  async listByServer(serverUuid: UUID): Promise<Destination[]> {
    return this.http.get<Destination[]>(`/servers/${serverUuid}/destinations`);
  }

  /** Get a destination by UUID. */
  async get(uuid: UUID): Promise<Destination> {
    return this.http.get<Destination>(`/destinations/${uuid}`);
  }

  /** Create a destination on a server. */
  async create(serverUuid: UUID, data: CreateDestinationInput): Promise<Destination> {
    return this.http.post<Destination>(`/servers/${serverUuid}/destinations`, data);
  }

  /** Update a destination's name. Network cannot be changed via API. */
  async update(uuid: UUID, data: UpdateDestinationInput): Promise<Destination> {
    return this.http.patch<Destination>(`/destinations/${uuid}`, data);
  }

  /** Delete a destination. Fails if it has attached resources. */
  async delete(uuid: UUID): Promise<MessageResponse> {
    return this.http.delete<MessageResponse>(`/destinations/${uuid}`);
  }
}
