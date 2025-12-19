# CI/CD Integration

Examples for integrating CoolifyJS into your CI/CD pipeline.

## GitHub Actions

### Deploy on Push to Main

```yaml
name: Deploy to Coolify

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Coolify
        run: |
          npm install @neelansh/coolifyjs
          node deploy.js
        env:
          COOLIFY_BASE_URL: ${{ secrets.COOLIFY_BASE_URL }}
          COOLIFY_API_TOKEN: ${{ secrets.COOLIFY_API_TOKEN }}
          APP_UUID: ${{ secrets.COOLIFY_APP_UUID }}
```

### deploy.js

```typescript
import { CoolifyClient } from '@neelansh/coolifyjs';

const coolify = new CoolifyClient({
  baseUrl: process.env.COOLIFY_BASE_URL!,
  token: process.env.COOLIFY_API_TOKEN!,
});

async function deploy() {
  try {
    const appUuid = process.env.APP_UUID!;
    
    // Deploy application
    const result = await coolify.deployments.deploy(appUuid, {
      force: true,
    });
    
    console.log('Deployment started:', result.message);
    
    // Wait for deployment to complete
    let deployment;
    let attempts = 0;
    const maxAttempts = 60; // 2 minutes
    
    while (attempts < maxAttempts) {
      const deployments = await coolify.deployments.listByApplication(appUuid);
      deployment = deployments[0];
      
      if (deployment && ['success', 'failed'].includes(deployment.status)) {
        break;
      }
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      attempts++;
    }
    
    if (deployment?.status === 'success') {
      console.log('✅ Deployment successful!');
      process.exit(0);
    } else {
      console.error('❌ Deployment failed');
      process.exit(1);
    }
  } catch (error) {
    console.error('Deployment error:', error);
    process.exit(1);
  }
}

deploy();
```

## GitLab CI

```yaml
deploy:
  stage: deploy
  script:
    - npm install @neelansh/coolifyjs
    - node deploy.js
  only:
    - main
  variables:
    COOLIFY_BASE_URL: $COOLIFY_BASE_URL
    COOLIFY_API_TOKEN: $COOLIFY_API_TOKEN
    APP_UUID: $COOLIFY_APP_UUID
```

## CircleCI

```yaml
version: 2.1

jobs:
  deploy:
    docker:
      - image: cimg/node:20.0
    steps:
      - checkout
      - run:
          name: Install dependencies
          command: npm install @neelansh/coolifyjs
      - run:
          name: Deploy to Coolify
          command: node deploy.js
          environment:
            COOLIFY_BASE_URL: ${COOLIFY_BASE_URL}
            COOLIFY_API_TOKEN: ${COOLIFY_API_TOKEN}
            APP_UUID: ${COOLIFY_APP_UUID}

workflows:
  deploy:
    jobs:
      - deploy:
          filters:
            branches:
              only: main
```

## Deploy with Environment Variables

```typescript
import { CoolifyClient } from '@neelansh/coolifyjs';

const coolify = new CoolifyClient({
  baseUrl: process.env.COOLIFY_BASE_URL!,
  token: process.env.COOLIFY_API_TOKEN!,
});

async function deployWithEnvVars() {
  try {
    const appUuid = process.env.APP_UUID!;
    
    // Update environment variables from CI/CD
    const envs = await coolify.applications.listEnvs(appUuid);
    
    // Update or create BUILD_NUMBER
    const buildNumberEnv = envs.envs.find(e => e.key === 'BUILD_NUMBER');
    const buildNumber = process.env.CI_BUILD_NUMBER || Date.now().toString();
    
    if (buildNumberEnv) {
      await coolify.applications.updateEnv(appUuid, buildNumberEnv.uuid!, {
        value: buildNumber,
      });
    } else {
      await coolify.applications.createEnv(appUuid, {
        key: 'BUILD_NUMBER',
        value: buildNumber,
      });
    }
    
    // Deploy
    await coolify.deployments.deploy(appUuid, { force: true });
    console.log('Deployed with build number:', buildNumber);
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

deployWithEnvVars();
```

## Deploy to Multiple Environments

```typescript
import { CoolifyClient } from '@neelansh/coolifyjs';

const coolify = new CoolifyClient({
  baseUrl: process.env.COOLIFY_BASE_URL!,
  token: process.env.COOLIFY_API_TOKEN!,
});

async function deployToEnvironments() {
  try {
    const branch = process.env.GIT_BRANCH || 'main';
    const isProduction = branch === 'main';
    
    // Get project
    const projects = await coolify.projects.list();
    const project = projects.find(p => p.name === 'My Project');
    
    if (!project) {
      throw new Error('Project not found');
    }
    
    // Get environment
    const envs = await coolify.projects.listEnvironments(project.uuid);
    const envName = isProduction ? 'production' : 'staging';
    const env = envs.find(e => e.name === envName);
    
    if (!env) {
      throw new Error(`Environment ${envName} not found`);
    }
    
    // Find application in environment
    const envWithResources = await coolify.projects.getEnvironment(
      project.uuid,
      envName
    );
    const app = envWithResources.applications[0];
    
    if (!app) {
      throw new Error('Application not found in environment');
    }
    
    // Deploy
    await coolify.deployments.deploy(app.uuid, { force: true });
    console.log(`Deployed to ${envName}`);
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

deployToEnvironments();
```

## Rollback Deployment

```typescript
async function rollbackDeployment(appUuid: string) {
  try {
    // Get all deployments
    const deployments = await coolify.deployments.listByApplication(appUuid);
    
    // Find the previous successful deployment
    const previousDeployment = deployments.find(
      d => d.status === 'success' && d.uuid !== deployments[0].uuid
    );
    
    if (!previousDeployment) {
      throw new Error('No previous deployment found');
    }
    
    // Note: Coolify API may not have a direct rollback endpoint
    // You might need to redeploy with a specific commit or tag
    console.log('Previous deployment:', previousDeployment.uuid);
  } catch (error) {
    console.error('Rollback failed:', error);
  }
}
```

## Health Check After Deployment

```typescript
async function healthCheckAfterDeploy(appUuid: string) {
  try {
    // Deploy
    await coolify.deployments.deploy(appUuid, { force: true });
    
    // Wait for deployment
    let deployment;
    let attempts = 0;
    while (attempts < 60) {
      const deployments = await coolify.deployments.listByApplication(appUuid);
      deployment = deployments[0];
      
      if (deployment?.status === 'success') {
        break;
      }
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      attempts++;
    }
    
    if (deployment?.status !== 'success') {
      throw new Error('Deployment failed');
    }
    
    // Get application to check health
    const app = await coolify.applications.get(appUuid);
    
    if (app.status === 'running') {
      console.log('✅ Application is running');
      
      // Optional: Make HTTP request to health endpoint
      // const response = await fetch(`https://${app.domains}/health`);
      // if (response.ok) {
      //   console.log('✅ Health check passed');
      // }
    } else {
      throw new Error(`Application status: ${app.status}`);
    }
  } catch (error) {
    console.error('Health check failed:', error);
    process.exit(1);
  }
}
```

## Related

- [API Reference: Deployments](/api/deployments)
- [API Reference: Applications](/api/applications)
- [Deploying Apps](/examples/deploying-apps)
