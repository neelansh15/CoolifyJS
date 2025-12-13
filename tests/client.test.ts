import { describe, it, expect } from 'vitest';
import { CoolifyClient } from '../src/client';
import { ApplicationsResource } from '../src/resources/applications';
import { DatabasesResource } from '../src/resources/databases';
import { DeploymentsResource } from '../src/resources/deployments';
import { GitHubAppsResource } from '../src/resources/github-apps';
import { ProjectsResource } from '../src/resources/projects';
import { PrivateKeysResource } from '../src/resources/private-keys';
import { ServersResource } from '../src/resources/servers';
import { ServicesResource } from '../src/resources/services';
import { TeamsResource } from '../src/resources/teams';
import { SystemResource } from '../src/resources/system';
import { ResourcesResource } from '../src/resources/resources';

describe('CoolifyClient', () => {
  const config = {
    baseUrl: 'https://coolify.example.com/api/v1',
    token: 'test-token',
  };

  it('should create a client instance', () => {
    const client = new CoolifyClient(config);
    expect(client).toBeInstanceOf(CoolifyClient);
  });

  it('should initialize all resources', () => {
    const client = new CoolifyClient(config);

    expect(client.applications).toBeInstanceOf(ApplicationsResource);
    expect(client.databases).toBeInstanceOf(DatabasesResource);
    expect(client.deployments).toBeInstanceOf(DeploymentsResource);
    expect(client.githubApps).toBeInstanceOf(GitHubAppsResource);
    expect(client.projects).toBeInstanceOf(ProjectsResource);
    expect(client.privateKeys).toBeInstanceOf(PrivateKeysResource);
    expect(client.servers).toBeInstanceOf(ServersResource);
    expect(client.services).toBeInstanceOf(ServicesResource);
    expect(client.teams).toBeInstanceOf(TeamsResource);
    expect(client.system).toBeInstanceOf(SystemResource);
    expect(client.resources).toBeInstanceOf(ResourcesResource);
  });

  it('should accept custom timeout', () => {
    const client = new CoolifyClient({
      ...config,
      timeout: 60000,
    });
    expect(client).toBeDefined();
  });
});
