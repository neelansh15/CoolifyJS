class CoolifyError extends Error {
  constructor(message, statusCode, response) {
    super(message);
    this.name = "CoolifyError";
    this.statusCode = statusCode;
    this.response = response;
    Object.setPrototypeOf(this, CoolifyError.prototype);
  }
}
class CoolifyAuthError extends CoolifyError {
  constructor(message = "Authentication failed. Please check your API token.") {
    super(message, 401);
    this.name = "CoolifyAuthError";
    Object.setPrototypeOf(this, CoolifyAuthError.prototype);
  }
}
class CoolifyNotFoundError extends CoolifyError {
  constructor(resource, id) {
    const message = id ? `${resource} with id '${id}' not found` : `${resource} not found`;
    super(message, 404);
    this.name = "CoolifyNotFoundError";
    Object.setPrototypeOf(this, CoolifyNotFoundError.prototype);
  }
}
class CoolifyValidationError extends CoolifyError {
  constructor(message, errors) {
    super(message, 422);
    this.name = "CoolifyValidationError";
    this.errors = errors;
    Object.setPrototypeOf(this, CoolifyValidationError.prototype);
  }
}
class CoolifyRateLimitError extends CoolifyError {
  constructor(retryAfter) {
    super("Rate limit exceeded. Please try again later.", 429);
    this.name = "CoolifyRateLimitError";
    this.retryAfter = retryAfter;
    Object.setPrototypeOf(this, CoolifyRateLimitError.prototype);
  }
}
class CoolifyServerError extends CoolifyError {
  constructor(message = "Internal server error", statusCode = 500) {
    super(message, statusCode);
    this.name = "CoolifyServerError";
    Object.setPrototypeOf(this, CoolifyServerError.prototype);
  }
}
class HttpClient {
  constructor(config) {
    this.baseUrl = config.baseUrl.replace(/\/+$/, "");
    this.token = config.token;
    this.timeout = config.timeout ?? 3e4;
  }
  /**
   * Get default headers for requests
   */
  getHeaders(customHeaders) {
    return {
      "Authorization": `Bearer ${this.token}`,
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...customHeaders
    };
  }
  /**
   * Build full URL from path
   */
  buildUrl(path) {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${this.baseUrl}${normalizedPath}`;
  }
  /**
   * Handle error responses
   */
  async handleError(response) {
    let body;
    try {
      body = await response.json();
    } catch {
      body = await response.text().catch(() => null);
    }
    const message = this.extractErrorMessage(body) || response.statusText;
    switch (response.status) {
      case 401:
        throw new CoolifyAuthError(message);
      case 404:
        throw new CoolifyNotFoundError("Resource", void 0);
      case 422:
        throw new CoolifyValidationError(
          message,
          this.extractValidationErrors(body)
        );
      case 429:
        throw new CoolifyRateLimitError(
          this.extractRetryAfter(response)
        );
      default:
        if (response.status >= 500) {
          throw new CoolifyServerError(message, response.status);
        }
        throw new CoolifyError(message, response.status, body);
    }
  }
  /**
   * Extract error message from response body
   */
  extractErrorMessage(body) {
    if (typeof body === "string") return body;
    if (body && typeof body === "object") {
      const obj = body;
      if (typeof obj.message === "string") return obj.message;
      if (typeof obj.error === "string") return obj.error;
    }
    return void 0;
  }
  /**
   * Extract validation errors from response body
   */
  extractValidationErrors(body) {
    if (body && typeof body === "object") {
      const obj = body;
      if (obj.errors && typeof obj.errors === "object") {
        return obj.errors;
      }
    }
    return void 0;
  }
  /**
   * Extract retry-after header value
   */
  extractRetryAfter(response) {
    const retryAfter = response.headers.get("Retry-After");
    if (retryAfter) {
      const seconds = parseInt(retryAfter, 10);
      if (!isNaN(seconds)) return seconds;
    }
    return void 0;
  }
  /**
   * Make an HTTP request
   */
  async request(path, options = {}) {
    const { method = "GET", body, headers, timeout = this.timeout } = options;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(this.buildUrl(path), {
        method,
        headers: this.getHeaders(headers),
        body: body ? JSON.stringify(body) : void 0,
        signal: controller.signal
      });
      if (!response.ok) {
        await this.handleError(response);
      }
      const text = await response.text();
      if (!text) {
        return {};
      }
      return JSON.parse(text);
    } catch (error) {
      if (error instanceof CoolifyError) {
        throw error;
      }
      if (error instanceof Error && error.name === "AbortError") {
        throw new CoolifyError("Request timeout", 408);
      }
      throw new CoolifyError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    } finally {
      clearTimeout(timeoutId);
    }
  }
  /**
   * Make a GET request
   */
  async get(path, options) {
    return this.request(path, { ...options, method: "GET" });
  }
  /**
   * Make a POST request
   */
  async post(path, body, options) {
    return this.request(path, { ...options, method: "POST", body });
  }
  /**
   * Make a PUT request
   */
  async put(path, body, options) {
    return this.request(path, { ...options, method: "PUT", body });
  }
  /**
   * Make a PATCH request
   */
  async patch(path, body, options) {
    return this.request(path, { ...options, method: "PATCH", body });
  }
  /**
   * Make a DELETE request
   */
  async delete(path, options) {
    return this.request(path, { ...options, method: "DELETE" });
  }
}
class ApplicationsResource {
  constructor(http) {
    this.http = http;
  }
  /**
   * List all applications
   */
  async list() {
    return this.http.get("/applications");
  }
  /**
   * Get a specific application by UUID
   */
  async get(uuid) {
    return this.http.get(`/applications/${uuid}`);
  }
  /**
   * Create an application from a public Git repository
   */
  async createFromPublicRepo(data) {
    return this.http.post("/applications/public", data);
  }
  /**
   * Create an application from a private repository using GitHub App
   */
  async createFromPrivateRepoGitHubApp(data) {
    return this.http.post("/applications/private-github-app", data);
  }
  /**
   * Create an application from a private repository using deploy key
   */
  async createFromPrivateRepoDeployKey(data) {
    return this.http.post("/applications/private-deploy-key", data);
  }
  /**
   * Create an application from a Dockerfile
   */
  async createFromDockerfile(data) {
    return this.http.post("/applications/dockerfile", data);
  }
  /**
   * Create an application from a Docker image
   */
  async createFromDockerImage(data) {
    return this.http.post("/applications/dockerimage", data);
  }
  /**
   * Create an application from Docker Compose
   */
  async createFromDockerCompose(data) {
    return this.http.post("/applications/dockercompose", data);
  }
  /**
   * Update an application
   */
  async update(uuid, data) {
    return this.http.patch(`/applications/${uuid}`, data);
  }
  /**
   * Delete an application
   */
  async delete(uuid, deleteConfigurations = false, deleteVolumes = false) {
    const params = new URLSearchParams();
    if (deleteConfigurations) params.append("delete_configurations", "true");
    if (deleteVolumes) params.append("delete_volumes", "true");
    const query = params.toString();
    return this.http.delete(`/applications/${uuid}${query ? `?${query}` : ""}`);
  }
  /**
   * List environment variables for an application
   */
  async listEnvs(uuid) {
    return this.http.get(`/applications/${uuid}/envs`);
  }
  /**
   * Create an environment variable for an application
   */
  async createEnv(uuid, data) {
    return this.http.post(`/applications/${uuid}/envs`, data);
  }
  /**
   * Update an environment variable
   */
  async updateEnv(uuid, envUuid, data) {
    return this.http.patch(`/applications/${uuid}/envs/${envUuid}`, data);
  }
  /**
   * Bulk update environment variables
   */
  async bulkUpdateEnvs(uuid, data) {
    return this.http.patch(`/applications/${uuid}/envs/bulk`, data);
  }
  /**
   * Delete an environment variable
   */
  async deleteEnv(uuid, envUuid) {
    return this.http.delete(`/applications/${uuid}/envs/${envUuid}`);
  }
  /**
   * Start an application
   */
  async start(uuid) {
    return this.http.post(`/applications/${uuid}/start`);
  }
  /**
   * Stop an application
   */
  async stop(uuid) {
    return this.http.post(`/applications/${uuid}/stop`);
  }
  /**
   * Restart an application
   */
  async restart(uuid) {
    return this.http.post(`/applications/${uuid}/restart`);
  }
  /**
   * Get application logs
   */
  async logs(uuid) {
    return this.http.get(`/applications/${uuid}/logs`);
  }
}
class DatabasesResource {
  constructor(http) {
    this.http = http;
  }
  /**
   * List all databases
   */
  async list() {
    return this.http.get("/databases");
  }
  /**
   * Get a specific database by UUID
   */
  async get(uuid) {
    return this.http.get(`/databases/${uuid}`);
  }
  /**
   * Create a PostgreSQL database
   */
  async createPostgreSQL(data) {
    return this.http.post("/databases/postgresql", data);
  }
  /**
   * Create a MySQL database
   */
  async createMySQL(data) {
    return this.http.post("/databases/mysql", data);
  }
  /**
   * Create a MariaDB database
   */
  async createMariaDB(data) {
    return this.http.post("/databases/mariadb", data);
  }
  /**
   * Create a MongoDB database
   */
  async createMongoDB(data) {
    return this.http.post("/databases/mongodb", data);
  }
  /**
   * Create a Redis database
   */
  async createRedis(data) {
    return this.http.post("/databases/redis", data);
  }
  /**
   * Create a Dragonfly database
   */
  async createDragonfly(data) {
    return this.http.post("/databases/dragonfly", data);
  }
  /**
   * Create a KeyDB database
   */
  async createKeyDB(data) {
    return this.http.post("/databases/keydb", data);
  }
  /**
   * Create a ClickHouse database
   */
  async createClickHouse(data) {
    return this.http.post("/databases/clickhouse", data);
  }
  /**
   * Update a database
   */
  async update(uuid, data) {
    return this.http.patch(`/databases/${uuid}`, data);
  }
  /**
   * Delete a database
   */
  async delete(uuid, deleteConfigurations = false, deleteVolumes = false) {
    const params = new URLSearchParams();
    if (deleteConfigurations) params.append("delete_configurations", "true");
    if (deleteVolumes) params.append("delete_volumes", "true");
    const query = params.toString();
    return this.http.delete(`/databases/${uuid}${query ? `?${query}` : ""}`);
  }
  /**
   * Start a database
   */
  async start(uuid) {
    return this.http.post(`/databases/${uuid}/start`);
  }
  /**
   * Stop a database
   */
  async stop(uuid) {
    return this.http.post(`/databases/${uuid}/stop`);
  }
  /**
   * Restart a database
   */
  async restart(uuid) {
    return this.http.post(`/databases/${uuid}/restart`);
  }
  /**
   * List backups for a database
   */
  async listBackups(uuid) {
    return this.http.get(`/databases/${uuid}/backups`);
  }
  /**
   * Create a backup for a database
   */
  async createBackup(uuid) {
    return this.http.post(`/databases/${uuid}/backups`);
  }
}
class DeploymentsResource {
  constructor(http) {
    this.http = http;
  }
  /**
   * List all deployments
   */
  async list() {
    return this.http.get("/deployments");
  }
  /**
   * Get a specific deployment by UUID
   */
  async get(uuid) {
    return this.http.get(`/deployments/${uuid}`);
  }
  /**
   * Deploy an application
   */
  async deploy(applicationUuid, options) {
    const params = new URLSearchParams();
    if (options == null ? void 0 : options.force) params.append("force", "true");
    if (options == null ? void 0 : options.instant_deploy) params.append("instant_deploy", "true");
    const query = params.toString();
    return this.http.post(`/deploy?uuid=${applicationUuid}${query ? `&${query}` : ""}`);
  }
  /**
   * List deployments for a specific application
   */
  async listByApplication(applicationUuid) {
    return this.http.get(`/applications/${applicationUuid}/deployments`);
  }
}
class GitHubAppsResource {
  constructor(http) {
    this.http = http;
  }
  /**
   * List all GitHub Apps
   */
  async list() {
    return this.http.get("/github-apps");
  }
  /**
   * Get a specific GitHub App by UUID
   */
  async get(uuid) {
    return this.http.get(`/github-apps/${uuid}`);
  }
  /**
   * Create a GitHub App
   */
  async create(data) {
    return this.http.post("/github-apps", data);
  }
  /**
   * Update a GitHub App
   */
  async update(uuid, data) {
    return this.http.patch(`/github-apps/${uuid}`, data);
  }
  /**
   * Delete a GitHub App
   */
  async delete(uuid) {
    return this.http.delete(`/github-apps/${uuid}`);
  }
  /**
   * Load repositories for a GitHub App
   */
  async loadRepositories(uuid) {
    return this.http.get(`/github-apps/${uuid}/repositories`);
  }
  /**
   * Load branches for a repository
   */
  async loadBranches(uuid, repositoryName) {
    return this.http.get(
      `/github-apps/${uuid}/repositories/${encodeURIComponent(repositoryName)}/branches`
    );
  }
}
class ProjectsResource {
  constructor(http) {
    this.http = http;
  }
  /**
   * List all projects
   */
  async list() {
    return this.http.get("/projects");
  }
  /**
   * Get a specific project by UUID
   */
  async get(uuid) {
    return this.http.get(`/projects/${uuid}`);
  }
  /**
   * Create a new project
   */
  async create(data) {
    return this.http.post("/projects", data);
  }
  /**
   * Update a project
   */
  async update(uuid, data) {
    return this.http.patch(`/projects/${uuid}`, data);
  }
  /**
   * Delete a project
   */
  async delete(uuid) {
    return this.http.delete(`/projects/${uuid}`);
  }
  /**
   * List environments for a project
   */
  async listEnvironments(projectUuid) {
    return this.http.get(`/projects/${projectUuid}/environments`);
  }
  /**
   * Get a specific environment by name
   */
  async getEnvironment(projectUuid, environmentName) {
    return this.http.get(
      `/projects/${projectUuid}/${encodeURIComponent(environmentName)}`
    );
  }
  /**
   * Create a new environment for a project
   */
  async createEnvironment(projectUuid, data) {
    return this.http.post(`/projects/${projectUuid}/environments`, data);
  }
  /**
   * Delete an environment
   */
  async deleteEnvironment(projectUuid, environmentName) {
    return this.http.delete(
      `/projects/${projectUuid}/${encodeURIComponent(environmentName)}`
    );
  }
}
class PrivateKeysResource {
  constructor(http) {
    this.http = http;
  }
  /**
   * List all private keys
   */
  async list() {
    return this.http.get("/private-keys");
  }
  /**
   * Get a specific private key by UUID
   */
  async get(uuid) {
    return this.http.get(`/private-keys/${uuid}`);
  }
  /**
   * Create a new private key
   */
  async create(data) {
    return this.http.post("/private-keys", data);
  }
  /**
   * Update a private key
   */
  async update(uuid, data) {
    return this.http.patch(`/private-keys/${uuid}`, data);
  }
  /**
   * Delete a private key
   */
  async delete(uuid) {
    return this.http.delete(`/private-keys/${uuid}`);
  }
}
class ServersResource {
  constructor(http) {
    this.http = http;
  }
  /**
   * List all servers
   */
  async list() {
    return this.http.get("/servers");
  }
  /**
   * Get a specific server by UUID
   */
  async get(uuid) {
    return this.http.get(`/servers/${uuid}`);
  }
  /**
   * Create a new server
   */
  async create(data) {
    return this.http.post("/servers", data);
  }
  /**
   * Update a server
   */
  async update(uuid, data) {
    return this.http.patch(`/servers/${uuid}`, data);
  }
  /**
   * Delete a server
   */
  async delete(uuid) {
    return this.http.delete(`/servers/${uuid}`);
  }
  /**
   * Get resources on a server
   */
  async getResources(uuid) {
    return this.http.get(`/servers/${uuid}/resources`);
  }
  /**
   * Get domains configured on a server
   */
  async getDomains(uuid) {
    return this.http.get(`/servers/${uuid}/domains`);
  }
  /**
   * Validate a server connection
   */
  async validate(uuid) {
    return this.http.post(`/servers/${uuid}/validate`);
  }
}
class ServicesResource {
  constructor(http) {
    this.http = http;
  }
  /**
   * List all services
   */
  async list() {
    return this.http.get("/services");
  }
  /**
   * Get a specific service by UUID
   */
  async get(uuid) {
    return this.http.get(`/services/${uuid}`);
  }
  /**
   * Create a new service
   */
  async create(data) {
    return this.http.post("/services", data);
  }
  /**
   * Update a service
   */
  async update(uuid, data) {
    return this.http.patch(`/services/${uuid}`, data);
  }
  /**
   * Delete a service
   */
  async delete(uuid, deleteConfigurations = false, deleteVolumes = false) {
    const params = new URLSearchParams();
    if (deleteConfigurations) params.append("delete_configurations", "true");
    if (deleteVolumes) params.append("delete_volumes", "true");
    const query = params.toString();
    return this.http.delete(`/services/${uuid}${query ? `?${query}` : ""}`);
  }
  /**
   * List environment variables for a service
   */
  async listEnvs(uuid) {
    return this.http.get(`/services/${uuid}/envs`);
  }
  /**
   * Create an environment variable for a service
   */
  async createEnv(uuid, data) {
    return this.http.post(`/services/${uuid}/envs`, data);
  }
  /**
   * Update an environment variable
   */
  async updateEnv(uuid, envUuid, data) {
    return this.http.patch(`/services/${uuid}/envs/${envUuid}`, data);
  }
  /**
   * Bulk update environment variables
   */
  async bulkUpdateEnvs(uuid, data) {
    return this.http.patch(`/services/${uuid}/envs/bulk`, data);
  }
  /**
   * Delete an environment variable
   */
  async deleteEnv(uuid, envUuid) {
    return this.http.delete(`/services/${uuid}/envs/${envUuid}`);
  }
  /**
   * Start a service
   */
  async start(uuid) {
    return this.http.post(`/services/${uuid}/start`);
  }
  /**
   * Stop a service
   */
  async stop(uuid) {
    return this.http.post(`/services/${uuid}/stop`);
  }
  /**
   * Restart a service
   */
  async restart(uuid) {
    return this.http.post(`/services/${uuid}/restart`);
  }
}
class TeamsResource {
  constructor(http) {
    this.http = http;
  }
  /**
   * List all teams
   */
  async list() {
    return this.http.get("/teams");
  }
  /**
   * Get a specific team by ID
   */
  async get(id) {
    return this.http.get(`/teams/${id}`);
  }
  /**
   * Get the current team
   */
  async current() {
    return this.http.get("/teams/current");
  }
  /**
   * Get members of a team
   */
  async getMembers(id) {
    const response = await this.http.get(`/teams/${id}/members`);
    return response.members;
  }
  /**
   * Get members of the current team
   */
  async getCurrentMembers() {
    const response = await this.http.get("/teams/current/members");
    return response.members;
  }
}
class SystemResource {
  constructor(http) {
    this.http = http;
  }
  /**
   * Get the Coolify version
   */
  async version() {
    return this.http.get("/version");
  }
  /**
   * Check the health of the Coolify API
   */
  async healthCheck() {
    return this.http.get("/healthcheck");
  }
  /**
   * Enable the Coolify API
   */
  async enableApi() {
    return this.http.post("/enable");
  }
  /**
   * Disable the Coolify API
   */
  async disableApi() {
    return this.http.post("/disable");
  }
}
class ResourcesResource {
  constructor(http) {
    this.http = http;
  }
  /**
   * List all resources (applications, databases, services)
   */
  async list() {
    return this.http.get("/resources");
  }
}
class CoolifyClient {
  /**
   * Create a new Coolify client instance
   *
   * @param config - Client configuration options
   */
  constructor(config) {
    this.http = new HttpClient(config);
    this.applications = new ApplicationsResource(this.http);
    this.databases = new DatabasesResource(this.http);
    this.deployments = new DeploymentsResource(this.http);
    this.githubApps = new GitHubAppsResource(this.http);
    this.projects = new ProjectsResource(this.http);
    this.privateKeys = new PrivateKeysResource(this.http);
    this.servers = new ServersResource(this.http);
    this.services = new ServicesResource(this.http);
    this.teams = new TeamsResource(this.http);
    this.system = new SystemResource(this.http);
    this.resources = new ResourcesResource(this.http);
  }
}
export {
  ApplicationsResource,
  CoolifyAuthError,
  CoolifyClient,
  CoolifyError,
  CoolifyNotFoundError,
  CoolifyRateLimitError,
  CoolifyServerError,
  CoolifyValidationError,
  DatabasesResource,
  DeploymentsResource,
  GitHubAppsResource,
  HttpClient,
  PrivateKeysResource,
  ProjectsResource,
  ResourcesResource,
  ServersResource,
  ServicesResource,
  SystemResource,
  TeamsResource
};
//# sourceMappingURL=coolify-sdk.js.map
