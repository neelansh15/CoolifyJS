# GitHub Apps

Manage GitHub App integrations for accessing private repositories.

## Methods

### `list()`

List all GitHub Apps.

**Returns:** `Promise<GitHubApp[]>`

**Example:**

```typescript
const apps = await coolify.githubApps.list();
console.log(`Found ${apps.length} GitHub Apps`);
```

---

### `get(uuid: UUID)`

Get a specific GitHub App by UUID.

**Parameters:**
- `uuid` - GitHub App UUID

**Returns:** `Promise<GitHubApp>`

**Example:**

```typescript
const app = await coolify.githubApps.get('app-uuid');
console.log(`GitHub App: ${app.name}`);
console.log(`App ID: ${app.app_id}`);
```

---

### `create(data: CreateGitHubApp)`

Create a GitHub App.

**Parameters:**
- `data` - GitHub App creation data
  - `name` - App name
  - `app_id` - GitHub App ID
  - `installation_id` - Installation ID
  - `client_id` - GitHub App client ID
  - `client_secret` - GitHub App client secret
  - `webhook_secret` - Webhook secret (optional)
  - `private_key` - GitHub App private key (PEM format)

**Returns:** `Promise<UuidResponse>`

**Example:**

```typescript
const { uuid } = await coolify.githubApps.create({
  name: 'My GitHub App',
  app_id: 123456,
  installation_id: 789012,
  client_id: 'Iv1.xxx',
  client_secret: 'secret',
  webhook_secret: 'webhook-secret',
  private_key: '-----BEGIN RSA PRIVATE KEY-----\n...',
});
```

---

### `update(uuid: UUID, data: UpdateGitHubApp)`

Update a GitHub App.

**Parameters:**
- `uuid` - GitHub App UUID
- `data` - Update data (partial GitHub App fields)

**Returns:** `Promise<GitHubApp>`

**Example:**

```typescript
const updated = await coolify.githubApps.update('app-uuid', {
  name: 'New Name',
});
```

---

### `delete(uuid: UUID)`

Delete a GitHub App.

**Parameters:**
- `uuid` - GitHub App UUID

**Returns:** `Promise<MessageResponse>`

**Example:**

```typescript
await coolify.githubApps.delete('app-uuid');
```

---

### `loadRepositories(uuid: UUID)`

Load repositories for a GitHub App.

**Parameters:**
- `uuid` - GitHub App UUID

**Returns:** `Promise<LoadRepositoriesResponse>`

**Example:**

```typescript
const repos = await coolify.githubApps.loadRepositories('app-uuid');
console.log(`Found ${repos.repositories.length} repositories`);

repos.repositories.forEach(repo => {
  console.log(`- ${repo.full_name}`);
});
```

---

### `loadBranches(uuid: UUID, repositoryName: string)`

Load branches for a repository.

**Parameters:**
- `uuid` - GitHub App UUID
- `repositoryName` - Repository name (owner/repo)

**Returns:** `Promise<LoadBranchesResponse>`

**Example:**

```typescript
const branches = await coolify.githubApps.loadBranches(
  'app-uuid',
  'owner/repo'
);
console.log(`Found ${branches.branches.length} branches`);

branches.branches.forEach(branch => {
  console.log(`- ${branch.name}`);
});
```

## Types

See the [Types Reference](/reference/types) for detailed type definitions.

## Related

- [Applications](/api/applications) - Create applications from GitHub repositories
- [Private Keys](/api/private-keys) - Alternative method for private repository access
