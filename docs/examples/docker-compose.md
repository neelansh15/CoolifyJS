# Docker Compose

Examples for deploying Docker Compose applications with CoolifyJS.

## Deploy Docker Compose Application

```typescript
import { CoolifyClient } from '@neelansh/coolifyjs';

const coolify = new CoolifyClient({
  baseUrl: process.env.COOLIFY_BASE_URL!,
  token: process.env.COOLIFY_API_TOKEN!,
});

async function deployDockerCompose() {
  try {
    const { uuid } = await coolify.applications.createFromDockerCompose({
      project_uuid: 'project-uuid',
      server_uuid: 'server-uuid',
      git_repository: 'https://github.com/user/repo',
      git_branch: 'main',
      name: 'Docker Compose App',
      docker_compose_file: './docker-compose.yml',
      instant_deploy: true,
    });

    console.log(`Docker Compose application created: ${uuid}`);
  } catch (error) {
    console.error('Failed to deploy:', error);
  }
}
```

## Deploy Multi-Service Application

```typescript
async function deployMultiService() {
  try {
    // Create Docker Compose app
    const { uuid } = await coolify.applications.createFromDockerCompose({
      project_uuid: 'project-uuid',
      server_uuid: 'server-uuid',
      git_repository: 'https://github.com/user/multi-service-app',
      git_branch: 'main',
      name: 'Multi-Service App',
      docker_compose_file: './docker-compose.yml',
      instant_deploy: false,
    });

    // Add environment variables for all services
    await coolify.applications.createEnv(uuid, {
      key: 'POSTGRES_PASSWORD',
      value: 'secure-password',
    });

    await coolify.applications.createEnv(uuid, {
      key: 'REDIS_PASSWORD',
      value: 'redis-password',
    });

    // Deploy
    await coolify.applications.start(uuid);
    console.log(`Multi-service application deployed: ${uuid}`);
  } catch (error) {
    console.error('Failed to deploy:', error);
  }
}
```

## Example docker-compose.yml

Here's an example `docker-compose.yml` file that works well with Coolify:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=appdb
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    command: redis-server --requirepass ${REDIS_PASSWORD}

volumes:
  postgres_data:
```

## Update Docker Compose Application

```typescript
async function updateDockerCompose(appUuid: string) {
  try {
    // Update application
    await coolify.applications.update(appUuid, {
      name: 'Updated Compose App',
    });

    // Update environment variables
    const envs = await coolify.applications.listEnvs(appUuid);
    
    const dbUrlEnv = envs.envs.find(e => e.key === 'DATABASE_URL');
    if (dbUrlEnv) {
      await coolify.applications.updateEnv(appUuid, dbUrlEnv.uuid!, {
        value: 'postgresql://new-url',
      });
    }

    // Restart to apply changes
    await coolify.applications.restart(appUuid);
    console.log('Docker Compose application updated');
  } catch (error) {
    console.error('Failed to update:', error);
  }
}
```

## Monitor Docker Compose Deployment

```typescript
async function monitorComposeDeployment(appUuid: string) {
  try {
    // Get application logs
    const logs = await coolify.applications.logs(appUuid);
    console.log('Application logs:', logs.logs);

    // Check deployment status
    const deployments = await coolify.deployments.listByApplication(appUuid);
    const latestDeployment = deployments[0];
    
    if (latestDeployment) {
      console.log(`Deployment status: ${latestDeployment.status}`);
      console.log(`Deployment UUID: ${latestDeployment.uuid}`);
    }
  } catch (error) {
    console.error('Failed to monitor deployment:', error);
  }
}
```

## Related

- [API Reference: Applications](/api/applications)
- [Deploying Apps](/examples/deploying-apps)
- [Managing Databases](/examples/managing-databases)
