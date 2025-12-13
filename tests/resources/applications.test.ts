import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ApplicationsResource } from '../../src/resources/applications';
import { HttpClient } from '../../src/http';
import type { Application } from '../../src/types/applications';

describe('ApplicationsResource', () => {
  let httpClient: HttpClient;
  let applications: ApplicationsResource;

  beforeEach(() => {
    httpClient = new HttpClient({
      baseUrl: 'https://coolify.example.com/api/v1',
      token: 'test-token',
    });
    applications = new ApplicationsResource(httpClient);
  });

  describe('list', () => {
    it('should list all applications', async () => {
      const mockApps: Partial<Application>[] = [
        { uuid: 'app-1', name: 'App 1' },
        { uuid: 'app-2', name: 'App 2' },
      ];

      vi.spyOn(httpClient, 'get').mockResolvedValueOnce(mockApps);

      const result = await applications.list();

      expect(httpClient.get).toHaveBeenCalledWith('/applications');
      expect(result).toEqual(mockApps);
    });
  });

  describe('get', () => {
    it('should get a specific application', async () => {
      const mockApp: Partial<Application> = { uuid: 'app-1', name: 'App 1' };

      vi.spyOn(httpClient, 'get').mockResolvedValueOnce(mockApp);

      const result = await applications.get('app-1');

      expect(httpClient.get).toHaveBeenCalledWith('/applications/app-1');
      expect(result).toEqual(mockApp);
    });
  });

  describe('createFromPublicRepo', () => {
    it('should create an application from public repo', async () => {
      const mockResponse = { uuid: 'new-app-uuid' };
      const createData = {
        project_uuid: 'proj-1',
        server_uuid: 'srv-1',
        git_repository: 'https://github.com/user/repo',
        git_branch: 'main',
      };

      vi.spyOn(httpClient, 'post').mockResolvedValueOnce(mockResponse);

      const result = await applications.createFromPublicRepo(createData);

      expect(httpClient.post).toHaveBeenCalledWith('/applications/public', createData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('update', () => {
    it('should update an application', async () => {
      const mockApp: Partial<Application> = { uuid: 'app-1', name: 'Updated App' };
      const updateData = { name: 'Updated App' };

      vi.spyOn(httpClient, 'patch').mockResolvedValueOnce(mockApp);

      const result = await applications.update('app-1', updateData);

      expect(httpClient.patch).toHaveBeenCalledWith('/applications/app-1', updateData);
      expect(result).toEqual(mockApp);
    });
  });

  describe('delete', () => {
    it('should delete an application', async () => {
      const mockResponse = { message: 'Application deleted' };

      vi.spyOn(httpClient, 'delete').mockResolvedValueOnce(mockResponse);

      const result = await applications.delete('app-1');

      expect(httpClient.delete).toHaveBeenCalledWith('/applications/app-1');
      expect(result).toEqual(mockResponse);
    });

    it('should delete with configurations and volumes', async () => {
      const mockResponse = { message: 'Application deleted' };

      vi.spyOn(httpClient, 'delete').mockResolvedValueOnce(mockResponse);

      await applications.delete('app-1', true, true);

      expect(httpClient.delete).toHaveBeenCalledWith(
        '/applications/app-1?delete_configurations=true&delete_volumes=true'
      );
    });
  });

  describe('environment variables', () => {
    it('should list environment variables', async () => {
      const mockEnvs = { envs: [{ key: 'NODE_ENV', value: 'production' }] };

      vi.spyOn(httpClient, 'get').mockResolvedValueOnce(mockEnvs);

      const result = await applications.listEnvs('app-1');

      expect(httpClient.get).toHaveBeenCalledWith('/applications/app-1/envs');
      expect(result).toEqual(mockEnvs);
    });

    it('should create an environment variable', async () => {
      const mockResponse = { uuid: 'env-uuid' };
      const envData = { key: 'API_KEY', value: 'secret' };

      vi.spyOn(httpClient, 'post').mockResolvedValueOnce(mockResponse);

      const result = await applications.createEnv('app-1', envData);

      expect(httpClient.post).toHaveBeenCalledWith('/applications/app-1/envs', envData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('lifecycle', () => {
    it('should start an application', async () => {
      const mockResponse = { message: 'Deployment started', deployment_uuid: 'deploy-1' };

      vi.spyOn(httpClient, 'post').mockResolvedValueOnce(mockResponse);

      const result = await applications.start('app-1');

      expect(httpClient.post).toHaveBeenCalledWith('/applications/app-1/start');
      expect(result).toEqual(mockResponse);
    });

    it('should stop an application', async () => {
      const mockResponse = { message: 'Application stopped' };

      vi.spyOn(httpClient, 'post').mockResolvedValueOnce(mockResponse);

      const result = await applications.stop('app-1');

      expect(httpClient.post).toHaveBeenCalledWith('/applications/app-1/stop');
      expect(result).toEqual(mockResponse);
    });

    it('should restart an application', async () => {
      const mockResponse = { message: 'Deployment started', deployment_uuid: 'deploy-2' };

      vi.spyOn(httpClient, 'post').mockResolvedValueOnce(mockResponse);

      const result = await applications.restart('app-1');

      expect(httpClient.post).toHaveBeenCalledWith('/applications/app-1/restart');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('logs', () => {
    it('should get application logs', async () => {
      const mockLogs = { logs: ['Log line 1', 'Log line 2'] };

      vi.spyOn(httpClient, 'get').mockResolvedValueOnce(mockLogs);

      const result = await applications.logs('app-1');

      expect(httpClient.get).toHaveBeenCalledWith('/applications/app-1/logs');
      expect(result).toEqual(mockLogs);
    });
  });
});
