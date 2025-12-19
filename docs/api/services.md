# Services

Manage one-click services (pre-configured applications) in your Coolify instance. Services include applications like Plausible, PostHog, and other popular self-hosted tools.

## Methods

### `list()`

List all services.

**Returns:** `Promise<Service[]>`

**Example:**

```typescript
const services = await coolify.services.list();
console.log(`Found ${services.length} services`);
```

---

### `get(uuid: UUID)`

Get a specific service by UUID.

**Parameters:**
- `uuid` - Service UUID

**Returns:** `Promise<Service>`

**Example:**

```typescript
const service = await coolify.services.get('service-uuid');
console.log(`Service: ${service.name}`);
console.log(`Type: ${service.type}`);
```

---

### `create(data: CreateService)`

Create a new service.

**Parameters:**
- `data` - Service creation data
  - `project_uuid` - Project UUID
  - `server_uuid` - Server UUID
  - `type` - Service type (e.g., 'plausible', 'posthog')
  - `name` - Service name
  - `instant_deploy` - Deploy immediately (optional)

**Returns:** `Promise<UuidResponse>`

**Example:**

```typescript
const { uuid } = await coolify.services.create({
  project_uuid: 'project-uuid',
  server_uuid: 'server-uuid',
  type: 'plausible',
  name: 'My Analytics',
  instant_deploy: true,
});
```

---

### `update(uuid: UUID, data: UpdateService)`

Update a service.

**Parameters:**
- `uuid` - Service UUID
- `data` - Update data (partial service fields)

**Returns:** `Promise<Service>`

**Example:**

```typescript
const updated = await coolify.services.update('service-uuid', {
  name: 'New Name',
});
```

---

### `delete(uuid: UUID, deleteConfigurations?: boolean, deleteVolumes?: boolean)`

Delete a service.

**Parameters:**
- `uuid` - Service UUID
- `deleteConfigurations` - Delete configurations (default: `false`)
- `deleteVolumes` - Delete volumes (default: `false`)

**Returns:** `Promise<MessageResponse>`

**Example:**

```typescript
await coolify.services.delete('service-uuid', true, true);
```

---

### `listEnvs(uuid: UUID)`

List environment variables for a service.

**Parameters:**
- `uuid` - Service UUID

**Returns:** `Promise<ServiceEnvs>`

**Example:**

```typescript
const envs = await coolify.services.listEnvs('service-uuid');
console.log(envs.envs);
```

---

### `createEnv(uuid: UUID, data: CreateEnvironmentVariable)`

Create an environment variable for a service.

**Parameters:**
- `uuid` - Service UUID
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
const { uuid } = await coolify.services.createEnv('service-uuid', {
  key: 'SECRET_KEY',
  value: 'secret-value',
});
```

---

### `updateEnv(uuid: UUID, envUuid: UUID, data: UpdateEnvironmentVariable)`

Update an environment variable.

**Parameters:**
- `uuid` - Service UUID
- `envUuid` - Environment variable UUID
- `data` - Update data (partial environment variable fields)

**Returns:** `Promise<MessageResponse>`

**Example:**

```typescript
await coolify.services.updateEnv('service-uuid', 'env-uuid', {
  value: 'new-value',
});
```

---

### `bulkUpdateEnvs(uuid: UUID, data: BulkUpdateEnvironmentVariables)`

Bulk update environment variables.

**Parameters:**
- `uuid` - Service UUID
- `data` - Bulk update data
  - `data` - Array of environment variables

**Returns:** `Promise<MessageResponse>`

**Example:**

```typescript
await coolify.services.bulkUpdateEnvs('service-uuid', {
  data: [
    { key: 'SECRET_KEY', value: 'secret' },
    { key: 'API_URL', value: 'https://api.example.com' },
  ],
});
```

---

### `deleteEnv(uuid: UUID, envUuid: UUID)`

Delete an environment variable.

**Parameters:**
- `uuid` - Service UUID
- `envUuid` - Environment variable UUID

**Returns:** `Promise<MessageResponse>`

**Example:**

```typescript
await coolify.services.deleteEnv('service-uuid', 'env-uuid');
```

---

### `start(uuid: UUID)`

Start a service.

**Parameters:**
- `uuid` - Service UUID

**Returns:** `Promise<DeploymentResponse>`

**Example:**

```typescript
const result = await coolify.services.start('service-uuid');
console.log(result.message);
```

---

### `stop(uuid: UUID)`

Stop a service.

**Parameters:**
- `uuid` - Service UUID

**Returns:** `Promise<MessageResponse>`

**Example:**

```typescript
await coolify.services.stop('service-uuid');
```

---

### `restart(uuid: UUID)`

Restart a service.

**Parameters:**
- `uuid` - Service UUID

**Returns:** `Promise<DeploymentResponse>`

**Example:**

```typescript
const result = await coolify.services.restart('service-uuid');
console.log(result.message);
```

## Types

See the [Types Reference](/reference/types) for detailed type definitions.

## Related

- [Applications](/api/applications) - Manage applications
- [Projects](/api/projects) - Organize services into projects
- [Servers](/api/servers) - Manage servers where services run
