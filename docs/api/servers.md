# Servers

Manage servers where your applications run. Add, configure, and validate servers.

## Methods

### `list()`

List all servers.

**Returns:** `Promise<Server[]>`

**Example:**

```typescript
const servers = await coolify.servers.list();
console.log(`Found ${servers.length} servers`);
```

---

### `get(uuid: UUID)`

Get a specific server by UUID.

**Parameters:**
- `uuid` - Server UUID

**Returns:** `Promise<Server>`

**Example:**

```typescript
const server = await coolify.servers.get('server-uuid');
console.log(`Server: ${server.name}`);
console.log(`IP: ${server.ip}`);
```

---

### `create(data: CreateServer)`

Create a new server.

**Parameters:**
- `data` - Server creation data
  - `name` - Server name
  - `ip` - Server IP address
  - `private_key_uuid` - Private key UUID for SSH access
  - `port` - SSH port (optional, default: 22)
  - `user` - SSH user (optional, default: 'root')
  - `instant_validate` - Validate immediately (optional)

**Returns:** `Promise<UuidResponse>`

**Example:**

```typescript
const { uuid } = await coolify.servers.create({
  name: 'Production Server',
  ip: '192.168.1.100',
  private_key_uuid: 'pk-uuid',
  port: 22,
  user: 'root',
  instant_validate: true,
});
```

---

### `update(uuid: UUID, data: UpdateServer)`

Update a server.

**Parameters:**
- `uuid` - Server UUID
- `data` - Update data (partial server fields)

**Returns:** `Promise<Server>`

**Example:**

```typescript
const updated = await coolify.servers.update('server-uuid', {
  name: 'New Name',
});
```

---

### `delete(uuid: UUID)`

Delete a server.

**Parameters:**
- `uuid` - Server UUID

**Returns:** `Promise<MessageResponse>`

**Example:**

```typescript
await coolify.servers.delete('server-uuid');
```

---

### `getResources(uuid: UUID)`

Get resources (applications, databases, services) on a server.

**Parameters:**
- `uuid` - Server UUID

**Returns:** `Promise<ServerResources>`

**Example:**

```typescript
const resources = await coolify.servers.getResources('server-uuid');
console.log(`Applications: ${resources.applications.length}`);
console.log(`Databases: ${resources.databases.length}`);
console.log(`Services: ${resources.services.length}`);
```

---

### `getDomains(uuid: UUID)`

Get domains configured on a server.

**Parameters:**
- `uuid` - Server UUID

**Returns:** `Promise<ServerDomains>`

**Example:**

```typescript
const domains = await coolify.servers.getDomains('server-uuid');
console.log(`Found ${domains.domains.length} domains`);
```

---

### `validate(uuid: UUID)`

Validate a server connection.

**Parameters:**
- `uuid` - Server UUID

**Returns:** `Promise<ValidateServerResponse>`

**Example:**

```typescript
const validation = await coolify.servers.validate('server-uuid');
if (validation.success) {
  console.log('Server connection validated');
} else {
  console.error('Validation failed:', validation.message);
}
```

## Types

See the [Types Reference](/reference/types) for detailed type definitions.

## Related

- [Private Keys](/api/private-keys) - Manage SSH keys for server access
- [Applications](/api/applications) - Manage applications on servers
- [Databases](/api/databases) - Manage databases on servers
