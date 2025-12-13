# CoolifyJS

A  TypeScript SDK for the [Coolify API](https://coolify.io/docs/api-reference/authorization). This SDK provides a clean, intuitive interface for managing your Coolify self-hosted PaaS instance programmatically.

## Features

- 🔒 **Type-safe**: Full TypeScript support with comprehensive type definitions
- 📦 **Complete API coverage**: All 89 API endpoints across 11 resource categories
- 🚀 **Modern**: ESM and CommonJS support, built with Vite
- ⚡ **Lightweight**: Zero runtime dependencies, uses native `fetch`
- 🛡️ **Error handling**: Custom error classes for different API error types
- 📖 **Well documented**: Comprehensive JSDoc comments and examples

## Installation

```bash
npm install @neelansh/coolifyjs
```

## Quick Start

```typescript
import { CoolifyClient } from '@neelansh/coolifyjs';

const coolify = new CoolifyClient({
  baseUrl: 'https://coolify.example.com/api/v1',
  token: 'your-api-token',
});

// List all applications
const apps = await coolify.applications.list();

// Get a specific application
const app = await coolify.applications.get('app-uuid');

// Start an application
await coolify.applications.start('app-uuid');
```

## Configuration

```typescript
const coolify = new CoolifyClient({
  // Required: Your Coolify instance API URL
  baseUrl: 'https://coolify.example.com/api/v1',
  
  // Required: Your API token (Settings > API Tokens in Coolify)
  token: 'your-api-token',
  
  // Optional: Request timeout in milliseconds (default: 30000)
  timeout: 60000,
});
```

## API Reference

### Applications

Manage applications in your Coolify instance.

```typescript
// List all applications
const apps = await coolify.applications.list();

// Get an application
const app = await coolify.applications.get('uuid');

// Create from public repository
const { uuid } = await coolify.applications.createFromPublicRepo({
  project_uuid: 'project-uuid',
  server_uuid: 'server-uuid',
  git_repository: 'https://github.com/user/repo',
  git_branch: 'main',
  name: 'My App',
  instant_deploy: true,
});

// Create from private repository (GitHub App)
await coolify.applications.createFromPrivateRepoGitHubApp({
  project_uuid: 'project-uuid',
  server_uuid: 'server-uuid',
  github_app_uuid: 'github-app-uuid',
  git_repository: 'user/private-repo',
  git_branch: 'main',
});

// Create from Docker image
await coolify.applications.createFromDockerImage({
  project_uuid: 'project-uuid',
  server_uuid: 'server-uuid',
  docker_registry_image_name: 'nginx',
  docker_registry_image_tag: 'latest',
});

// Update an application
await coolify.applications.update('uuid', {
  name: 'New Name',
  domains: 'app.example.com',
});

// Delete an application
await coolify.applications.delete('uuid', true, true); // delete configs and volumes

// Environment variables
const envs = await coolify.applications.listEnvs('uuid');
await coolify.applications.createEnv('uuid', { key: 'NODE_ENV', value: 'production' });
await coolify.applications.updateEnv('uuid', 'env-uuid', { value: 'development' });
await coolify.applications.deleteEnv('uuid', 'env-uuid');

// Lifecycle
await coolify.applications.start('uuid');
await coolify.applications.stop('uuid');
await coolify.applications.restart('uuid');

// Logs
const logs = await coolify.applications.logs('uuid');
```

### Databases

Manage databases including PostgreSQL, MySQL, MariaDB, MongoDB, Redis, and more.

```typescript
// List all databases
const databases = await coolify.databases.list();

// Get a database
const db = await coolify.databases.get('uuid');

// Create PostgreSQL database
const { uuid } = await coolify.databases.createPostgreSQL({
  project_uuid: 'project-uuid',
  server_uuid: 'server-uuid',
  name: 'my-postgres',
  postgres_user: 'admin',
  postgres_password: 'secret',
  postgres_db: 'mydb',
  instant_deploy: true,
});

// Create MySQL database
await coolify.databases.createMySQL({
  project_uuid: 'project-uuid',
  server_uuid: 'server-uuid',
  name: 'my-mysql',
});

// Create Redis database
await coolify.databases.createRedis({
  project_uuid: 'project-uuid',
  server_uuid: 'server-uuid',
  name: 'my-redis',
});

// Create MongoDB database
await coolify.databases.createMongoDB({
  project_uuid: 'project-uuid',
  server_uuid: 'server-uuid',
  name: 'my-mongo',
});

// Other databases: MariaDB, ClickHouse, Dragonfly, KeyDB
await coolify.databases.createMariaDB({ ... });
await coolify.databases.createClickHouse({ ... });
await coolify.databases.createDragonfly({ ... });
await coolify.databases.createKeyDB({ ... });

// Lifecycle
await coolify.databases.start('uuid');
await coolify.databases.stop('uuid');
await coolify.databases.restart('uuid');

// Backups
const backups = await coolify.databases.listBackups('uuid');
await coolify.databases.createBackup('uuid');
```

### Deployments

Deploy and manage application deployments.

```typescript
// List all deployments
const deployments = await coolify.deployments.list();

// Get a deployment
const deployment = await coolify.deployments.get('uuid');

// Deploy an application
await coolify.deployments.deploy('app-uuid', { force: true });

// List deployments for an application
const appDeployments = await coolify.deployments.listByApplication('app-uuid');
```

### Services

Manage one-click services (pre-configured applications).

```typescript
// List all services
const services = await coolify.services.list();

// Get a service
const service = await coolify.services.get('uuid');

// Create a service
const { uuid } = await coolify.services.create({
  project_uuid: 'project-uuid',
  server_uuid: 'server-uuid',
  type: 'plausible', // Service type
  name: 'My Analytics',
  instant_deploy: true,
});

// Environment variables
const envs = await coolify.services.listEnvs('uuid');
await coolify.services.createEnv('uuid', { key: 'SECRET', value: 'value' });

// Lifecycle
await coolify.services.start('uuid');
await coolify.services.stop('uuid');
await coolify.services.restart('uuid');
```

### Projects

Organize resources into projects and environments.

```typescript
// List all projects
const projects = await coolify.projects.list();

// Get a project
const project = await coolify.projects.get('uuid');

// Create a project
const { uuid } = await coolify.projects.create({
  name: 'My Project',
  description: 'Production applications',
});

// Update a project
await coolify.projects.update('uuid', { name: 'New Name' });

// Delete a project
await coolify.projects.delete('uuid');

// Environments
const envs = await coolify.projects.listEnvironments('project-uuid');
const env = await coolify.projects.getEnvironment('project-uuid', 'production');

await coolify.projects.createEnvironment('project-uuid', { name: 'staging' });
await coolify.projects.deleteEnvironment('project-uuid', 'staging');
```

### Servers

Manage servers where your applications run.

```typescript
// List all servers
const servers = await coolify.servers.list();

// Get a server
const server = await coolify.servers.get('uuid');

// Create a server
const { uuid } = await coolify.servers.create({
  name: 'Production Server',
  ip: '192.168.1.100',
  private_key_uuid: 'pk-uuid',
  instant_validate: true,
});

// Update a server
await coolify.servers.update('uuid', { name: 'New Name' });

// Delete a server
await coolify.servers.delete('uuid');

// Get resources on a server
const resources = await coolify.servers.getResources('uuid');

// Get domains configured on a server
const domains = await coolify.servers.getDomains('uuid');

// Validate server connection
const validation = await coolify.servers.validate('uuid');
```

### Private Keys

Manage SSH private keys for server access.

```typescript
// List all private keys
const keys = await coolify.privateKeys.list();

// Get a private key
const key = await coolify.privateKeys.get('uuid');

// Create a private key
const { uuid } = await coolify.privateKeys.create({
  name: 'Production Key',
  private_key: '-----BEGIN OPENSSH PRIVATE KEY-----\n...',
});

// Update a private key
await coolify.privateKeys.update('uuid', { name: 'New Name' });

// Delete a private key
await coolify.privateKeys.delete('uuid');
```

### GitHub Apps

Manage GitHub App integrations for private repository access.

```typescript
// List all GitHub Apps
const apps = await coolify.githubApps.list();

// Get a GitHub App
const app = await coolify.githubApps.get('uuid');

// Create a GitHub App
const { uuid } = await coolify.githubApps.create({
  name: 'My GitHub App',
  app_id: 123456,
  installation_id: 789012,
  client_id: 'Iv1.xxx',
  client_secret: 'secret',
  webhook_secret: 'webhook-secret',
  private_key: '-----BEGIN RSA PRIVATE KEY-----\n...',
});

// Load repositories
const repos = await coolify.githubApps.loadRepositories('uuid');

// Load branches for a repository
const branches = await coolify.githubApps.loadBranches('uuid', 'owner/repo');
```

### Teams

Manage teams and members.

```typescript
// List all teams
const teams = await coolify.teams.list();

// Get a team
const team = await coolify.teams.get(1);

// Get current team
const current = await coolify.teams.current();

// Get team members
const members = await coolify.teams.getMembers(1);
const currentMembers = await coolify.teams.getCurrentMembers();
```

### System

System operations and health checks.

```typescript
// Get Coolify version
const { version } = await coolify.system.version();

// Health check
const health = await coolify.system.healthCheck();

// Enable/disable API
await coolify.system.enableApi();
await coolify.system.disableApi();
```

### Resources

List all resources across your instance.

```typescript
// List all resources (applications, databases, services)
const resources = await coolify.resources.list();
```

## Error Handling

The SDK provides custom error classes for different error types:

```typescript
import {
  CoolifyError,
  CoolifyAuthError,
  CoolifyNotFoundError,
  CoolifyValidationError,
  CoolifyRateLimitError,
  CoolifyServerError,
} from '@neelansh/coolifyjs';

try {
  await coolify.applications.get('non-existent-uuid');
} catch (error) {
  if (error instanceof CoolifyNotFoundError) {
    console.log('Application not found');
  } else if (error instanceof CoolifyAuthError) {
    console.log('Invalid API token');
  } else if (error instanceof CoolifyValidationError) {
    console.log('Validation errors:', error.errors);
  } else if (error instanceof CoolifyRateLimitError) {
    console.log(`Rate limited. Retry after ${error.retryAfter} seconds`);
  } else if (error instanceof CoolifyServerError) {
    console.log('Server error:', error.message);
  } else if (error instanceof CoolifyError) {
    console.log('API error:', error.message, error.statusCode);
  }
}
```

## TypeScript

All types are exported from the package:

```typescript
import type {
  Application,
  Database,
  Server,
  Project,
  Service,
  Deployment,
  Team,
  PrivateKey,
  GitHubApp,
  CoolifyClientConfig,
} from '@neelansh/coolifyjs';
```

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build
npm run build

# Type check
npm run lint

# Clean build artifacts
npm run clean
```

## Publishing to NPM

### First-time Setup

1. Create an NPM account at [npmjs.com](https://www.npmjs.com/)
2. Login to NPM:
   ```bash
   npm login
   ```
3. Update the `repository`, `bugs`, and `homepage` URLs in `package.json` with your GitHub repository

### Publishing Commands
```
export NPM_TOKEN=<MY_NPM_TOKEN>
```

```bash
# Dry run (test publish without actually publishing)
npm run release:dry

# Publish current version
npm run release

# Publish with version bump
npm run release:patch   # 1.0.0 -> 1.0.1
npm run release:minor   # 1.0.0 -> 1.1.0
npm run release:major   # 1.0.0 -> 2.0.0
```

### Manual Publishing

```bash
# 1. Run tests
npm run test:run

# 2. Build the package
npm run build

# 3. Bump version (choose one)
npm version patch  # or minor, major

# 4. Publish to NPM
npm publish

# 5. Push tags to git
git push --follow-tags
```

## License

MIT
