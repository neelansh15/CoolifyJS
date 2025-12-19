# Private Keys

Manage SSH private keys used for server access and private repository authentication.

## Methods

### `list()`

List all private keys.

**Returns:** `Promise<PrivateKey[]>`

**Example:**

```typescript
const keys = await coolify.privateKeys.list();
console.log(`Found ${keys.length} private keys`);
```

---

### `get(uuid: UUID)`

Get a specific private key by UUID.

**Parameters:**
- `uuid` - Private key UUID

**Returns:** `Promise<PrivateKey>`

**Example:**

```typescript
const key = await coolify.privateKeys.get('key-uuid');
console.log(`Key: ${key.name}`);
console.log(`Created: ${key.created_at}`);
```

---

### `create(data: CreatePrivateKey)`

Create a new private key.

**Parameters:**
- `data` - Private key creation data
  - `name` - Key name
  - `private_key` - SSH private key (PEM format)

**Returns:** `Promise<UuidResponse>`

**Example:**

```typescript
const { uuid } = await coolify.privateKeys.create({
  name: 'Production Key',
  private_key: '-----BEGIN OPENSSH PRIVATE KEY-----\n...\n-----END OPENSSH PRIVATE KEY-----',
});
```

---

### `update(uuid: UUID, data: UpdatePrivateKey)`

Update a private key.

**Parameters:**
- `uuid` - Private key UUID
- `data` - Update data (partial private key fields)
  - `name` - Key name (optional)
  - `private_key` - SSH private key (optional)

**Returns:** `Promise<PrivateKey>`

**Example:**

```typescript
const updated = await coolify.privateKeys.update('key-uuid', {
  name: 'New Name',
});
```

---

### `delete(uuid: UUID)`

Delete a private key.

**Parameters:**
- `uuid` - Private key UUID

**Returns:** `Promise<MessageResponse>`

**Example:**

```typescript
await coolify.privateKeys.delete('key-uuid');
```

## Types

See the [Types Reference](/reference/types) for detailed type definitions.

## Related

- [Servers](/api/servers) - Use private keys for server access
- [Applications](/api/applications) - Use private keys for private repository access
- [GitHub Apps](/api/github-apps) - Alternative method for private repository access
