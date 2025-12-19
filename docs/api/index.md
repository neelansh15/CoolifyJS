# API Reference

CoolifyJS provides access to all Coolify API endpoints through 11 resource classes. Each resource corresponds to a category of operations in the Coolify API.

## Resources

### [Applications](/api/applications)
Manage applications in your Coolify instance. Create applications from Git repositories, Docker images, Dockerfiles, or Docker Compose files.

**18 methods** including list, get, create, update, delete, start, stop, restart, and environment variable management.

### [Databases](/api/databases)
Manage databases including PostgreSQL, MySQL, MariaDB, MongoDB, Redis, Dragonfly, KeyDB, and ClickHouse.

**17 methods** including list, get, create (for each database type), update, delete, lifecycle operations, and backup management.

### [Deployments](/api/deployments)
Manage application deployments. Deploy applications and track deployment history.

**4 methods** including list, get, deploy, and list by application.

### [Services](/api/services)
Manage one-click services (pre-configured applications) like Plausible, PostHog, and more.

**13 methods** including list, get, create, update, delete, lifecycle operations, and environment variable management.

### [Projects](/api/projects)
Organize resources into projects and manage environments (production, staging, etc.).

**9 methods** including list, get, create, update, delete, and environment management.

### [Servers](/api/servers)
Manage servers where your applications run. Add, configure, and validate servers.

**9 methods** including list, get, create, update, delete, get resources, get domains, and validate.

### [GitHub Apps](/api/github-apps)
Manage GitHub App integrations for accessing private repositories.

**7 methods** including list, get, create, update, delete, load repositories, and load branches.

### [Private Keys](/api/private-keys)
Manage SSH private keys used for server access.

**5 methods** including list, get, create, update, and delete.

### [Teams](/api/teams)
Manage teams and team members.

**6 methods** including list, get, get current team, and get members.

### [System](/api/system)
System operations and health checks.

**4 methods** including version, health check, enable API, and disable API.

### [Resources](/api/resources)
List all resources across your instance.

**1 method** to list all resources (applications, databases, services).

## Usage Pattern

All resources follow a consistent pattern:

```typescript
import { CoolifyClient } from '@neelansh/coolifyjs';

const coolify = new CoolifyClient({
  baseUrl: 'https://coolify.example.com/api/v1',
  token: 'your-token',
});

// Access resources through the client
const apps = await coolify.applications.list();
const databases = await coolify.databases.list();
const projects = await coolify.projects.list();
```

## Response Types

Most methods return typed responses:

- **List methods**: Return arrays of resource objects
- **Get methods**: Return a single resource object
- **Create methods**: Return `{ uuid: string }`
- **Update methods**: Return the updated resource object
- **Delete methods**: Return `{ message: string }`
- **Lifecycle methods**: Return deployment or message responses

## Error Handling

All methods can throw errors. See the [Error Handling Guide](/guide/error-handling) for details.

## TypeScript Support

All methods and responses are fully typed. Import types as needed:

```typescript
import type {
  Application,
  Database,
  Server,
  Project,
} from '@neelansh/coolifyjs';
```

## Next Steps

- Browse individual resource pages for detailed method documentation
- Check out [Examples](/examples/) for common use cases
- Read the [Reference](/reference/) section for type definitions
