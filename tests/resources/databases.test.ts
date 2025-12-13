import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DatabasesResource } from '../../src/resources/databases';
import { HttpClient } from '../../src/http';
import type { PostgreSQLDatabase } from '../../src/types/databases';

describe('DatabasesResource', () => {
  let httpClient: HttpClient;
  let databases: DatabasesResource;

  beforeEach(() => {
    httpClient = new HttpClient({
      baseUrl: 'https://coolify.example.com/api/v1',
      token: 'test-token',
    });
    databases = new DatabasesResource(httpClient);
  });

  describe('list', () => {
    it('should list all databases', async () => {
      const mockDbs: Partial<PostgreSQLDatabase>[] = [
        { uuid: 'db-1', name: 'DB 1', type: 'postgresql' },
        { uuid: 'db-2', name: 'DB 2', type: 'postgresql' },
      ];

      vi.spyOn(httpClient, 'get').mockResolvedValueOnce(mockDbs);

      const result = await databases.list();

      expect(httpClient.get).toHaveBeenCalledWith('/databases');
      expect(result).toEqual(mockDbs);
    });
  });

  describe('get', () => {
    it('should get a specific database', async () => {
      const mockDb: Partial<PostgreSQLDatabase> = { uuid: 'db-1', name: 'DB 1', type: 'postgresql' };

      vi.spyOn(httpClient, 'get').mockResolvedValueOnce(mockDb);

      const result = await databases.get('db-1');

      expect(httpClient.get).toHaveBeenCalledWith('/databases/db-1');
      expect(result).toEqual(mockDb);
    });
  });

  describe('create methods', () => {
    it('should create a PostgreSQL database', async () => {
      const mockResponse = { uuid: 'new-db-uuid' };
      const createData = {
        project_uuid: 'proj-1',
        server_uuid: 'srv-1',
        name: 'my-postgres',
      };

      vi.spyOn(httpClient, 'post').mockResolvedValueOnce(mockResponse);

      const result = await databases.createPostgreSQL(createData);

      expect(httpClient.post).toHaveBeenCalledWith('/databases/postgresql', createData);
      expect(result).toEqual(mockResponse);
    });

    it('should create a MySQL database', async () => {
      const mockResponse = { uuid: 'new-db-uuid' };
      const createData = {
        project_uuid: 'proj-1',
        server_uuid: 'srv-1',
        name: 'my-mysql',
      };

      vi.spyOn(httpClient, 'post').mockResolvedValueOnce(mockResponse);

      const result = await databases.createMySQL(createData);

      expect(httpClient.post).toHaveBeenCalledWith('/databases/mysql', createData);
      expect(result).toEqual(mockResponse);
    });

    it('should create a Redis database', async () => {
      const mockResponse = { uuid: 'new-db-uuid' };
      const createData = {
        project_uuid: 'proj-1',
        server_uuid: 'srv-1',
        name: 'my-redis',
      };

      vi.spyOn(httpClient, 'post').mockResolvedValueOnce(mockResponse);

      const result = await databases.createRedis(createData);

      expect(httpClient.post).toHaveBeenCalledWith('/databases/redis', createData);
      expect(result).toEqual(mockResponse);
    });

    it('should create a MongoDB database', async () => {
      const mockResponse = { uuid: 'new-db-uuid' };
      const createData = {
        project_uuid: 'proj-1',
        server_uuid: 'srv-1',
        name: 'my-mongo',
      };

      vi.spyOn(httpClient, 'post').mockResolvedValueOnce(mockResponse);

      const result = await databases.createMongoDB(createData);

      expect(httpClient.post).toHaveBeenCalledWith('/databases/mongodb', createData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('update', () => {
    it('should update a database', async () => {
      const mockDb: Partial<PostgreSQLDatabase> = { uuid: 'db-1', name: 'Updated DB', type: 'postgresql' };
      const updateData = { name: 'Updated DB' };

      vi.spyOn(httpClient, 'patch').mockResolvedValueOnce(mockDb);

      const result = await databases.update('db-1', updateData);

      expect(httpClient.patch).toHaveBeenCalledWith('/databases/db-1', updateData);
      expect(result).toEqual(mockDb);
    });
  });

  describe('delete', () => {
    it('should delete a database', async () => {
      const mockResponse = { message: 'Database deleted' };

      vi.spyOn(httpClient, 'delete').mockResolvedValueOnce(mockResponse);

      const result = await databases.delete('db-1');

      expect(httpClient.delete).toHaveBeenCalledWith('/databases/db-1');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('lifecycle', () => {
    it('should start a database', async () => {
      const mockResponse = { message: 'Database starting' };

      vi.spyOn(httpClient, 'post').mockResolvedValueOnce(mockResponse);

      const result = await databases.start('db-1');

      expect(httpClient.post).toHaveBeenCalledWith('/databases/db-1/start');
      expect(result).toEqual(mockResponse);
    });

    it('should stop a database', async () => {
      const mockResponse = { message: 'Database stopped' };

      vi.spyOn(httpClient, 'post').mockResolvedValueOnce(mockResponse);

      const result = await databases.stop('db-1');

      expect(httpClient.post).toHaveBeenCalledWith('/databases/db-1/stop');
      expect(result).toEqual(mockResponse);
    });

    it('should restart a database', async () => {
      const mockResponse = { message: 'Database restarting' };

      vi.spyOn(httpClient, 'post').mockResolvedValueOnce(mockResponse);

      const result = await databases.restart('db-1');

      expect(httpClient.post).toHaveBeenCalledWith('/databases/db-1/restart');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('backups', () => {
    it('should list backups', async () => {
      const mockBackups = [
        { uuid: 'backup-1', status: 'success' },
        { uuid: 'backup-2', status: 'pending' },
      ];

      vi.spyOn(httpClient, 'get').mockResolvedValueOnce(mockBackups);

      const result = await databases.listBackups('db-1');

      expect(httpClient.get).toHaveBeenCalledWith('/databases/db-1/backups');
      expect(result).toEqual(mockBackups);
    });

    it('should create a backup', async () => {
      const mockResponse = { message: 'Backup started' };

      vi.spyOn(httpClient, 'post').mockResolvedValueOnce(mockResponse);

      const result = await databases.createBackup('db-1');

      expect(httpClient.post).toHaveBeenCalledWith('/databases/db-1/backups');
      expect(result).toEqual(mockResponse);
    });
  });
});
