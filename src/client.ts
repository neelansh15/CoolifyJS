import { HttpClient } from './http';
import { ApplicationsResource } from './resources/applications';
import { DatabasesResource } from './resources/databases';
import { DeploymentsResource } from './resources/deployments';
import { GitHubAppsResource } from './resources/github-apps';
import { ProjectsResource } from './resources/projects';
import { PrivateKeysResource } from './resources/private-keys';
import { ServersResource } from './resources/servers';
import { ServicesResource } from './resources/services';
import { TeamsResource } from './resources/teams';
import { SystemResource } from './resources/system';
import { ResourcesResource } from './resources/resources';
import type { CoolifyClientConfig } from './types/common';

/**
 * Main CoolifyJS client
 *
 * @example
 * ```typescript
 * import { CoolifyClient } from 'coolifyjs';
 *
 * const coolify = new CoolifyClient({
 *   baseUrl: 'https://coolify.example.com/api/v1',
 *   token: 'your-api-token',
 * });
 *
 * // List all applications
 * const apps = await coolify.applications.list();
 *
 * // Start an application
 * await coolify.applications.start('app-uuid');
 *
 * // Create a PostgreSQL database
 * await coolify.databases.createPostgreSQL({
 *   project_uuid: 'project-uuid',
 *   server_uuid: 'server-uuid',
 *   name: 'my-database',
 * });
 * ```
 */
export class CoolifyClient {
  private readonly http: HttpClient;

  /** Applications resource for managing Coolify applications */
  public readonly applications: ApplicationsResource;

  /** Databases resource for managing Coolify databases */
  public readonly databases: DatabasesResource;

  /** Deployments resource for managing deployments */
  public readonly deployments: DeploymentsResource;

  /** GitHub Apps resource for managing GitHub integrations */
  public readonly githubApps: GitHubAppsResource;

  /** Projects resource for managing Coolify projects */
  public readonly projects: ProjectsResource;

  /** Private Keys resource for managing SSH keys */
  public readonly privateKeys: PrivateKeysResource;

  /** Servers resource for managing Coolify servers */
  public readonly servers: ServersResource;

  /** Services resource for managing Coolify services */
  public readonly services: ServicesResource;

  /** Teams resource for managing Coolify teams */
  public readonly teams: TeamsResource;

  /** System resource for system operations */
  public readonly system: SystemResource;

  /** Resources resource for listing all resources */
  public readonly resources: ResourcesResource;

  /**
   * Create a new Coolify client instance
   *
   * @param config - Client configuration options
   */
  constructor(config: CoolifyClientConfig) {
    this.http = new HttpClient(config);

    // Initialize all resources
    this.applications = new ApplicationsResource(this.http);
    this.databases = new DatabasesResource(this.http);
    this.deployments = new DeploymentsResource(this.http);
    this.githubApps = new GitHubAppsResource(this.http);
    this.projects = new ProjectsResource(this.http);
    this.privateKeys = new PrivateKeysResource(this.http);
    this.servers = new ServersResource(this.http);
    this.services = new ServicesResource(this.http);
    this.teams = new TeamsResource(this.http);
    this.system = new SystemResource(this.http);
    this.resources = new ResourcesResource(this.http);
  }
}
