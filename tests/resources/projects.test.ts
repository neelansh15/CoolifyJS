import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProjectsResource } from '../../src/resources/projects';
import { HttpClient } from '../../src/http';
import type { Project, ProjectEnvironment } from '../../src/types/projects';

describe('ProjectsResource', () => {
  let httpClient: HttpClient;
  let projects: ProjectsResource;

  beforeEach(() => {
    httpClient = new HttpClient({
      baseUrl: 'https://coolify.example.com/api/v1',
      token: 'test-token',
    });
    projects = new ProjectsResource(httpClient);
  });

  describe('list', () => {
    it('should list all projects', async () => {
      const mockProjects: Partial<Project>[] = [
        { uuid: 'proj-1', name: 'Project 1' },
        { uuid: 'proj-2', name: 'Project 2' },
      ];

      vi.spyOn(httpClient, 'get').mockResolvedValueOnce(mockProjects);

      const result = await projects.list();

      expect(httpClient.get).toHaveBeenCalledWith('/projects');
      expect(result).toEqual(mockProjects);
    });
  });

  describe('get', () => {
    it('should get a specific project', async () => {
      const mockProject: Partial<Project> = { uuid: 'proj-1', name: 'Project 1' };

      vi.spyOn(httpClient, 'get').mockResolvedValueOnce(mockProject);

      const result = await projects.get('proj-1');

      expect(httpClient.get).toHaveBeenCalledWith('/projects/proj-1');
      expect(result).toEqual(mockProject);
    });
  });

  describe('create', () => {
    it('should create a project', async () => {
      const mockResponse = { uuid: 'new-proj-uuid' };
      const createData = { name: 'New Project' };

      vi.spyOn(httpClient, 'post').mockResolvedValueOnce(mockResponse);

      const result = await projects.create(createData);

      expect(httpClient.post).toHaveBeenCalledWith('/projects', createData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('update', () => {
    it('should update a project', async () => {
      const mockProject: Partial<Project> = { uuid: 'proj-1', name: 'Updated Project' };
      const updateData = { name: 'Updated Project' };

      vi.spyOn(httpClient, 'patch').mockResolvedValueOnce(mockProject);

      const result = await projects.update('proj-1', updateData);

      expect(httpClient.patch).toHaveBeenCalledWith('/projects/proj-1', updateData);
      expect(result).toEqual(mockProject);
    });
  });

  describe('delete', () => {
    it('should delete a project', async () => {
      const mockResponse = { message: 'Project deleted' };

      vi.spyOn(httpClient, 'delete').mockResolvedValueOnce(mockResponse);

      const result = await projects.delete('proj-1');

      expect(httpClient.delete).toHaveBeenCalledWith('/projects/proj-1');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('environments', () => {
    it('should list environments', async () => {
      const mockEnvs: Partial<ProjectEnvironment>[] = [
        { uuid: 'env-1', name: 'production' },
        { uuid: 'env-2', name: 'staging' },
      ];

      vi.spyOn(httpClient, 'get').mockResolvedValueOnce(mockEnvs);

      const result = await projects.listEnvironments('proj-1');

      expect(httpClient.get).toHaveBeenCalledWith('/projects/proj-1/environments');
      expect(result).toEqual(mockEnvs);
    });

    it('should get a specific environment', async () => {
      const mockEnv = { uuid: 'env-1', name: 'production', applications: [] };

      vi.spyOn(httpClient, 'get').mockResolvedValueOnce(mockEnv);

      const result = await projects.getEnvironment('proj-1', 'production');

      expect(httpClient.get).toHaveBeenCalledWith('/projects/proj-1/production');
      expect(result).toEqual(mockEnv);
    });

    it('should create an environment', async () => {
      const mockResponse = { uuid: 'new-env-uuid' };
      const createData = { name: 'staging' };

      vi.spyOn(httpClient, 'post').mockResolvedValueOnce(mockResponse);

      const result = await projects.createEnvironment('proj-1', createData);

      expect(httpClient.post).toHaveBeenCalledWith('/projects/proj-1/environments', createData);
      expect(result).toEqual(mockResponse);
    });

    it('should delete an environment', async () => {
      const mockResponse = { message: 'Environment deleted' };

      vi.spyOn(httpClient, 'delete').mockResolvedValueOnce(mockResponse);

      const result = await projects.deleteEnvironment('proj-1', 'staging');

      expect(httpClient.delete).toHaveBeenCalledWith('/projects/proj-1/staging');
      expect(result).toEqual(mockResponse);
    });
  });
});
