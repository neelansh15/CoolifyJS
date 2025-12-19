# Databases

Manage databases in your Coolify instance. Supports PostgreSQL, MySQL, MariaDB, MongoDB, Redis, Dragonfly, KeyDB, and ClickHouse.

## Methods

### `list()`

List all databases.

**Returns:** `Promise<AnyDatabase[]>`

**Example:**

```typescript
const databases = await coolify.databases.list();
console.log(`Found ${databases.length} databases`);
```

---

### `get(uuid: UUID)`

Get a specific database by UUID.

**Parameters:**
- `uuid` - Database UUID

**Returns:** `Promise<AnyDatabase>`

**Example:**

```typescript
const db = await coolify.databases.get('db-uuid');
console.log(`Database: ${db.name}`);
console.log(`Type: ${db.type}`);
```

---

### `createPostgreSQL(data: CreatePostgreSQLDatabase)`

Create a PostgreSQL database.

**Parameters:**
- `data` - Database creation data
  - `project_uuid` - Project UUID
  - `server_uuid` - Server UUID
  - `name` - Database name
  - `postgres_user` - PostgreSQL user (optional)
  - `postgres_password` - PostgreSQL password (optional)
  - `postgres_db` - Database name (optional)
  - `instant_deploy` - Deploy immediately (optional)

**Returns:** `Promise<UuidResponse>`

**Example:**

```typescript
const { uuid } = await coolify.databases.createPostgreSQL({
  project_uuid: 'project-uuid',
  server_uuid: 'server-uuid',
  name: 'my-postgres',
  postgres_user: 'admin',
  postgres_password: 'secret',
  postgres_db: 'mydb',
  instant_deploy: true,
});
```

---

### `createMySQL(data: CreateMySQLDatabase)`

Create a MySQL database.

**Parameters:**
- `data` - Database creation data
  - `project_uuid` - Project UUID
  - `server_uuid` - Server UUID
  - `name` - Database name
  - `mysql_root_password` - Root password (optional)
  - `mysql_database` - Database name (optional)
  - `mysql_user` - MySQL user (optional)
  - `mysql_password` - MySQL password (optional)
  - `instant_deploy` - Deploy immediately (optional)

**Returns:** `Promise<UuidResponse>`

**Example:**

```typescript
const { uuid } = await coolify.databases.createMySQL({
  project_uuid: 'project-uuid',
  server_uuid: 'server-uuid',
  name: 'my-mysql',
  mysql_root_password: 'rootpass',
  mysql_database: 'mydb',
});
```

---

### `createMariaDB(data: CreateMariaDBDatabase)`

Create a MariaDB database.

**Parameters:**
- `data` - Database creation data (similar to MySQL)

**Returns:** `Promise<UuidResponse>`

**Example:**

```typescript
const { uuid } = await coolify.databases.createMariaDB({
  project_uuid: 'project-uuid',
  server_uuid: 'server-uuid',
  name: 'my-mariadb',
});
```

---

### `createMongoDB(data: CreateMongoDBDatabase)`

Create a MongoDB database.

**Parameters:**
- `data` - Database creation data
  - `project_uuid` - Project UUID
  - `server_uuid` - Server UUID
  - `name` - Database name
  - `mongo_root_password` - Root password (optional)
  - `mongo_database` - Database name (optional)
  - `mongo_user` - MongoDB user (optional)
  - `mongo_password` - MongoDB password (optional)
  - `instant_deploy` - Deploy immediately (optional)

**Returns:** `Promise<UuidResponse>`

**Example:**

```typescript
const { uuid } = await coolify.databases.createMongoDB({
  project_uuid: 'project-uuid',
  server_uuid: 'server-uuid',
  name: 'my-mongo',
  mongo_root_password: 'rootpass',
});
```

---

### `createRedis(data: CreateRedisDatabase)`

Create a Redis database.

**Parameters:**
- `data` - Database creation data
  - `project_uuid` - Project UUID
  - `server_uuid` - Server UUID
  - `name` - Database name
  - `redis_password` - Redis password (optional)
  - `instant_deploy` - Deploy immediately (optional)

**Returns:** `Promise<UuidResponse>`

**Example:**

```typescript
const { uuid } = await coolify.databases.createRedis({
  project_uuid: 'project-uuid',
  server_uuid: 'server-uuid',
  name: 'my-redis',
  redis_password: 'secret',
});
```

---

### `createDragonfly(data: CreateDragonflyDatabase)`

Create a Dragonfly database.

**Parameters:**
- `data` - Database creation data (similar to Redis)

**Returns:** `Promise<UuidResponse>`

**Example:**

```typescript
const { uuid } = await coolify.databases.createDragonfly({
  project_uuid: 'project-uuid',
  server_uuid: 'server-uuid',
  name: 'my-dragonfly',
});
```

---

### `createKeyDB(data: CreateKeyDBDatabase)`

Create a KeyDB database.

**Parameters:**
- `data` - Database creation data (similar to Redis)

**Returns:** `Promise<UuidResponse>`

**Example:**

```typescript
const { uuid } = await coolify.databases.createKeyDB({
  project_uuid: 'project-uuid',
  server_uuid: 'server-uuid',
  name: 'my-keydb',
});
```

---

### `createClickHouse(data: CreateClickHouseDatabase)`

Create a ClickHouse database.

**Parameters:**
- `data` - Database creation data
  - `project_uuid` - Project UUID
  - `server_uuid` - Server UUID
  - `name` - Database name
  - `clickhouse_user` - ClickHouse user (optional)
  - `clickhouse_password` - ClickHouse password (optional)
  - `clickhouse_database` - Database name (optional)
  - `instant_deploy` - Deploy immediately (optional)

**Returns:** `Promise<UuidResponse>`

**Example:**

```typescript
const { uuid } = await coolify.databases.createClickHouse({
  project_uuid: 'project-uuid',
  server_uuid: 'server-uuid',
  name: 'my-clickhouse',
});
```

---

### `update(uuid: UUID, data: UpdateDatabase)`

Update a database.

**Parameters:**
- `uuid` - Database UUID
- `data` - Update data (partial database fields)

**Returns:** `Promise<AnyDatabase>`

**Example:**

```typescript
const updated = await coolify.databases.update('db-uuid', {
  name: 'New Name',
});
```

---

### `delete(uuid: UUID, deleteConfigurations?: boolean, deleteVolumes?: boolean)`

Delete a database.

**Parameters:**
- `uuid` - Database UUID
- `deleteConfigurations` - Delete configurations (default: `false`)
- `deleteVolumes` - Delete volumes (default: `false`)

**Returns:** `Promise<MessageResponse>`

**Example:**

```typescript
await coolify.databases.delete('db-uuid', true, true);
```

---

### `start(uuid: UUID)`

Start a database.

**Parameters:**
- `uuid` - Database UUID

**Returns:** `Promise<DeploymentResponse>`

**Example:**

```typescript
const result = await coolify.databases.start('db-uuid');
console.log(result.message);
```

---

### `stop(uuid: UUID)`

Stop a database.

**Parameters:**
- `uuid` - Database UUID

**Returns:** `Promise<MessageResponse>`

**Example:**

```typescript
await coolify.databases.stop('db-uuid');
```

---

### `restart(uuid: UUID)`

Restart a database.

**Parameters:**
- `uuid` - Database UUID

**Returns:** `Promise<DeploymentResponse>`

**Example:**

```typescript
const result = await coolify.databases.restart('db-uuid');
console.log(result.message);
```

---

### `listBackups(uuid: UUID)`

List backups for a database.

**Parameters:**
- `uuid` - Database UUID

**Returns:** `Promise<DatabaseBackup[]>`

**Example:**

```typescript
const backups = await coolify.databases.listBackups('db-uuid');
console.log(`Found ${backups.length} backups`);
```

---

### `createBackup(uuid: UUID)`

Create a backup for a database.

**Parameters:**
- `uuid` - Database UUID

**Returns:** `Promise<MessageResponse>`

**Example:**

```typescript
await coolify.databases.createBackup('db-uuid');
console.log('Backup created');
```

## Types

See the [Types Reference](/reference/types) for detailed type definitions.

## Related

- [Projects](/api/projects) - Organize databases into projects
- [Servers](/api/servers) - Manage servers where databases run
