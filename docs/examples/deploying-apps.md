# Deploying Apps

Examples for deploying applications using CoolifyJS.

## Deploy from Public Repository

```typescript
import { CoolifyClient } from '@neelansh/coolifyjs';

const coolify = new CoolifyClient({
  baseUrl: process.env.COOLIFY_BASE_URL!,
  token: process.env.COOLIFY_API_TOKEN!,
});

async function deployFromPublicRepo() {
  try {
    const { uuid } = await coolify.applications.createFromPublicRepo({
      project_uuid: 'project-uuid',
      server_uuid: 'server-uuid',
      git_repository: 'https://github.com/user/repo',
      git_branch: 'main',
      name: 'My App',
      instant_deploy: true,
    });

    console.log(`Application created: ${uuid}`);
    
    // Wait for deployment to complete
    const deployments = await coolify.deployments.listByApplication(uuid);
    console.log(`Deployment status: ${deployments[0]?.status}`);
  } catch (error) {
    console.error('Failed to deploy:', error);
  }
}
```

## Deploy from Private Repository (GitHub App)

```typescript
async function deployFromPrivateRepo() {
  try {
    // First, get your GitHub App UUID
    const githubApps = await coolify.githubApps.list();
    const githubApp = githubApps[0];

    // Load repositories
    const repos = await coolify.githubApps.loadRepositories(githubApp.uuid);
    const repo = repos.repositories.find(r => r.full_name === 'owner/private-repo');

    if (!repo) {
      throw new Error('Repository not found');
    }

    // Load branches
    const branches = await coolify.githubApps.loadBranches(
      githubApp.uuid,
      repo.full_name
    );
    const mainBranch = branches.branches.find(b => b.name === 'main');

    // Create application
    const { uuid } = await coolify.applications.createFromPrivateRepoGitHubApp({
      project_uuid: 'project-uuid',
      server_uuid: 'server-uuid',
      github_app_uuid: githubApp.uuid,
      git_repository: repo.full_name,
      git_branch: mainBranch!.name,
      name: 'Private App',
      instant_deploy: true,
    });

    console.log(`Application created: ${uuid}`);
  } catch (error) {
    console.error('Failed to deploy:', error);
  }
}
```

## Deploy from Docker Image

```typescript
async function deployFromDockerImage() {
  try {
    const { uuid } = await coolify.applications.createFromDockerImage({
      project_uuid: 'project-uuid',
      server_uuid: 'server-uuid',
      docker_registry_image_name: 'nginx',
      docker_registry_image_tag: 'latest',
      name: 'Nginx App',
      port: 80,
      instant_deploy: true,
    });

    console.log(`Application created: ${uuid}`);
  } catch (error) {
    console.error('Failed to deploy:', error);
  }
}
```

## Deploy with Environment Variables

```typescript
async function deployWithEnvVars() {
  try {
    // Create application
    const { uuid } = await coolify.applications.createFromPublicRepo({
      project_uuid: 'project-uuid',
      server_uuid: 'server-uuid',
      git_repository: 'https://github.com/user/repo',
      git_branch: 'main',
      name: 'My App',
      instant_deploy: false, // Don't deploy yet
    });

    // Add environment variables
    await coolify.applications.createEnv(uuid, {
      key: 'NODE_ENV',
      value: 'production',
    });

    await coolify.applications.createEnv(uuid, {
      key: 'DATABASE_URL',
      value: 'postgresql://user:pass@localhost:5432/db',
    });

    await coolify.applications.createEnv(uuid, {
      key: 'API_KEY',
      value: 'secret-key',
      is_shown_once: true, // Hide value after first display
    });

    // Now deploy
    await coolify.applications.start(uuid);
    console.log(`Application deployed: ${uuid}`);
  } catch (error) {
    console.error('Failed to deploy:', error);
  }
}
```

## Update and Redeploy

```typescript
async function updateAndRedeploy() {
  try {
    const appUuid = 'app-uuid';

    // Update application configuration
    await coolify.applications.update(appUuid, {
      name: 'Updated Name',
      domains: 'app.example.com',
    });

    // Update environment variable
    const envs = await coolify.applications.listEnvs(appUuid);
    const dbUrlEnv = envs.envs.find(e => e.key === 'DATABASE_URL');
    
    if (dbUrlEnv) {
      await coolify.applications.updateEnv(appUuid, dbUrlEnv.uuid!, {
        value: 'postgresql://new-url',
      });
    }

    // Restart to apply changes
    await coolify.applications.restart(appUuid);
    console.log('Application updated and restarted');
  } catch (error) {
    console.error('Failed to update:', error);
  }
}
```

## Monitor Deployment Status

```typescript
async function monitorDeployment(appUuid: string) {
  try {
    // Start deployment
    await coolify.applications.start(appUuid);

    // Poll for deployment status
    let deployment;
    let attempts = 0;
    const maxAttempts = 30;

    while (attempts < maxAttempts) {
      const deployments = await coolify.deployments.listByApplication(appUuid);
      deployment = deployments[0];

      if (deployment && ['success', 'failed'].includes(deployment.status)) {
        break;
      }

      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
      attempts++;
    }

    if (deployment?.status === 'success') {
      console.log('Deployment successful!');
    } else {
      console.log('Deployment failed or timed out');
    }
  } catch (error) {
    console.error('Failed to monitor deployment:', error);
  }
}
```

## Related

- [API Reference: Applications](/api/applications)
- [Managing Databases](/examples/managing-databases)
- [CI/CD Integration](/examples/ci-cd)
