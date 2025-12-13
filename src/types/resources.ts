import type { Application } from './applications';
import type { AnyDatabase } from './databases';
import type { Service } from './services';

/**
 * Generic resource type
 */
export type ResourceType = 'application' | 'database' | 'service';

/**
 * Resource summary
 */
export interface ResourceSummary {
  uuid: string;
  name: string;
  type: ResourceType;
  status: string;
  project_uuid?: string;
  environment_name?: string;
}

/**
 * List all resources response
 */
export interface ListResourcesResponse {
  applications?: Application[];
  databases?: AnyDatabase[];
  services?: Service[];
}
