import { HttpClient } from './http';
import { ApplicationsResource } from './resources/applications';
import { CloudInitScriptsResource } from './resources/cloud-init-scripts';
import { CloudTokensResource } from './resources/cloud-tokens';
import { DatabasesResource } from './resources/databases';
import { DeploymentsResource } from './resources/deployments';
import { DestinationsResource } from './resources/destinations';
import { DigitalOceanResource } from './resources/digitalocean';
import { GitHubAppsResource } from './resources/github-apps';
import { GitLabAppsResource } from './resources/gitlab-apps';
import { HetznerResource } from './resources/hetzner';
import { McpResource } from './resources/mcp';
import { NotificationsResource } from './resources/notifications';
import { ProjectsResource } from './resources/projects';
import { PrivateKeysResource } from './resources/private-keys';
import { ResourcesResource } from './resources/resources';
import { S3StoragesResource } from './resources/s3-storages';
import { SecurityKeysResource } from './resources/security-keys';
import { ServersResource } from './resources/servers';
import { ServicesResource } from './resources/services';
import { SharedEnvsResource } from './resources/shared-envs';
import { SystemResource } from './resources/system';
import { TagsResource } from './resources/tags';
import { TeamsResource } from './resources/teams';
import { VultrResource } from './resources/vultr';
import type { CoolifyClientConfig } from './types/common';

/**
 * Main CoolifyJS client
 *
 * @example
 * ```typescript
 * import { CoolifyClient } from '@neelansh/coolifyjs';
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

  /** Cloud-init scripts resource */
  public readonly cloudInitScripts: CloudInitScriptsResource;

  /** Cloud provider tokens resource (Hetzner, DigitalOcean, Vultr credentials) */
  public readonly cloudTokens: CloudTokensResource;

  /** Databases resource for managing Coolify databases */
  public readonly databases: DatabasesResource;

  /** Deployments resource for managing deployments */
  public readonly deployments: DeploymentsResource;

  /** Docker network destinations resource */
  public readonly destinations: DestinationsResource;

  /** DigitalOcean provisioning resource (catalog + server creation) */
  public readonly digitalOcean: DigitalOceanResource;

  /** GitHub Apps resource for managing GitHub integrations */
  public readonly githubApps: GitHubAppsResource;

  /** GitLab Apps resource for managing GitLab integrations */
  public readonly gitlabApps: GitLabAppsResource;

  /** Hetzner provisioning resource (catalog + server creation) */
  public readonly hetzner: HetznerResource;

  /** MCP server toggle resource */
  public readonly mcp: McpResource;

  /** Notification channels resource */
  public readonly notifications: NotificationsResource;

  /** Projects resource for managing Coolify projects */
  public readonly projects: ProjectsResource;

  /**
   * Private Keys resource (legacy `/private-keys` path).
   * @deprecated Prefer {@link securityKeys} which targets the current `/security/keys` path.
   */
  public readonly privateKeys: PrivateKeysResource;

  /** Resources resource for listing all resources */
  public readonly resources: ResourcesResource;

  /** S3 storages resource */
  public readonly s3Storages: S3StoragesResource;

  /** Security keys resource (SSH private keys at `/security/keys`) */
  public readonly securityKeys: SecurityKeysResource;

  /** Servers resource for managing Coolify servers */
  public readonly servers: ServersResource;

  /** Services resource for managing Coolify services */
  public readonly services: ServicesResource;

  /** Shared environment variables (team/project/environment/server scopes) */
  public readonly sharedEnvs: SharedEnvsResource;

  /** System resource for system operations */
  public readonly system: SystemResource;

  /** Tags resource for the team-level tag catalogue */
  public readonly tags: TagsResource;

  /** Teams resource for managing Coolify teams */
  public readonly teams: TeamsResource;

  /** Vultr provisioning resource (catalog + server creation) */
  public readonly vultr: VultrResource;

  /**
   * Create a new Coolify client instance
   *
   * @param config - Client configuration options
   */
  constructor(config: CoolifyClientConfig) {
    this.http = new HttpClient(config);

    // Initialize all resources
    this.applications = new ApplicationsResource(this.http);
    this.cloudInitScripts = new CloudInitScriptsResource(this.http);
    this.cloudTokens = new CloudTokensResource(this.http);
    this.databases = new DatabasesResource(this.http);
    this.deployments = new DeploymentsResource(this.http);
    this.destinations = new DestinationsResource(this.http);
    this.digitalOcean = new DigitalOceanResource(this.http);
    this.githubApps = new GitHubAppsResource(this.http);
    this.gitlabApps = new GitLabAppsResource(this.http);
    this.hetzner = new HetznerResource(this.http);
    this.mcp = new McpResource(this.http);
    this.notifications = new NotificationsResource(this.http);
    this.projects = new ProjectsResource(this.http);
    this.privateKeys = new PrivateKeysResource(this.http);
    this.resources = new ResourcesResource(this.http);
    this.s3Storages = new S3StoragesResource(this.http);
    this.securityKeys = new SecurityKeysResource(this.http);
    this.servers = new ServersResource(this.http);
    this.services = new ServicesResource(this.http);
    this.sharedEnvs = new SharedEnvsResource(this.http);
    this.system = new SystemResource(this.http);
    this.tags = new TagsResource(this.http);
    this.teams = new TeamsResource(this.http);
    this.vultr = new VultrResource(this.http);
  }
}
