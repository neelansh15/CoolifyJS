# System

System operations and health checks for your Coolify instance.

## Methods

### `version()`

Get the Coolify version.

**Returns:** `Promise<VersionResponse>`

**Example:**

```typescript
const { version } = await coolify.system.version();
console.log(`Coolify version: ${version}`);
```

---

### `healthCheck()`

Check the health of the Coolify API.

**Returns:** `Promise<HealthCheckResponse>`

**Example:**

```typescript
const health = await coolify.system.healthCheck();
if (health.status === 'ok') {
  console.log('Coolify API is healthy');
} else {
  console.error('Health check failed:', health);
}
```

---

### `enableApi()`

Enable the Coolify API.

**Returns:** `Promise<ToggleApiResponse>`

**Example:**

```typescript
const result = await coolify.system.enableApi();
console.log(result.message);
```

---

### `disableApi()`

Disable the Coolify API.

**Returns:** `Promise<ToggleApiResponse>`

**Example:**

```typescript
const result = await coolify.system.disableApi();
console.log(result.message);
```

## Types

See the [Types Reference](/reference/types) for detailed type definitions.

## Related

- [Getting Started](/guide/getting-started) - Initial setup guide
