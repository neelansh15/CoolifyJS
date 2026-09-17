// Main client
export { CoolifyClient } from './client';

// HTTP client (for advanced usage)
export { HttpClient } from './http';

// Error classes
export {
  CoolifyError,
  CoolifyAuthError,
  CoolifyNotFoundError,
  CoolifyValidationError,
  CoolifyRateLimitError,
  CoolifyServerError,
} from './errors';

// All types
export * from './types';

// Resource classes (for advanced usage)
export { ApplicationsResource } from './resources/applications';
export { CloudInitScriptsResource } from './resources/cloud-init-scripts';
export { CloudTokensResource } from './resources/cloud-tokens';
export { DatabasesResource } from './resources/databases';
export { DeploymentsResource } from './resources/deployments';
export { DestinationsResource } from './resources/destinations';
export { DigitalOceanResource } from './resources/digitalocean';
export { GitHubAppsResource } from './resources/github-apps';
export { GitLabAppsResource } from './resources/gitlab-apps';
export { HetznerResource } from './resources/hetzner';
export { McpResource } from './resources/mcp';
export { NotificationsResource } from './resources/notifications';
export { ProjectsResource } from './resources/projects';
export { PrivateKeysResource } from './resources/private-keys';
export { ResourcesResource } from './resources/resources';
export { S3StoragesResource } from './resources/s3-storages';
export { SecurityKeysResource } from './resources/security-keys';
export { ServersResource } from './resources/servers';
export { ServicesResource } from './resources/services';
export { SharedEnvsResource } from './resources/shared-envs';
export { SystemResource } from './resources/system';
export { TagsResource } from './resources/tags';
export { TeamsResource } from './resources/teams';
export { VultrResource } from './resources/vultr';
