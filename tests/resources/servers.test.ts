import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ServersResource } from '../../src/resources/servers';
import { HttpClient } from '../../src/http';
import type { Server } from '../../src/types/servers';

describe('ServersResource', () => {
  let httpClient: HttpClient;
  let servers: ServersResource;

  beforeEach(() => {
    httpClient = new HttpClient({
      baseUrl: 'https://coolify.example.com/api/v1',
      token: 'test-token',
    });
    servers = new ServersResource(httpClient);
  });

  describe('list', () => {
    it('should list all servers', async () => {
      const mockServers: Partial<Server>[] = [
        { uuid: 'srv-1', name: 'Server 1', ip: '192.168.1.1' },
        { uuid: 'srv-2', name: 'Server 2', ip: '192.168.1.2' },
      ];

      vi.spyOn(httpClient, 'get').mockResolvedValueOnce(mockServers);

      const result = await servers.list();

      expect(httpClient.get).toHaveBeenCalledWith('/servers');
      expect(result).toEqual(mockServers);
    });
  });

  describe('get', () => {
    it('should get a specific server', async () => {
      const mockServer: Partial<Server> = { uuid: 'srv-1', name: 'Server 1', ip: '192.168.1.1' };

      vi.spyOn(httpClient, 'get').mockResolvedValueOnce(mockServer);

      const result = await servers.get('srv-1');

      expect(httpClient.get).toHaveBeenCalledWith('/servers/srv-1');
      expect(result).toEqual(mockServer);
    });
  });

  describe('create', () => {
    it('should create a server', async () => {
      const mockResponse = { uuid: 'new-srv-uuid' };
      const createData = {
        name: 'New Server',
        ip: '192.168.1.10',
        private_key_uuid: 'pk-1',
      };

      vi.spyOn(httpClient, 'post').mockResolvedValueOnce(mockResponse);

      const result = await servers.create(createData);

      expect(httpClient.post).toHaveBeenCalledWith('/servers', createData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('update', () => {
    it('should update a server', async () => {
      const mockServer: Partial<Server> = { uuid: 'srv-1', name: 'Updated Server', ip: '192.168.1.1' };
      const updateData = { name: 'Updated Server' };

      vi.spyOn(httpClient, 'patch').mockResolvedValueOnce(mockServer);

      const result = await servers.update('srv-1', updateData);

      expect(httpClient.patch).toHaveBeenCalledWith('/servers/srv-1', updateData);
      expect(result).toEqual(mockServer);
    });
  });

  describe('delete', () => {
    it('should delete a server', async () => {
      const mockResponse = { message: 'Server deleted' };

      vi.spyOn(httpClient, 'delete').mockResolvedValueOnce(mockResponse);

      const result = await servers.delete('srv-1');

      expect(httpClient.delete).toHaveBeenCalledWith('/servers/srv-1');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getResources', () => {
    it('should get server resources', async () => {
      const mockResources = {
        applications: [],
        databases: [],
        services: [],
      };

      vi.spyOn(httpClient, 'get').mockResolvedValueOnce(mockResources);

      const result = await servers.getResources('srv-1');

      expect(httpClient.get).toHaveBeenCalledWith('/servers/srv-1/resources');
      expect(result).toEqual(mockResources);
    });
  });

  describe('getDomains', () => {
    it('should get server domains', async () => {
      const mockDomains = { domains: ['example.com', 'api.example.com'] };

      vi.spyOn(httpClient, 'get').mockResolvedValueOnce(mockDomains);

      const result = await servers.getDomains('srv-1');

      expect(httpClient.get).toHaveBeenCalledWith('/servers/srv-1/domains');
      expect(result).toEqual(mockDomains);
    });
  });

  describe('validate', () => {
    it('should validate a server', async () => {
      const mockResponse = { message: 'Server is reachable', status: 'reachable' };

      vi.spyOn(httpClient, 'post').mockResolvedValueOnce(mockResponse);

      const result = await servers.validate('srv-1');

      expect(httpClient.post).toHaveBeenCalledWith('/servers/srv-1/validate');
      expect(result).toEqual(mockResponse);
    });
  });
});
