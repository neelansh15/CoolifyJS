import type { HttpClient } from '../http';
import type { Team, TeamMember, TeamMembersResponse } from '../types/teams';

/**
 * Teams resource for managing Coolify teams
 */
export class TeamsResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * List all teams
   */
  async list(): Promise<Team[]> {
    return this.http.get<Team[]>('/teams');
  }

  /**
   * Get a specific team by ID
   */
  async get(id: number): Promise<Team> {
    return this.http.get<Team>(`/teams/${id}`);
  }

  /**
   * Get the current team
   */
  async current(): Promise<Team> {
    return this.http.get<Team>('/teams/current');
  }

  /**
   * Get members of a team
   */
  async getMembers(id: number): Promise<TeamMember[]> {
    const response = await this.http.get<TeamMembersResponse>(`/teams/${id}/members`);
    return response.members;
  }

  /**
   * Get members of the current team
   */
  async getCurrentMembers(): Promise<TeamMember[]> {
    const response = await this.http.get<TeamMembersResponse>('/teams/current/members');
    return response.members;
  }
}
