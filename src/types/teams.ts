import type { UUID, Timestamps } from './common';

/**
 * Team member
 */
export interface TeamMember extends Timestamps {
  id: number;
  uuid: UUID;
  name: string;
  email: string;
}

/**
 * Team entity
 */
export interface Team extends Timestamps {
  id: number;
  uuid: UUID;
  name: string;
  description?: string;
  personal_team?: boolean;
  members?: TeamMember[];
}

/**
 * Team members response
 */
export interface TeamMembersResponse {
  members: TeamMember[];
}
