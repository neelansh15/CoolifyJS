import type { HttpClient } from '../http';
import type { UUID, MessageResponse, UuidResponse, DeploymentResponse } from '../types/common';
import type {
  AnyDatabase,
  CreatePostgreSQLDatabase,
  CreateMySQLDatabase,
  CreateMariaDBDatabase,
  CreateMongoDBDatabase,
  CreateRedisDatabase,
  CreateDragonflyDatabase,
  CreateKeyDBDatabase,
  CreateClickHouseDatabase,
  UpdateDatabase,
  DatabaseBackup,
} from '../types/databases';

/**
 * Databases resource for managing Coolify databases
 */
export class DatabasesResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * List all databases
   */
  async list(): Promise<AnyDatabase[]> {
    return this.http.get<AnyDatabase[]>('/databases');
  }

  /**
   * Get a specific database by UUID
   */
  async get(uuid: UUID): Promise<AnyDatabase> {
    return this.http.get<AnyDatabase>(`/databases/${uuid}`);
  }

  /**
   * Create a PostgreSQL database
   */
  async createPostgreSQL(data: CreatePostgreSQLDatabase): Promise<UuidResponse> {
    return this.http.post<UuidResponse>('/databases/postgresql', data);
  }

  /**
   * Create a MySQL database
   */
  async createMySQL(data: CreateMySQLDatabase): Promise<UuidResponse> {
    return this.http.post<UuidResponse>('/databases/mysql', data);
  }

  /**
   * Create a MariaDB database
   */
  async createMariaDB(data: CreateMariaDBDatabase): Promise<UuidResponse> {
    return this.http.post<UuidResponse>('/databases/mariadb', data);
  }

  /**
   * Create a MongoDB database
   */
  async createMongoDB(data: CreateMongoDBDatabase): Promise<UuidResponse> {
    return this.http.post<UuidResponse>('/databases/mongodb', data);
  }

  /**
   * Create a Redis database
   */
  async createRedis(data: CreateRedisDatabase): Promise<UuidResponse> {
    return this.http.post<UuidResponse>('/databases/redis', data);
  }

  /**
   * Create a Dragonfly database
   */
  async createDragonfly(data: CreateDragonflyDatabase): Promise<UuidResponse> {
    return this.http.post<UuidResponse>('/databases/dragonfly', data);
  }

  /**
   * Create a KeyDB database
   */
  async createKeyDB(data: CreateKeyDBDatabase): Promise<UuidResponse> {
    return this.http.post<UuidResponse>('/databases/keydb', data);
  }

  /**
   * Create a ClickHouse database
   */
  async createClickHouse(data: CreateClickHouseDatabase): Promise<UuidResponse> {
    return this.http.post<UuidResponse>('/databases/clickhouse', data);
  }

  /**
   * Update a database
   */
  async update(uuid: UUID, data: UpdateDatabase): Promise<AnyDatabase> {
    return this.http.patch<AnyDatabase>(`/databases/${uuid}`, data);
  }

  /**
   * Delete a database
   */
  async delete(uuid: UUID, deleteConfigurations = false, deleteVolumes = false): Promise<MessageResponse> {
    const params = new URLSearchParams();
    if (deleteConfigurations) params.append('delete_configurations', 'true');
    if (deleteVolumes) params.append('delete_volumes', 'true');
    const query = params.toString();
    return this.http.delete<MessageResponse>(`/databases/${uuid}${query ? `?${query}` : ''}`);
  }

  /**
   * Start a database
   */
  async start(uuid: UUID): Promise<DeploymentResponse> {
    return this.http.post<DeploymentResponse>(`/databases/${uuid}/start`);
  }

  /**
   * Stop a database
   */
  async stop(uuid: UUID): Promise<MessageResponse> {
    return this.http.post<MessageResponse>(`/databases/${uuid}/stop`);
  }

  /**
   * Restart a database
   */
  async restart(uuid: UUID): Promise<DeploymentResponse> {
    return this.http.post<DeploymentResponse>(`/databases/${uuid}/restart`);
  }

  /**
   * List backups for a database
   */
  async listBackups(uuid: UUID): Promise<DatabaseBackup[]> {
    return this.http.get<DatabaseBackup[]>(`/databases/${uuid}/backups`);
  }

  /**
   * Create a backup for a database
   */
  async createBackup(uuid: UUID): Promise<MessageResponse> {
    return this.http.post<MessageResponse>(`/databases/${uuid}/backups`);
  }
}
