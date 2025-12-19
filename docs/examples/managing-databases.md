# Managing Databases

Examples for setting up and managing databases with CoolifyJS.

## Create PostgreSQL Database

```typescript
import { CoolifyClient } from '@neelansh/coolifyjs';

const coolify = new CoolifyClient({
  baseUrl: process.env.COOLIFY_BASE_URL!,
  token: process.env.COOLIFY_API_TOKEN!,
});

async function createPostgreSQL() {
  try {
    const { uuid } = await coolify.databases.createPostgreSQL({
      project_uuid: 'project-uuid',
      server_uuid: 'server-uuid',
      name: 'my-postgres',
      postgres_user: 'admin',
      postgres_password: 'secure-password',
      postgres_db: 'mydb',
      instant_deploy: true,
    });

    console.log(`PostgreSQL database created: ${uuid}`);
  } catch (error) {
    console.error('Failed to create database:', error);
  }
}
```

## Create MySQL Database

```typescript
async function createMySQL() {
  try {
    const { uuid } = await coolify.databases.createMySQL({
      project_uuid: 'project-uuid',
      server_uuid: 'server-uuid',
      name: 'my-mysql',
      mysql_root_password: 'root-password',
      mysql_database: 'mydb',
      mysql_user: 'appuser',
      mysql_password: 'user-password',
      instant_deploy: true,
    });

    console.log(`MySQL database created: ${uuid}`);
  } catch (error) {
    console.error('Failed to create database:', error);
  }
}
```

## Create Redis Database

```typescript
async function createRedis() {
  try {
    const { uuid } = await coolify.databases.createRedis({
      project_uuid: 'project-uuid',
      server_uuid: 'server-uuid',
      name: 'my-redis',
      redis_password: 'redis-password',
      instant_deploy: true,
    });

    console.log(`Redis database created: ${uuid}`);
  } catch (error) {
    console.error('Failed to create database:', error);
  }
}
```

## Create MongoDB Database

```typescript
async function createMongoDB() {
  try {
    const { uuid } = await coolify.databases.createMongoDB({
      project_uuid: 'project-uuid',
      server_uuid: 'server-uuid',
      name: 'my-mongo',
      mongo_root_password: 'root-password',
      mongo_database: 'mydb',
      mongo_user: 'appuser',
      mongo_password: 'user-password',
      instant_deploy: true,
    });

    console.log(`MongoDB database created: ${uuid}`);
  } catch (error) {
    console.error('Failed to create database:', error);
  }
}
```

## List All Databases

```typescript
async function listDatabases() {
  try {
    const databases = await coolify.databases.list();
    
    console.log(`Found ${databases.length} databases:`);
    databases.forEach(db => {
      console.log(`- ${db.name} (${db.type}) - ${db.status}`);
    });
  } catch (error) {
    console.error('Failed to list databases:', error);
  }
}
```

## Get Database Connection Info

```typescript
async function getDatabaseInfo(dbUuid: string) {
  try {
    const db = await coolify.databases.get(dbUuid);
    
    console.log(`Database: ${db.name}`);
    console.log(`Type: ${db.type}`);
    console.log(`Status: ${db.status}`);
    console.log(`Port: ${db.port}`);
    
    // Connection details are typically in environment variables
    // or available in the database object depending on Coolify version
  } catch (error) {
    console.error('Failed to get database info:', error);
  }
}
```

## Create Database Backup

```typescript
async function backupDatabase(dbUuid: string) {
  try {
    await coolify.databases.createBackup(dbUuid);
    console.log('Backup created successfully');
    
    // List backups
    const backups = await coolify.databases.listBackups(dbUuid);
    console.log(`Total backups: ${backups.length}`);
  } catch (error) {
    console.error('Failed to create backup:', error);
  }
}
```

## Manage Database Lifecycle

```typescript
async function manageDatabaseLifecycle(dbUuid: string) {
  try {
    // Start database
    await coolify.databases.start(dbUuid);
    console.log('Database started');

    // Wait a bit
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Restart database
    await coolify.databases.restart(dbUuid);
    console.log('Database restarted');

    // Stop database
    await coolify.databases.stop(dbUuid);
    console.log('Database stopped');
  } catch (error) {
    console.error('Failed to manage database:', error);
  }
}
```

## Delete Database

```typescript
async function deleteDatabase(dbUuid: string) {
  try {
    // Delete with configurations and volumes
    await coolify.databases.delete(dbUuid, true, true);
    console.log('Database deleted');
  } catch (error) {
    console.error('Failed to delete database:', error);
  }
}
```

## Complete Database Setup Workflow

```typescript
async function setupDatabaseForApp() {
  try {
    // 1. Create PostgreSQL database
    const { uuid: dbUuid } = await coolify.databases.createPostgreSQL({
      project_uuid: 'project-uuid',
      server_uuid: 'server-uuid',
      name: 'app-database',
      postgres_user: 'appuser',
      postgres_password: 'secure-password',
      postgres_db: 'appdb',
      instant_deploy: true,
    });

    console.log(`Database created: ${dbUuid}`);

    // 2. Wait for database to be ready
    let db;
    let attempts = 0;
    while (attempts < 30) {
      db = await coolify.databases.get(dbUuid);
      if (db.status === 'running') {
        break;
      }
      await new Promise(resolve => setTimeout(resolve, 2000));
      attempts++;
    }

    if (db?.status !== 'running') {
      throw new Error('Database failed to start');
    }

    // 3. Create application with database connection
    const { uuid: appUuid } = await coolify.applications.createFromPublicRepo({
      project_uuid: 'project-uuid',
      server_uuid: 'server-uuid',
      git_repository: 'https://github.com/user/app',
      git_branch: 'main',
      name: 'My App',
      instant_deploy: false,
    });

    // 4. Add database connection string as environment variable
    await coolify.applications.createEnv(appUuid, {
      key: 'DATABASE_URL',
      value: `postgresql://appuser:secure-password@localhost:5432/appdb`,
    });

    // 5. Deploy application
    await coolify.applications.start(appUuid);
    console.log('Application deployed with database');
  } catch (error) {
    console.error('Failed to setup database:', error);
  }
}
```

## Related

- [API Reference: Databases](/api/databases)
- [Deploying Apps](/examples/deploying-apps)
- [CI/CD Integration](/examples/ci-cd)
