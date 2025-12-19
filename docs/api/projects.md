# Projects

Organize resources into projects and manage environments (production, staging, etc.).

## Methods

### `list()`

List all projects.

**Returns:** `Promise<Project[]>`

**Example:**

```typescript
const projects = await coolify.projects.list();
console.log(`Found ${projects.length} projects`);
```

---

### `get(uuid: UUID)`

Get a specific project by UUID.

**Parameters:**
- `uuid` - Project UUID

**Returns:** `Promise<Project>`

**Example:**

```typescript
const project = await coolify.projects.get('project-uuid');
console.log(`Project: ${project.name}`);
console.log(`Description: ${project.description}`);
```

---

### `create(data: CreateProject)`

Create a new project.

**Parameters:**
- `data` - Project creation data
  - `name` - Project name
  - `description` - Project description (optional)

**Returns:** `Promise<UuidResponse>`

**Example:**

```typescript
const { uuid } = await coolify.projects.create({
  name: 'My Project',
  description: 'Production applications',
});
```

---

### `update(uuid: UUID, data: UpdateProject)`

Update a project.

**Parameters:**
- `uuid` - Project UUID
- `data` - Update data (partial project fields)

**Returns:** `Promise<Project>`

**Example:**

```typescript
const updated = await coolify.projects.update('project-uuid', {
  name: 'New Name',
  description: 'Updated description',
});
```

---

### `delete(uuid: UUID)`

Delete a project.

**Parameters:**
- `uuid` - Project UUID

**Returns:** `Promise<MessageResponse>`

**Example:**

```typescript
await coolify.projects.delete('project-uuid');
```

---

### `listEnvironments(projectUuid: UUID)`

List environments for a project.

**Parameters:**
- `projectUuid` - Project UUID

**Returns:** `Promise<ProjectEnvironment[]>`

**Example:**

```typescript
const envs = await coolify.projects.listEnvironments('project-uuid');
console.log(`Found ${envs.length} environments`);

envs.forEach(env => {
  console.log(`- ${env.name}`);
});
```

---

### `getEnvironment(projectUuid: UUID, environmentName: string)`

Get a specific environment by name.

**Parameters:**
- `projectUuid` - Project UUID
- `environmentName` - Environment name (e.g., 'production', 'staging')

**Returns:** `Promise<EnvironmentWithResources>`

**Example:**

```typescript
const env = await coolify.projects.getEnvironment('project-uuid', 'production');
console.log(`Environment: ${env.name}`);
console.log(`Applications: ${env.applications.length}`);
console.log(`Databases: ${env.databases.length}`);
```

---

### `createEnvironment(projectUuid: UUID, data: CreateEnvironment)`

Create a new environment for a project.

**Parameters:**
- `projectUuid` - Project UUID
- `data` - Environment creation data
  - `name` - Environment name

**Returns:** `Promise<UuidResponse>`

**Example:**

```typescript
const { uuid } = await coolify.projects.createEnvironment('project-uuid', {
  name: 'staging',
});
```

---

### `deleteEnvironment(projectUuid: UUID, environmentName: string)`

Delete an environment.

**Parameters:**
- `projectUuid` - Project UUID
- `environmentName` - Environment name

**Returns:** `Promise<MessageResponse>`

**Example:**

```typescript
await coolify.projects.deleteEnvironment('project-uuid', 'staging');
```

## Types

See the [Types Reference](/reference/types) for detailed type definitions.

## Related

- [Applications](/api/applications) - Manage applications in projects
- [Databases](/api/databases) - Manage databases in projects
- [Services](/api/services) - Manage services in projects
