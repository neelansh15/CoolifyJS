import type { UUID, Timestamps } from './common';

/**
 * Project environment
 */
export interface ProjectEnvironment extends Timestamps {
  id: number;
  uuid: UUID;
  name: string;
  project_id: number;
  description?: string;
}

/**
 * Project entity
 */
export interface Project extends Timestamps {
  id: number;
  uuid: UUID;
  name: string;
  description?: string;
  environments?: ProjectEnvironment[];
}

/**
 * Create project input
 */
export interface CreateProject {
  name: string;
  description?: string;
}

/**
 * Update project input
 */
export interface UpdateProject {
  name?: string;
  description?: string;
}

/**
 * Create environment input
 */
export interface CreateEnvironment {
  name: string;
  description?: string;
}

/**
 * Update environment input
 */
export interface UpdateEnvironment {
  name?: string;
  description?: string;
}

/**
 * Environment with resources
 */
export interface EnvironmentWithResources extends ProjectEnvironment {
  applications?: unknown[];
  databases?: unknown[];
  services?: unknown[];
}
