# Deployments

Manage application deployments in your Coolify instance.

## Methods

### `list()`

List all deployments.

**Returns:** `Promise<Deployment[]>`

**Example:**

```typescript
const deployments = await coolify.deployments.list();
console.log(`Found ${deployments.length} deployments`);
```

---

### `get(uuid: UUID)`

Get a specific deployment by UUID.

**Parameters:**
- `uuid` - Deployment UUID

**Returns:** `Promise<Deployment>`

**Example:**

```typescript
const deployment = await coolify.deployments.get('deployment-uuid');
console.log(`Status: ${deployment.status}`);
console.log(`Created: ${deployment.created_at}`);
```

---

### `deploy(applicationUuid: UUID, options?: DeployApplicationInput)`

Deploy an application.

**Parameters:**
- `applicationUuid` - Application UUID
- `options` - Deployment options (optional)
  - `force` - Force deployment (optional)
  - `instant_deploy` - Instant deploy (optional)

**Returns:** `Promise<DeploymentResponse>`

**Example:**

```typescript
// Deploy normally
const result = await coolify.deployments.deploy('app-uuid');
console.log(result.message);

// Force deployment
const forced = await coolify.deployments.deploy('app-uuid', { force: true });

// Instant deploy
const instant = await coolify.deployments.deploy('app-uuid', { instant_deploy: true });
```

---

### `listByApplication(applicationUuid: UUID)`

List deployments for a specific application.

**Parameters:**
- `applicationUuid` - Application UUID

**Returns:** `Promise<Deployment[]>`

**Example:**

```typescript
const appDeployments = await coolify.deployments.listByApplication('app-uuid');
console.log(`Found ${appDeployments.length} deployments for this application`);

appDeployments.forEach(deployment => {
  console.log(`- ${deployment.status} at ${deployment.created_at}`);
});
```

## Types

See the [Types Reference](/reference/types) for detailed type definitions.

## Related

- [Applications](/api/applications) - Manage applications
- [Services](/api/services) - Manage services
