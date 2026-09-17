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
   * Get the current team (via legacy `/teams/current` path).
   * @deprecated Prefer {@link authenticated} which uses the current `/team` path.
   */
  async current(): Promise<Team> {
    return this.http.get<Team>('/teams/current');
  }

  /**
   * Get the team bound to the API token (current spec path `/team`).
   */
  async authenticated(): Promise<Team> {
    return this.http.get<Team>('/team');
  }

  /**
   * Get members of a team
   */
  async getMembers(id: number): Promise<TeamMember[]> {
    const response = await this.http.get<TeamMembersResponse | TeamMember[]>(
      `/teams/${id}/members`
    );
    return Array.isArray(response) ? response : response.members;
  }

  /**
   * Get members of the current team (via legacy `/teams/current/members` path).
   * @deprecated Prefer {@link getAuthenticatedMembers}.
   */
  async getCurrentMembers(): Promise<TeamMember[]> {
    const response = await this.http.get<TeamMembersResponse | TeamMember[]>(
      '/teams/current/members'
    );
    return Array.isArray(response) ? response : response.members;
  }

  /**
   * Get members of the team bound to the API token (current spec path `/team/members`).
   */
  async getAuthenticatedMembers(): Promise<TeamMember[]> {
    const response = await this.http.get<TeamMembersResponse | TeamMember[]>('/team/members');
    return Array.isArray(response) ? response : response.members;
  }
}
