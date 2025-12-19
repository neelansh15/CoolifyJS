# Applications

Manage applications in your Coolify instance. Applications can be created from Git repositories, Docker images, Dockerfiles, or Docker Compose files.

## Methods

### `list()`

List all applications.

**Returns:** `Promise<Application[]>`

**Example:**

```typescript
const apps = await coolify.applications.list();
console.log(`Found ${apps.length} applications`);
```

---

### `get(uuid: UUID)`

Get a specific application by UUID.

**Parameters:**
- `uuid` - Application UUID

**Returns:** `Promise<Application>`

**Example:**

```typescript
const app = await coolify.applications.get('app-uuid');
console.log(`Application: ${app.name}`);
console.log(`Status: ${app.status}`);
```

---

### `createFromPublicRepo(data: CreatePublicApplication)`

Create an application from a public Git repository.

**Parameters:**
- `data` - Application creation data
  - `project_uuid` - Project UUID
  - `server_uuid` - Server UUID
  - `git_repository` - Git repository URL
  - `git_branch` - Git branch name
  - `name` - Application name
  - `instant_deploy` - Deploy immediately (optional)

**Returns:** `Promise<UuidResponse>`

**Example:**

```typescript
const { uuid } = await coolify.applications.createFromPublicRepo({
  project_uuid: 'project-uuid',
  server_uuid: 'server-uuid',
  git_repository: 'https://github.com/user/repo',
  git_branch: 'main',
  name: 'My App',
  instant_deploy: true,
});
```

---

### `createFromPrivateRepoGitHubApp(data: CreatePrivateGitHubAppApplication)`

Create an application from a private repository using GitHub App.

**Parameters:**
- `data` - Application creation data
  - `project_uuid` - Project UUID
  - `server_uuid` - Server UUID
  - `github_app_uuid` - GitHub App UUID
  - `git_repository` - Repository name (owner/repo)
  - `git_branch` - Git branch name
  - `name` - Application name
  - `instant_deploy` - Deploy immediately (optional)

**Returns:** `Promise<UuidResponse>`

**Example:**

```typescript
const { uuid } = await coolify.applications.createFromPrivateRepoGitHubApp({
  project_uuid: 'project-uuid',
  server_uuid: 'server-uuid',
  github_app_uuid: 'github-app-uuid',
  git_repository: 'owner/private-repo',
  git_branch: 'main',
  name: 'Private App',
});
```

---

### `createFromPrivateRepoDeployKey(data: CreatePrivateDeployKeyApplication)`

Create an application from a private repository using deploy key.

**Parameters:**
- `data` - Application creation data
  - `project_uuid` - Project UUID
  - `server_uuid` - Server UUID
  - `private_key_uuid` - Private key UUID
  - `git_repository` - Git repository URL
  - `git_branch` - Git branch name
  - `name` - Application name
  - `instant_deploy` - Deploy immediately (optional)

**Returns:** `Promise<UuidResponse>`

**Example:**

```typescript
const { uuid } = await coolify.applications.createFromPrivateRepoDeployKey({
  project_uuid: 'project-uuid',
  server_uuid: 'server-uuid',
  private_key_uuid: 'key-uuid',
  git_repository: 'git@github.com:owner/repo.git',
  git_branch: 'main',
  name: 'Private App',
});
```

---

### `createFromDockerfile(data: CreateDockerfileApplication)`

Create an application from a Dockerfile.

**Parameters:**
- `data` - Application creation data
  - `project_uuid` - Project UUID
  - `server_uuid` - Server UUID
  - `git_repository` - Git repository URL
  - `git_branch` - Git branch name
  - `name` - Application name
  - `dockerfile` - Path to Dockerfile (optional)
  - `port` - Port number (optional)
  - `instant_deploy` - Deploy immediately (optional)

**Returns:** `Promise<UuidResponse>`

**Example:**

```typescript
const { uuid } = await coolify.applications.createFromDockerfile({
  project_uuid: 'project-uuid',
  server_uuid: 'server-uuid',
  git_repository: 'https://github.com/user/repo',
  git_branch: 'main',
  name: 'Dockerfile App',
  dockerfile: './Dockerfile',
  port: 3000,
});
```

---

### `createFromDockerImage(data: CreateDockerImageApplication)`

Create an application from a Docker image.

**Parameters:**
- `data` - Application creation data
  - `project_uuid` - Project UUID
  - `server_uuid` - Server UUID
  - `docker_registry_image_name` - Docker image name
  - `docker_registry_image_tag` - Docker image tag
  - `name` - Application name
  - `port` - Port number (optional)
  - `instant_deploy` - Deploy immediately (optional)

**Returns:** `Promise<UuidResponse>`

**Example:**

```typescript
const { uuid } = await coolify.applications.createFromDockerImage({
  project_uuid: 'project-uuid',
  server_uuid: 'server-uuid',
  docker_registry_image_name: 'nginx',
  docker_registry_image_tag: 'latest',
  name: 'Nginx App',
  port: 80,
});
```

---

### `createFromDockerCompose(data: CreateDockerComposeApplication)`

Create an application from Docker Compose.

**Parameters:**
- `data` - Application creation data
  - `project_uuid` - Project UUID
  - `server_uuid` - Server UUID
  - `git_repository` - Git repository URL
  - `git_branch` - Git branch name
  - `name` - Application name
  - `docker_compose_file` - Path to docker-compose.yml (optional)
  - `instant_deploy` - Deploy immediately (optional)

**Returns:** `Promise<UuidResponse>`

**Example:**

```typescript
const { uuid } = await coolify.applications.createFromDockerCompose({
  project_uuid: 'project-uuid',
  server_uuid: 'server-uuid',
  git_repository: 'https://github.com/user/repo',
  git_branch: 'main',
  name: 'Compose App',
  docker_compose_file: './docker-compose.yml',
});
```

---

### `update(uuid: UUID, data: UpdateApplication)`

Update an application.

**Parameters:**
- `uuid` - Application UUID
- `data` - Update data (partial application fields)

**Returns:** `Promise<Application>`

**Example:**

```typescript
const updated = await coolify.applications.update('app-uuid', {
  name: 'New Name',
  domains: 'app.example.com',
});
```

---

### `delete(uuid: UUID, deleteConfigurations?: boolean, deleteVolumes?: boolean)`

Delete an application.

**Parameters:**
- `uuid` - Application UUID
- `deleteConfigurations` - Delete configurations (default: `false`)
- `deleteVolumes` - Delete volumes (default: `false`)

**Returns:** `Promise<MessageResponse>`

**Example:**

```typescript
await coolify.applications.delete('app-uuid', true, true);
```

---

### `listEnvs(uuid: UUID)`

List environment variables for an application.

**Parameters:**
- `uuid` - Application UUID

**Returns:** `Promise<ApplicationEnvs>`

**Example:**

```typescript
const envs = await coolify.applications.listEnvs('app-uuid');
console.log(envs.envs);
```

---

### `createEnv(uuid: UUID, data: CreateEnvironmentVariable)`

Create an environment variable.

**Parameters:**
- `uuid` - Application UUID
- `data` - Environment variable data
  - `key` - Variable key
  - `value` - Variable value
  - `is_build_time` - Build-time variable (optional)
  - `is_preview` - Preview variable (optional)
  - `is_literal` - Literal value (optional)
  - `is_multiline` - Multiline value (optional)
  - `is_shown_once` - Show once (optional)

**Returns:** `Promise<UuidResponse>`

**Example:**

```typescript
const { uuid } = await coolify.applications.createEnv('app-uuid', {
  key: 'NODE_ENV',
  value: 'production',
  is_build_time: false,
});
```

---

### `updateEnv(uuid: UUID, envUuid: UUID, data: UpdateEnvironmentVariable)`

Update an environment variable.

**Parameters:**
- `uuid` - Application UUID
- `envUuid` - Environment variable UUID
- `data` - Update data (partial environment variable fields)

**Returns:** `Promise<MessageResponse>`

**Example:**

```typescript
await coolify.applications.updateEnv('app-uuid', 'env-uuid', {
  value: 'development',
});
```

---

### `bulkUpdateEnvs(uuid: UUID, data: BulkUpdateEnvironmentVariables)`

Bulk update environment variables.

**Parameters:**
- `uuid` - Application UUID
- `data` - Bulk update data
  - `data` - Array of environment variables

**Returns:** `Promise<MessageResponse>`

**Example:**

```typescript
await coolify.applications.bulkUpdateEnvs('app-uuid', {
  data: [
    { key: 'NODE_ENV', value: 'production' },
    { key: 'API_URL', value: 'https://api.example.com' },
  ],
});
```

---

### `deleteEnv(uuid: UUID, envUuid: UUID)`

Delete an environment variable.

**Parameters:**
- `uuid` - Application UUID
- `envUuid` - Environment variable UUID

**Returns:** `Promise<MessageResponse>`

**Example:**

```typescript
await coolify.applications.deleteEnv('app-uuid', 'env-uuid');
```

---

### `start(uuid: UUID)`

Start an application.

**Parameters:**
- `uuid` - Application UUID

**Returns:** `Promise<DeploymentResponse>`

**Example:**

```typescript
const result = await coolify.applications.start('app-uuid');
console.log(result.message);
```

---

### `stop(uuid: UUID)`

Stop an application.

**Parameters:**
- `uuid` - Application UUID

**Returns:** `Promise<MessageResponse>`

**Example:**

```typescript
await coolify.applications.stop('app-uuid');
```

---

### `restart(uuid: UUID)`

Restart an application.

**Parameters:**
- `uuid` - Application UUID

**Returns:** `Promise<DeploymentResponse>`

**Example:**

```typescript
const result = await coolify.applications.restart('app-uuid');
console.log(result.message);
```

---

### `logs(uuid: UUID)`

Get application logs.

**Parameters:**
- `uuid` - Application UUID

**Returns:** `Promise<ApplicationLogs>`

**Example:**

```typescript
const logs = await coolify.applications.logs('app-uuid');
console.log(logs.logs);
```

## Types

See the [Types Reference](/reference/types) for detailed type definitions.

## Related

- [Deployments](/api/deployments) - Manage application deployments
- [Projects](/api/projects) - Organize applications into projects
- [Servers](/api/servers) - Manage servers where applications run
