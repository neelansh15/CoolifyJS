import type { HttpClient } from '../http';
import type { MessageResponse } from '../types/common';

/**
 * MCP resource for enabling/disabling the Coolify MCP server endpoint at `/mcp`.
 *
 * Both actions require root permissions on the Coolify instance.
 */
export class McpResource {
  constructor(private readonly http: HttpClient) {}

  /** Enable the MCP server endpoint. */
  async enable(): Promise<MessageResponse> {
    return this.http.post<MessageResponse>('/mcp/enable');
  }

  /** Disable the MCP server endpoint. */
  async disable(): Promise<MessageResponse> {
    return this.http.post<MessageResponse>('/mcp/disable');
  }
}
