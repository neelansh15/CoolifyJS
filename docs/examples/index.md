# Examples

Real-world examples and use cases for CoolifyJS.

## Examples

- **[Deploying Apps](/examples/deploying-apps)** - Deploy applications from Git repositories, Docker images, and more
- **[Managing Databases](/examples/managing-databases)** - Set up and manage databases
- **[Docker Compose](/examples/docker-compose)** - Deploy Docker Compose applications
- **[CI/CD Integration](/examples/ci-cd)** - Integrate CoolifyJS into your CI/CD pipeline

## Quick Examples

### Deploy an Application

```typescript
import { CoolifyClient } from '@neelansh/coolifyjs';

const coolify = new CoolifyClient({
  baseUrl: process.env.COOLIFY_BASE_URL!,
  token: process.env.COOLIFY_API_TOKEN!,
});

// Create and deploy an application
const { uuid } = await coolify.applications.createFromPublicRepo({
  project_uuid: 'project-uuid',
  server_uuid: 'server-uuid',
  git_repository: 'https://github.com/user/repo',
  git_branch: 'main',
  name: 'My App',
  instant_deploy: true,
});

console.log(`Application created: ${uuid}`);
```

### Set Up a Database

```typescript
// Create a PostgreSQL database
const { uuid: dbUuid } = await coolify.databases.createPostgreSQL({
  project_uuid: 'project-uuid',
  server_uuid: 'server-uuid',
  name: 'my-postgres',
  postgres_user: 'admin',
  postgres_password: 'secret',
  postgres_db: 'mydb',
  instant_deploy: true,
});

console.log(`Database created: ${dbUuid}`);
```

### Manage Environment Variables

```typescript
// Add environment variables
await coolify.applications.createEnv('app-uuid', {
  key: 'DATABASE_URL',
  value: 'postgresql://admin:secret@localhost:5432/mydb',
});

await coolify.applications.createEnv('app-uuid', {
  key: 'NODE_ENV',
  value: 'production',
});
```

## Need More Examples?

Browse the example pages for complete, working examples with error handling and best practices.
