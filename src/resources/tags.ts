import type { HttpClient } from '../http';
import type { UUID, MessageResponse } from '../types/common';
import type { Tag, CreateTagInput, UpdateTagInput } from '../types/tags';

/**
 * Tags resource for managing team-scoped tags at the top-level `/tags` path.
 *
 * Individual resources (applications, services, etc.) have their own tag
 * attach/detach endpoints — this resource covers the tag catalogue itself.
 */
export class TagsResource {
  constructor(private readonly http: HttpClient) {}

  /** List all tags for the current team. */
  async list(): Promise<Tag[]> {
    return this.http.get<Tag[]>('/tags');
  }

  /** Create a tag for the current team. Fails with 409 if the name already exists. */
  async create(data: CreateTagInput): Promise<Tag> {
    return this.http.post<Tag>('/tags', data);
  }

  /** Update a tag's name. */
  async update(uuid: UUID, data: UpdateTagInput): Promise<Tag> {
    return this.http.patch<Tag>(`/tags/${uuid}`, data);
  }

  /** Delete a tag. Detaches from all resources via cascade. */
  async delete(uuid: UUID): Promise<MessageResponse> {
    return this.http.delete<MessageResponse>(`/tags/${uuid}`);
  }
}
