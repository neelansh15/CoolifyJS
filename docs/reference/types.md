# Types Reference

Complete reference for all TypeScript types exported by CoolifyJS.

## Client Configuration

### `CoolifyClientConfig`

Configuration options for the Coolify client.

```typescript
interface CoolifyClientConfig {
  baseUrl: string;      // Base URL of the Coolify API
  token: string;         // API token for authentication
  timeout?: number;      // Request timeout in milliseconds (default: 30000)
}
```

## Common Types

### `UUID`

String type for resource identifiers.

```typescript
type UUID = string;
```

### `MessageResponse`

Response for operations that return a message.

```typescript
interface MessageResponse {
  message: string;
}
```

### `UuidResponse`

Response for creation operations.

```typescript
interface UuidResponse {
  uuid: string;
}
```

### `DeploymentResponse`

Response for deployment operations.

```typescript
interface DeploymentResponse {
  message: string;
  deployment_uuid?: string;
}
```

### `ResourceStatus`

Status values for resources.

```typescript
type ResourceStatus = 
  | 'running'
  | 'stopped'
  | 'starting'
  | 'stopping'
  | 'restarting'
  | 'exited'
  | 'degraded';
```

### `EnvironmentVariable`

Environment variable structure.

```typescript
interface EnvironmentVariable {
  id?: number;
  uuid?: string;
  key: string;
  value: string;
  is_build_time?: boolean;
  is_preview?: boolean;
  is_literal?: boolean;
  is_multiline?: boolean;
  is_shown_once?: boolean;
}
```

### `CreateEnvironmentVariable`

Input for creating environment variables.

```typescript
interface CreateEnvironmentVariable {
  key: string;
  value: string;
  is_build_time?: boolean;
  is_preview?: boolean;
  is_literal?: boolean;
  is_multiline?: boolean;
  is_shown_once?: boolean;
}
```

### `UpdateEnvironmentVariable`

Input for updating environment variables.

```typescript
interface UpdateEnvironmentVariable {
  key?: string;
  value?: string;
  is_build_time?: boolean;
  is_preview?: boolean;
  is_literal?: boolean;
  is_multiline?: boolean;
  is_shown_once?: boolean;
}
```

### `BulkUpdateEnvironmentVariables`

Input for bulk updating environment variables.

```typescript
interface BulkUpdateEnvironmentVariables {
  data: CreateEnvironmentVariable[];
}
```

## Resource Types

### Applications

- `Application` - Application object
- `CreatePublicApplication` - Create from public repo
- `CreatePrivateGitHubAppApplication` - Create from private repo (GitHub App)
- `CreatePrivateDeployKeyApplication` - Create from private repo (deploy key)
- `CreateDockerfileApplication` - Create from Dockerfile
- `CreateDockerImageApplication` - Create from Docker image
- `CreateDockerComposeApplication` - Create from Docker Compose
- `UpdateApplication` - Update application
- `ApplicationEnvs` - Application environment variables
- `ApplicationLogs` - Application logs

### Databases

- `AnyDatabase` - Union type for all database types
- `CreatePostgreSQLDatabase` - Create PostgreSQL database
- `CreateMySQLDatabase` - Create MySQL database
- `CreateMariaDBDatabase` - Create MariaDB database
- `CreateMongoDBDatabase` - Create MongoDB database
- `CreateRedisDatabase` - Create Redis database
- `CreateDragonflyDatabase` - Create Dragonfly database
- `CreateKeyDBDatabase` - Create KeyDB database
- `CreateClickHouseDatabase` - Create ClickHouse database
- `UpdateDatabase` - Update database
- `DatabaseBackup` - Database backup

### Deployments

- `Deployment` - Deployment object
- `DeployApplicationInput` - Deploy application input

### Services

- `Service` - Service object
- `CreateService` - Create service
- `UpdateService` - Update service
- `ServiceEnvs` - Service environment variables

### Projects

- `Project` - Project object
- `CreateProject` - Create project
- `UpdateProject` - Update project
- `ProjectEnvironment` - Project environment
- `CreateEnvironment` - Create environment
- `EnvironmentWithResources` - Environment with resources

### Servers

- `Server` - Server object
- `CreateServer` - Create server
- `UpdateServer` - Update server
- `ServerResources` - Server resources
- `ServerDomains` - Server domains
- `ValidateServerResponse` - Validate server response

### GitHub Apps

- `GitHubApp` - GitHub App object
- `CreateGitHubApp` - Create GitHub App
- `UpdateGitHubApp` - Update GitHub App
- `LoadRepositoriesResponse` - Load repositories response
- `LoadBranchesResponse` - Load branches response

### Private Keys

- `PrivateKey` - Private key object
- `CreatePrivateKey` - Create private key
- `UpdatePrivateKey` - Update private key

### Teams

- `Team` - Team object
- `TeamMember` - Team member object
- `TeamMembersResponse` - Team members response

### System

- `VersionResponse` - Version response
- `HealthCheckResponse` - Health check response
- `ToggleApiResponse` - Toggle API response

### Resources

- `ListResourcesResponse` - List resources response

## Importing Types

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

## Related

- [API Reference](/api/) - Method documentation
- [Errors Reference](/reference/errors) - Error classes
