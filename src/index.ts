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
export { DatabasesResource } from './resources/databases';
export { DeploymentsResource } from './resources/deployments';
export { GitHubAppsResource } from './resources/github-apps';
export { ProjectsResource } from './resources/projects';
export { PrivateKeysResource } from './resources/private-keys';
export { ServersResource } from './resources/servers';
export { ServicesResource } from './resources/services';
export { TeamsResource } from './resources/teams';
export { SystemResource } from './resources/system';
export { ResourcesResource } from './resources/resources';
