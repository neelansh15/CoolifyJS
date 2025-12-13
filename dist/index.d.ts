/**
 * Union type for all database types
 */
export declare type AnyDatabase = PostgreSQLDatabase | MySQLDatabase | MariaDBDatabase | MongoDBDatabase | RedisDatabase | DragonflyDatabase | KeyDBDatabase | ClickHouseDatabase;

/**
 * Generic API response wrapper
 */
export declare interface ApiResponse<T> {
    data: T;
    message?: string;
}

/**
 * API status response
 */
export declare interface ApiStatusResponse {
    enabled: boolean;
}

/**
 * Application entity
 */
export declare interface Application extends Timestamps {
    id: number;
    uuid: UUID;
    name: string;
    description?: string;
    fqdn?: string;
    repository_project_id?: number;
    git_repository?: string;
    git_branch?: string;
    git_commit_sha?: string;
    git_full_url?: string;
    docker_registry_image_name?: string;
    docker_registry_image_tag?: string;
    build_pack: BuildPack;
    static_image?: string;
    install_command?: string;
    build_command?: string;
    start_command?: string;
    ports_exposes?: string;
    ports_mappings?: string;
    base_directory?: string;
    publish_directory?: string;
    dockerfile?: string;
    dockerfile_location?: string;
    dockerfile_target_build?: string;
    docker_compose?: string;
    docker_compose_location?: string;
    docker_compose_custom_start_command?: string;
    docker_compose_custom_build_command?: string;
    docker_compose_domains?: string;
    custom_labels?: string;
    custom_docker_run_options?: string;
    post_deployment_command?: string;
    post_deployment_command_container?: string;
    pre_deployment_command?: string;
    pre_deployment_command_container?: string;
    watch_paths?: string;
    custom_healthcheck_found?: boolean;
    manual_webhook_secret_github?: string;
    manual_webhook_secret_gitlab?: string;
    manual_webhook_secret_bitbucket?: string;
    manual_webhook_secret_gitea?: string;
    redirect?: string;
    preview_url_template?: string;
    health_check_enabled?: boolean;
    health_check_path?: string;
    health_check_port?: string;
    health_check_host?: string;
    health_check_method?: string;
    health_check_return_code?: number;
    health_check_scheme?: string;
    health_check_response_text?: string;
    health_check_interval?: number;
    health_check_timeout?: number;
    health_check_retries?: number;
    health_check_start_period?: number;
    limits_memory?: string;
    limits_memory_swap?: string;
    limits_memory_swappiness?: number;
    limits_memory_reservation?: string;
    limits_cpus?: string;
    limits_cpuset?: string;
    limits_cpu_shares?: number;
    status: ResourceStatus;
    destination_type?: string;
    destination_id?: number;
    source_type?: ApplicationSourceType;
    source_id?: number;
    private_key_id?: number;
    environment_id: number;
    project_uuid?: UUID;
    environment_name?: string;
}

/**
 * Application deployments list
 */
export declare interface ApplicationDeployments {
    deployments: Deployment[];
}

/**
 * Application environment variables response
 */
export declare interface ApplicationEnvs {
    envs: EnvironmentVariable[];
}

/**
 * Application logs response
 */
export declare interface ApplicationLogs {
    logs: string[];
}

/**
 * Application source type
 */
export declare type ApplicationSourceType = 'github' | 'gitlab' | 'bitbucket' | 'git' | 'dockerimage' | 'dockercompose';

/**
 * Applications resource for managing Coolify applications
 */
export declare class ApplicationsResource {
    private readonly http;
    constructor(http: HttpClient);
    /**
     * List all applications
     */
    list(): Promise<Application[]>;
    /**
     * Get a specific application by UUID
     */
    get(uuid: UUID): Promise<Application>;
    /**
     * Create an application from a public Git repository
     */
    createFromPublicRepo(data: CreatePublicApplication): Promise<UuidResponse>;
    /**
     * Create an application from a private repository using GitHub App
     */
    createFromPrivateRepoGitHubApp(data: CreatePrivateGitHubAppApplication): Promise<UuidResponse>;
    /**
     * Create an application from a private repository using deploy key
     */
    createFromPrivateRepoDeployKey(data: CreatePrivateDeployKeyApplication): Promise<UuidResponse>;
    /**
     * Create an application from a Dockerfile
     */
    createFromDockerfile(data: CreateDockerfileApplication): Promise<UuidResponse>;
    /**
     * Create an application from a Docker image
     */
    createFromDockerImage(data: CreateDockerImageApplication): Promise<UuidResponse>;
    /**
     * Create an application from Docker Compose
     */
    createFromDockerCompose(data: CreateDockerComposeApplication): Promise<UuidResponse>;
    /**
     * Update an application
     */
    update(uuid: UUID, data: UpdateApplication): Promise<Application>;
    /**
     * Delete an application
     */
    delete(uuid: UUID, deleteConfigurations?: boolean, deleteVolumes?: boolean): Promise<MessageResponse>;
    /**
     * List environment variables for an application
     */
    listEnvs(uuid: UUID): Promise<ApplicationEnvs>;
    /**
     * Create an environment variable for an application
     */
    createEnv(uuid: UUID, data: CreateEnvironmentVariable): Promise<UuidResponse>;
    /**
     * Update an environment variable
     */
    updateEnv(uuid: UUID, envUuid: UUID, data: UpdateEnvironmentVariable): Promise<MessageResponse>;
    /**
     * Bulk update environment variables
     */
    bulkUpdateEnvs(uuid: UUID, data: BulkUpdateEnvironmentVariables): Promise<MessageResponse>;
    /**
     * Delete an environment variable
     */
    deleteEnv(uuid: UUID, envUuid: UUID): Promise<MessageResponse>;
    /**
     * Start an application
     */
    start(uuid: UUID): Promise<DeploymentResponse>;
    /**
     * Stop an application
     */
    stop(uuid: UUID): Promise<MessageResponse>;
    /**
     * Restart an application
     */
    restart(uuid: UUID): Promise<DeploymentResponse>;
    /**
     * Get application logs
     */
    logs(uuid: UUID): Promise<ApplicationLogs>;
}

/**
 * Base create database input
 */
declare interface BaseCreateDatabase {
    project_uuid: UUID;
    server_uuid: UUID;
    environment_name?: string;
    destination_uuid?: UUID;
    name?: string;
    description?: string;
    image?: string;
    is_public?: boolean;
    public_port?: number;
    instant_deploy?: boolean;
    limits_memory?: string;
    limits_memory_swap?: string;
    limits_memory_swappiness?: number;
    limits_memory_reservation?: string;
    limits_cpus?: string;
    limits_cpuset?: string;
    limits_cpu_shares?: number;
}

/**
 * Application build pack types
 */
export declare type BuildPack = 'nixpacks' | 'dockerfile' | 'dockercompose' | 'dockerimage' | 'static';

/**
 * Bulk update environment variables input
 */
export declare interface BulkUpdateEnvironmentVariables {
    data: CreateEnvironmentVariable[];
}

/**
 * ClickHouse specific fields
 */
export declare interface ClickHouseDatabase extends Database {
    type: 'clickhouse';
    clickhouse_user?: string;
    clickhouse_password?: string;
    clickhouse_database?: string;
}

/**
 * Error thrown when authentication fails (401)
 */
export declare class CoolifyAuthError extends CoolifyError {
    constructor(message?: string);
}

/**
 * Main Coolify SDK client
 *
 * @example
 * ```typescript
 * import { CoolifyClient } from 'coolify-sdk';
 *
 * const coolify = new CoolifyClient({
 *   baseUrl: 'https://coolify.example.com/api/v1',
 *   token: 'your-api-token',
 * });
 *
 * // List all applications
 * const apps = await coolify.applications.list();
 *
 * // Start an application
 * await coolify.applications.start('app-uuid');
 *
 * // Create a PostgreSQL database
 * await coolify.databases.createPostgreSQL({
 *   project_uuid: 'project-uuid',
 *   server_uuid: 'server-uuid',
 *   name: 'my-database',
 * });
 * ```
 */
export declare class CoolifyClient {
    private readonly http;
    /** Applications resource for managing Coolify applications */
    readonly applications: ApplicationsResource;
    /** Databases resource for managing Coolify databases */
    readonly databases: DatabasesResource;
    /** Deployments resource for managing deployments */
    readonly deployments: DeploymentsResource;
    /** GitHub Apps resource for managing GitHub integrations */
    readonly githubApps: GitHubAppsResource;
    /** Projects resource for managing Coolify projects */
    readonly projects: ProjectsResource;
    /** Private Keys resource for managing SSH keys */
    readonly privateKeys: PrivateKeysResource;
    /** Servers resource for managing Coolify servers */
    readonly servers: ServersResource;
    /** Services resource for managing Coolify services */
    readonly services: ServicesResource;
    /** Teams resource for managing Coolify teams */
    readonly teams: TeamsResource;
    /** System resource for system operations */
    readonly system: SystemResource;
    /** Resources resource for listing all resources */
    readonly resources: ResourcesResource;
    /**
     * Create a new Coolify client instance
     *
     * @param config - Client configuration options
     */
    constructor(config: CoolifyClientConfig);
}

/**
 * Configuration options for the Coolify client
 */
export declare interface CoolifyClientConfig {
    /** Base URL of the Coolify API (e.g., https://coolify.example.com/api/v1) */
    baseUrl: string;
    /** API token for authentication */
    token: string;
    /** Request timeout in milliseconds (default: 30000) */
    timeout?: number;
}

/**
 * Base error class for all Coolify SDK errors
 */
export declare class CoolifyError extends Error {
    readonly statusCode?: number;
    readonly response?: unknown;
    constructor(message: string, statusCode?: number, response?: unknown);
}

/**
 * Error thrown when a resource is not found (404)
 */
export declare class CoolifyNotFoundError extends CoolifyError {
    constructor(resource: string, id?: string);
}

/**
 * Error thrown when rate limit is exceeded (429)
 */
export declare class CoolifyRateLimitError extends CoolifyError {
    readonly retryAfter?: number;
    constructor(retryAfter?: number);
}

/**
 * Error thrown when the server returns an error (500+)
 */
export declare class CoolifyServerError extends CoolifyError {
    constructor(message?: string, statusCode?: number);
}

/**
 * Error thrown when validation fails (422)
 */
export declare class CoolifyValidationError extends CoolifyError {
    readonly errors?: Record<string, string[]>;
    constructor(message: string, errors?: Record<string, string[]>);
}

/**
 * Create ClickHouse database input
 */
export declare interface CreateClickHouseDatabase extends BaseCreateDatabase {
    clickhouse_user?: string;
    clickhouse_password?: string;
    clickhouse_database?: string;
}

/**
 * Create database backup input
 */
export declare interface CreateDatabaseBackup {
    /** S3 storage uuid if using external storage */
    s3_uuid?: UUID;
}

/**
 * Create application from Docker Compose
 */
export declare interface CreateDockerComposeApplication {
    project_uuid: UUID;
    server_uuid: UUID;
    environment_name?: string;
    destination_uuid?: UUID;
    docker_compose_raw: string;
    name?: string;
    description?: string;
    instant_deploy?: boolean;
}

/**
 * Create application from Dockerfile
 */
export declare interface CreateDockerfileApplication {
    project_uuid: UUID;
    server_uuid: UUID;
    environment_name?: string;
    destination_uuid?: UUID;
    dockerfile: string;
    name?: string;
    description?: string;
    domains?: string;
    ports_exposes?: string;
    instant_deploy?: boolean;
}

/**
 * Create application from Docker image
 */
export declare interface CreateDockerImageApplication {
    project_uuid: UUID;
    server_uuid: UUID;
    environment_name?: string;
    destination_uuid?: UUID;
    docker_registry_image_name: string;
    docker_registry_image_tag?: string;
    name?: string;
    description?: string;
    domains?: string;
    ports_exposes?: string;
    instant_deploy?: boolean;
    limits_memory?: string;
    limits_cpus?: string;
}

/**
 * Create Dragonfly database input
 */
export declare interface CreateDragonflyDatabase extends BaseCreateDatabase {
    dragonfly_password?: string;
}

/**
 * Create environment input
 */
export declare interface CreateEnvironment {
    name: string;
    description?: string;
}

/**
 * Create environment variable input
 */
export declare interface CreateEnvironmentVariable {
    key: string;
    value: string;
    is_build_time?: boolean;
    is_preview?: boolean;
    is_literal?: boolean;
    is_multiline?: boolean;
    is_shown_once?: boolean;
}

/**
 * Create GitHub App input
 */
export declare interface CreateGitHubApp {
    name: string;
    organization?: string;
    app_id: number;
    installation_id: number;
    client_id: string;
    client_secret: string;
    webhook_secret: string;
    private_key: string;
    is_system_wide?: boolean;
}

/**
 * Create KeyDB database input
 */
export declare interface CreateKeyDBDatabase extends BaseCreateDatabase {
    keydb_password?: string;
    keydb_conf?: string;
}

/**
 * Create MariaDB database input
 */
export declare interface CreateMariaDBDatabase extends BaseCreateDatabase {
    mariadb_user?: string;
    mariadb_password?: string;
    mariadb_database?: string;
    mariadb_root_password?: string;
    mariadb_conf?: string;
}

/**
 * Create MongoDB database input
 */
export declare interface CreateMongoDBDatabase extends BaseCreateDatabase {
    mongo_initdb_root_username?: string;
    mongo_initdb_root_password?: string;
    mongo_initdb_database?: string;
    mongo_conf?: string;
}

/**
 * Create MySQL database input
 */
export declare interface CreateMySQLDatabase extends BaseCreateDatabase {
    mysql_user?: string;
    mysql_password?: string;
    mysql_database?: string;
    mysql_root_password?: string;
    mysql_conf?: string;
}

/**
 * Create PostgreSQL database input
 */
export declare interface CreatePostgreSQLDatabase extends BaseCreateDatabase {
    postgres_user?: string;
    postgres_password?: string;
    postgres_db?: string;
    postgres_initdb_args?: string;
    postgres_host_auth_method?: string;
    postgres_conf?: string;
}

/**
 * Create application from private repository (deploy key)
 */
export declare interface CreatePrivateDeployKeyApplication {
    project_uuid: UUID;
    server_uuid: UUID;
    environment_name?: string;
    destination_uuid?: UUID;
    private_key_uuid: UUID;
    git_repository: string;
    git_branch: string;
    git_commit_sha?: string;
    build_pack?: BuildPack;
    ports_exposes?: string;
    name?: string;
    description?: string;
    domains?: string;
    instant_deploy?: boolean;
}

/**
 * Create application from private repository (GitHub App)
 */
export declare interface CreatePrivateGitHubAppApplication {
    project_uuid: UUID;
    server_uuid: UUID;
    environment_name?: string;
    destination_uuid?: UUID;
    github_app_uuid: UUID;
    git_repository: string;
    git_branch: string;
    git_commit_sha?: string;
    build_pack?: BuildPack;
    ports_exposes?: string;
    name?: string;
    description?: string;
    domains?: string;
    instant_deploy?: boolean;
}

/**
 * Create private key input
 */
export declare interface CreatePrivateKey {
    name: string;
    description?: string;
    private_key: string;
}

/**
 * Create project input
 */
export declare interface CreateProject {
    name: string;
    description?: string;
}

/**
 * Create application from public repository
 */
export declare interface CreatePublicApplication {
    project_uuid: UUID;
    server_uuid: UUID;
    environment_name?: string;
    destination_uuid?: UUID;
    git_repository: string;
    git_branch: string;
    git_commit_sha?: string;
    build_pack?: BuildPack;
    ports_exposes?: string;
    name?: string;
    description?: string;
    domains?: string;
    instant_deploy?: boolean;
}

/**
 * Create Redis database input
 */
export declare interface CreateRedisDatabase extends BaseCreateDatabase {
    redis_password?: string;
    redis_conf?: string;
}

/**
 * Create server input
 */
export declare interface CreateServer {
    name: string;
    description?: string;
    ip: string;
    port?: number;
    user?: string;
    private_key_uuid: UUID;
    is_build_server?: boolean;
    instant_validate?: boolean;
}

/**
 * Create service input
 */
export declare interface CreateService {
    project_uuid: UUID;
    server_uuid: UUID;
    environment_name?: string;
    destination_uuid?: UUID;
    type: string;
    name?: string;
    description?: string;
    instant_deploy?: boolean;
}

/**
 * Base database entity
 */
export declare interface Database extends Timestamps {
    id: number;
    uuid: UUID;
    name: string;
    description?: string;
    type: DatabaseType;
    status: ResourceStatus;
    is_public?: boolean;
    public_port?: number;
    limits_memory?: string;
    limits_memory_swap?: string;
    limits_memory_swappiness?: number;
    limits_memory_reservation?: string;
    limits_cpus?: string;
    limits_cpuset?: string;
    limits_cpu_shares?: number;
    destination_type?: string;
    destination_id?: number;
    environment_id: number;
    project_uuid?: UUID;
    environment_name?: string;
    image?: string;
}

/**
 * Database backup entity
 */
export declare interface DatabaseBackup extends Timestamps {
    id: number;
    uuid: UUID;
    database_id: number;
    database_type: DatabaseType;
    status: 'pending' | 'success' | 'failed';
    filename?: string;
    size?: number;
}

/**
 * Databases resource for managing Coolify databases
 */
export declare class DatabasesResource {
    private readonly http;
    constructor(http: HttpClient);
    /**
     * List all databases
     */
    list(): Promise<AnyDatabase[]>;
    /**
     * Get a specific database by UUID
     */
    get(uuid: UUID): Promise<AnyDatabase>;
    /**
     * Create a PostgreSQL database
     */
    createPostgreSQL(data: CreatePostgreSQLDatabase): Promise<UuidResponse>;
    /**
     * Create a MySQL database
     */
    createMySQL(data: CreateMySQLDatabase): Promise<UuidResponse>;
    /**
     * Create a MariaDB database
     */
    createMariaDB(data: CreateMariaDBDatabase): Promise<UuidResponse>;
    /**
     * Create a MongoDB database
     */
    createMongoDB(data: CreateMongoDBDatabase): Promise<UuidResponse>;
    /**
     * Create a Redis database
     */
    createRedis(data: CreateRedisDatabase): Promise<UuidResponse>;
    /**
     * Create a Dragonfly database
     */
    createDragonfly(data: CreateDragonflyDatabase): Promise<UuidResponse>;
    /**
     * Create a KeyDB database
     */
    createKeyDB(data: CreateKeyDBDatabase): Promise<UuidResponse>;
    /**
     * Create a ClickHouse database
     */
    createClickHouse(data: CreateClickHouseDatabase): Promise<UuidResponse>;
    /**
     * Update a database
     */
    update(uuid: UUID, data: UpdateDatabase): Promise<AnyDatabase>;
    /**
     * Delete a database
     */
    delete(uuid: UUID, deleteConfigurations?: boolean, deleteVolumes?: boolean): Promise<MessageResponse>;
    /**
     * Start a database
     */
    start(uuid: UUID): Promise<DeploymentResponse>;
    /**
     * Stop a database
     */
    stop(uuid: UUID): Promise<MessageResponse>;
    /**
     * Restart a database
     */
    restart(uuid: UUID): Promise<DeploymentResponse>;
    /**
     * List backups for a database
     */
    listBackups(uuid: UUID): Promise<DatabaseBackup[]>;
    /**
     * Create a backup for a database
     */
    createBackup(uuid: UUID): Promise<MessageResponse>;
}

/**
 * Supported database types
 */
export declare type DatabaseType = 'postgresql' | 'mysql' | 'mariadb' | 'mongodb' | 'redis' | 'dragonfly' | 'keydb' | 'clickhouse';

/**
 * Deploy application input
 */
export declare interface DeployApplicationInput {
    /** Force rebuild without cache */
    force?: boolean;
    /** Instant deploy (skip build) */
    instant_deploy?: boolean;
}

/**
 * Deployment entity
 */
export declare interface Deployment extends Timestamps {
    id: number;
    uuid: UUID;
    application_id: number;
    application_uuid?: UUID;
    application_name?: string;
    deployment_uuid: UUID;
    pull_request_id?: number;
    force_rebuild?: boolean;
    commit?: string;
    commit_message?: string;
    status: DeploymentStatus;
    is_webhook?: boolean;
    logs?: string;
    current_process_id?: string;
    restart_only?: boolean;
    git_type?: string;
    only_this?: boolean;
    rollback?: boolean;
    server_id?: number;
    server_name?: string;
}

/**
 * Deployment response
 */
export declare interface DeploymentResponse {
    message: string;
    deployment_uuid?: string;
}

/**
 * Deployments resource for managing Coolify deployments
 */
export declare class DeploymentsResource {
    private readonly http;
    constructor(http: HttpClient);
    /**
     * List all deployments
     */
    list(): Promise<Deployment[]>;
    /**
     * Get a specific deployment by UUID
     */
    get(uuid: UUID): Promise<Deployment>;
    /**
     * Deploy an application
     */
    deploy(applicationUuid: UUID, options?: DeployApplicationInput): Promise<DeploymentResponse>;
    /**
     * List deployments for a specific application
     */
    listByApplication(applicationUuid: UUID): Promise<Deployment[]>;
}

/**
 * Deployment status
 */
export declare type DeploymentStatus = 'queued' | 'in_progress' | 'finished' | 'failed' | 'cancelled';

/**
 * Dragonfly specific fields
 */
export declare interface DragonflyDatabase extends Database {
    type: 'dragonfly';
    dragonfly_password?: string;
}

/**
 * Common environment variable structure
 */
export declare interface EnvironmentVariable {
    id?: number;
    uuid?: string;
    key: string;
    value: string;
    is_build_time?: boolean;
    is_preview?: boolean;
    is_literal?: boolean;
    is_multiline?: boolean;
    is_shown_once?: boolean;
}

/**
 * Environment with resources
 */
export declare interface EnvironmentWithResources extends ProjectEnvironment {
    applications?: unknown[];
    databases?: unknown[];
    services?: unknown[];
}

/**
 * GitHub App entity
 */
export declare interface GitHubApp extends Timestamps {
    id: number;
    uuid: UUID;
    name: string;
    organization?: string;
    app_id?: number;
    installation_id?: number;
    client_id?: string;
    client_secret?: string;
    webhook_secret?: string;
    private_key?: string;
    is_system_wide?: boolean;
    html_url?: string;
}

/**
 * GitHub Apps resource for managing Coolify GitHub integrations
 */
export declare class GitHubAppsResource {
    private readonly http;
    constructor(http: HttpClient);
    /**
     * List all GitHub Apps
     */
    list(): Promise<GitHubApp[]>;
    /**
     * Get a specific GitHub App by UUID
     */
    get(uuid: UUID): Promise<GitHubApp>;
    /**
     * Create a GitHub App
     */
    create(data: CreateGitHubApp): Promise<UuidResponse>;
    /**
     * Update a GitHub App
     */
    update(uuid: UUID, data: UpdateGitHubApp): Promise<GitHubApp>;
    /**
     * Delete a GitHub App
     */
    delete(uuid: UUID): Promise<MessageResponse>;
    /**
     * Load repositories for a GitHub App
     */
    loadRepositories(uuid: UUID): Promise<LoadRepositoriesResponse>;
    /**
     * Load branches for a repository
     */
    loadBranches(uuid: UUID, repositoryName: string): Promise<LoadBranchesResponse>;
}

/**
 * GitHub branch
 */
export declare interface GitHubBranch {
    name: string;
    commit: {
        sha: string;
        url: string;
    };
    protected: boolean;
}

/**
 * GitHub repository
 */
export declare interface GitHubRepository {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    html_url: string;
    description?: string;
    default_branch: string;
}

/**
 * Health check response
 */
export declare interface HealthCheckResponse {
    status: 'healthy' | 'unhealthy';
    message?: string;
}

/**
 * HTTP client for making requests to the Coolify API
 */
export declare class HttpClient {
    private readonly baseUrl;
    private readonly token;
    private readonly timeout;
    constructor(config: CoolifyClientConfig);
    /**
     * Get default headers for requests
     */
    private getHeaders;
    /**
     * Build full URL from path
     */
    private buildUrl;
    /**
     * Handle error responses
     */
    private handleError;
    /**
     * Extract error message from response body
     */
    private extractErrorMessage;
    /**
     * Extract validation errors from response body
     */
    private extractValidationErrors;
    /**
     * Extract retry-after header value
     */
    private extractRetryAfter;
    /**
     * Make an HTTP request
     */
    request<T>(path: string, options?: RequestOptions): Promise<T>;
    /**
     * Make a GET request
     */
    get<T>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T>;
    /**
     * Make a POST request
     */
    post<T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T>;
    /**
     * Make a PUT request
     */
    put<T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T>;
    /**
     * Make a PATCH request
     */
    patch<T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T>;
    /**
     * Make a DELETE request
     */
    delete<T>(path: string, options?: Omit<RequestOptions, 'method'>): Promise<T>;
}

/**
 * HTTP methods supported by the SDK
 */
export declare type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * KeyDB specific fields
 */
export declare interface KeyDBDatabase extends Database {
    type: 'keydb';
    keydb_password?: string;
    keydb_conf?: string;
}

/**
 * List deployments response
 */
export declare interface ListDeploymentsResponse {
    deployments: Deployment[];
}

/**
 * List all resources response
 */
export declare interface ListResourcesResponse {
    applications?: Application[];
    databases?: AnyDatabase[];
    services?: Service[];
}

/**
 * Load branches response
 */
export declare interface LoadBranchesResponse {
    branches: GitHubBranch[];
}

/**
 * Load repositories response
 */
export declare interface LoadRepositoriesResponse {
    repositories: GitHubRepository[];
}

/**
 * MariaDB specific fields
 */
export declare interface MariaDBDatabase extends Database {
    type: 'mariadb';
    mariadb_user?: string;
    mariadb_password?: string;
    mariadb_database?: string;
    mariadb_root_password?: string;
    mariadb_conf?: string;
}

/**
 * Message response for operations
 */
export declare interface MessageResponse {
    message: string;
}

/**
 * MongoDB specific fields
 */
export declare interface MongoDBDatabase extends Database {
    type: 'mongodb';
    mongo_initdb_root_username?: string;
    mongo_initdb_root_password?: string;
    mongo_initdb_database?: string;
    mongo_conf?: string;
}

/**
 * MySQL specific fields
 */
export declare interface MySQLDatabase extends Database {
    type: 'mysql';
    mysql_user?: string;
    mysql_password?: string;
    mysql_database?: string;
    mysql_root_password?: string;
    mysql_conf?: string;
}

/**
 * Paginated API response
 */
export declare interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
}

/**
 * Common pagination parameters
 */
export declare interface PaginationParams {
    page?: number;
    per_page?: number;
}

/**
 * PostgreSQL specific fields
 */
export declare interface PostgreSQLDatabase extends Database {
    type: 'postgresql';
    postgres_user?: string;
    postgres_password?: string;
    postgres_db?: string;
    postgres_initdb_args?: string;
    postgres_host_auth_method?: string;
    postgres_conf?: string;
}

/**
 * Private key entity
 */
export declare interface PrivateKey extends Timestamps {
    id: number;
    uuid: UUID;
    name: string;
    description?: string;
    private_key: string;
    is_git_related?: boolean;
    team_id?: number;
}

/**
 * Private Keys resource for managing Coolify SSH keys
 */
export declare class PrivateKeysResource {
    private readonly http;
    constructor(http: HttpClient);
    /**
     * List all private keys
     */
    list(): Promise<PrivateKey[]>;
    /**
     * Get a specific private key by UUID
     */
    get(uuid: UUID): Promise<PrivateKey>;
    /**
     * Create a new private key
     */
    create(data: CreatePrivateKey): Promise<UuidResponse>;
    /**
     * Update a private key
     */
    update(uuid: UUID, data: UpdatePrivateKey): Promise<PrivateKey>;
    /**
     * Delete a private key
     */
    delete(uuid: UUID): Promise<MessageResponse>;
}

/**
 * Project entity
 */
export declare interface Project extends Timestamps {
    id: number;
    uuid: UUID;
    name: string;
    description?: string;
    environments?: ProjectEnvironment[];
}

/**
 * Project environment
 */
export declare interface ProjectEnvironment extends Timestamps {
    id: number;
    uuid: UUID;
    name: string;
    project_id: number;
    description?: string;
}

/**
 * Projects resource for managing Coolify projects
 */
export declare class ProjectsResource {
    private readonly http;
    constructor(http: HttpClient);
    /**
     * List all projects
     */
    list(): Promise<Project[]>;
    /**
     * Get a specific project by UUID
     */
    get(uuid: UUID): Promise<Project>;
    /**
     * Create a new project
     */
    create(data: CreateProject): Promise<UuidResponse>;
    /**
     * Update a project
     */
    update(uuid: UUID, data: UpdateProject): Promise<Project>;
    /**
     * Delete a project
     */
    delete(uuid: UUID): Promise<MessageResponse>;
    /**
     * List environments for a project
     */
    listEnvironments(projectUuid: UUID): Promise<ProjectEnvironment[]>;
    /**
     * Get a specific environment by name
     */
    getEnvironment(projectUuid: UUID, environmentName: string): Promise<EnvironmentWithResources>;
    /**
     * Create a new environment for a project
     */
    createEnvironment(projectUuid: UUID, data: CreateEnvironment): Promise<UuidResponse>;
    /**
     * Delete an environment
     */
    deleteEnvironment(projectUuid: UUID, environmentName: string): Promise<MessageResponse>;
}

/**
 * Redis specific fields
 */
export declare interface RedisDatabase extends Database {
    type: 'redis';
    redis_password?: string;
    redis_conf?: string;
}

/**
 * Options for HTTP requests
 */
export declare interface RequestOptions {
    method?: HttpMethod;
    body?: unknown;
    headers?: Record<string, string>;
    timeout?: number;
}

/**
 * Resources resource for listing all Coolify resources
 */
export declare class ResourcesResource {
    private readonly http;
    constructor(http: HttpClient);
    /**
     * List all resources (applications, databases, services)
     */
    list(): Promise<ListResourcesResponse>;
}

/**
 * Common status values
 */
export declare type ResourceStatus = 'running' | 'stopped' | 'starting' | 'stopping' | 'restarting' | 'exited' | 'degraded';

/**
 * Resource summary
 */
export declare interface ResourceSummary {
    uuid: string;
    name: string;
    type: ResourceType;
    status: string;
    project_uuid?: string;
    environment_name?: string;
}

/**
 * Generic resource type
 */
export declare type ResourceType = 'application' | 'database' | 'service';

/**
 * Server entity
 */
export declare interface Server extends Timestamps {
    id: number;
    uuid: UUID;
    name: string;
    description?: string;
    ip: string;
    port?: number;
    user?: string;
    private_key_id?: number;
    proxy_type?: 'traefik' | 'caddy' | 'nginx' | 'none';
    is_reachable?: boolean;
    is_usable?: boolean;
    is_build_server?: boolean;
    is_swarm_manager?: boolean;
    is_swarm_worker?: boolean;
    settings?: ServerSettings;
}

/**
 * Server domains
 */
export declare interface ServerDomains {
    domains: string[];
}

/**
 * Server resources
 */
export declare interface ServerResources {
    applications?: unknown[];
    databases?: unknown[];
    services?: unknown[];
}

/**
 * Server settings
 */
export declare interface ServerSettings {
    id: number;
    server_id: number;
    concurrent_builds?: number;
    dynamic_timeout?: number;
    is_build_server?: boolean;
    is_cloudflare_tunnel?: boolean;
    is_jump_server?: boolean;
    is_logdrain_axiom_enabled?: boolean;
    is_logdrain_custom_enabled?: boolean;
    is_logdrain_highlight_enabled?: boolean;
    is_logdrain_newrelic_enabled?: boolean;
    is_metrics_enabled?: boolean;
    is_reachable?: boolean;
    is_sentinel_enabled?: boolean;
    is_swarm_manager?: boolean;
    is_swarm_worker?: boolean;
    is_usable?: boolean;
}

/**
 * Servers resource for managing Coolify servers
 */
export declare class ServersResource {
    private readonly http;
    constructor(http: HttpClient);
    /**
     * List all servers
     */
    list(): Promise<Server[]>;
    /**
     * Get a specific server by UUID
     */
    get(uuid: UUID): Promise<Server>;
    /**
     * Create a new server
     */
    create(data: CreateServer): Promise<UuidResponse>;
    /**
     * Update a server
     */
    update(uuid: UUID, data: UpdateServer): Promise<Server>;
    /**
     * Delete a server
     */
    delete(uuid: UUID): Promise<MessageResponse>;
    /**
     * Get resources on a server
     */
    getResources(uuid: UUID): Promise<ServerResources>;
    /**
     * Get domains configured on a server
     */
    getDomains(uuid: UUID): Promise<ServerDomains>;
    /**
     * Validate a server connection
     */
    validate(uuid: UUID): Promise<ValidateServerResponse>;
}

/**
 * Server validation status
 */
export declare type ServerValidationStatus = 'reachable' | 'unreachable' | 'unknown';

/**
 * Service entity
 */
export declare interface Service extends Timestamps {
    id: number;
    uuid: UUID;
    name: string;
    description?: string;
    docker_compose_raw?: string;
    docker_compose?: string;
    status: ResourceStatus;
    destination_type?: string;
    destination_id?: number;
    environment_id: number;
    project_uuid?: UUID;
    environment_name?: string;
    server_id?: number;
    connect_to_docker_network?: boolean;
}

/**
 * Service environment variables response
 */
export declare interface ServiceEnvs {
    envs: EnvironmentVariable[];
}

/**
 * Services resource for managing Coolify services
 */
export declare class ServicesResource {
    private readonly http;
    constructor(http: HttpClient);
    /**
     * List all services
     */
    list(): Promise<Service[]>;
    /**
     * Get a specific service by UUID
     */
    get(uuid: UUID): Promise<Service>;
    /**
     * Create a new service
     */
    create(data: CreateService): Promise<UuidResponse>;
    /**
     * Update a service
     */
    update(uuid: UUID, data: UpdateService): Promise<Service>;
    /**
     * Delete a service
     */
    delete(uuid: UUID, deleteConfigurations?: boolean, deleteVolumes?: boolean): Promise<MessageResponse>;
    /**
     * List environment variables for a service
     */
    listEnvs(uuid: UUID): Promise<ServiceEnvs>;
    /**
     * Create an environment variable for a service
     */
    createEnv(uuid: UUID, data: CreateEnvironmentVariable): Promise<UuidResponse>;
    /**
     * Update an environment variable
     */
    updateEnv(uuid: UUID, envUuid: UUID, data: UpdateEnvironmentVariable): Promise<MessageResponse>;
    /**
     * Bulk update environment variables
     */
    bulkUpdateEnvs(uuid: UUID, data: BulkUpdateEnvironmentVariables): Promise<MessageResponse>;
    /**
     * Delete an environment variable
     */
    deleteEnv(uuid: UUID, envUuid: UUID): Promise<MessageResponse>;
    /**
     * Start a service
     */
    start(uuid: UUID): Promise<DeploymentResponse>;
    /**
     * Stop a service
     */
    stop(uuid: UUID): Promise<MessageResponse>;
    /**
     * Restart a service
     */
    restart(uuid: UUID): Promise<DeploymentResponse>;
}

/**
 * Predefined service type
 */
export declare interface ServiceType {
    name: string;
    description?: string;
    logo?: string;
    minversion?: string;
    documentation?: string;
}

/**
 * System resource for Coolify system operations
 */
export declare class SystemResource {
    private readonly http;
    constructor(http: HttpClient);
    /**
     * Get the Coolify version
     */
    version(): Promise<VersionResponse>;
    /**
     * Check the health of the Coolify API
     */
    healthCheck(): Promise<HealthCheckResponse>;
    /**
     * Enable the Coolify API
     */
    enableApi(): Promise<ToggleApiResponse>;
    /**
     * Disable the Coolify API
     */
    disableApi(): Promise<ToggleApiResponse>;
}

/**
 * Team entity
 */
export declare interface Team extends Timestamps {
    id: number;
    uuid: UUID;
    name: string;
    description?: string;
    personal_team?: boolean;
    members?: TeamMember[];
}

/**
 * Team member
 */
export declare interface TeamMember extends Timestamps {
    id: number;
    uuid: UUID;
    name: string;
    email: string;
}

/**
 * Team members response
 */
export declare interface TeamMembersResponse {
    members: TeamMember[];
}

/**
 * Teams resource for managing Coolify teams
 */
export declare class TeamsResource {
    private readonly http;
    constructor(http: HttpClient);
    /**
     * List all teams
     */
    list(): Promise<Team[]>;
    /**
     * Get a specific team by ID
     */
    get(id: number): Promise<Team>;
    /**
     * Get the current team
     */
    current(): Promise<Team>;
    /**
     * Get members of a team
     */
    getMembers(id: number): Promise<TeamMember[]>;
    /**
     * Get members of the current team
     */
    getCurrentMembers(): Promise<TeamMember[]>;
}

/**
 * Common timestamp fields
 */
export declare interface Timestamps {
    created_at: string;
    updated_at: string;
}

/**
 * Enable/Disable API response
 */
export declare interface ToggleApiResponse {
    message: string;
}

/**
 * Update application input
 */
export declare interface UpdateApplication {
    name?: string;
    description?: string;
    domains?: string;
    git_repository?: string;
    git_branch?: string;
    git_commit_sha?: string;
    docker_registry_image_name?: string;
    docker_registry_image_tag?: string;
    build_pack?: BuildPack;
    static_image?: string;
    install_command?: string;
    build_command?: string;
    start_command?: string;
    ports_exposes?: string;
    ports_mappings?: string;
    base_directory?: string;
    publish_directory?: string;
    dockerfile?: string;
    dockerfile_location?: string;
    dockerfile_target_build?: string;
    docker_compose_location?: string;
    docker_compose_custom_start_command?: string;
    docker_compose_custom_build_command?: string;
    docker_compose_domains?: string;
    docker_compose?: string;
    custom_labels?: string;
    custom_docker_run_options?: string;
    post_deployment_command?: string;
    post_deployment_command_container?: string;
    pre_deployment_command?: string;
    pre_deployment_command_container?: string;
    watch_paths?: string;
    redirect?: string;
    instant_deploy?: boolean;
    health_check_enabled?: boolean;
    health_check_path?: string;
    health_check_port?: string;
    health_check_host?: string;
    health_check_method?: string;
    health_check_return_code?: number;
    health_check_scheme?: string;
    health_check_response_text?: string;
    health_check_interval?: number;
    health_check_timeout?: number;
    health_check_retries?: number;
    health_check_start_period?: number;
    limits_memory?: string;
    limits_memory_swap?: string;
    limits_memory_swappiness?: number;
    limits_memory_reservation?: string;
    limits_cpus?: string;
    limits_cpuset?: string;
    limits_cpu_shares?: number;
}

/**
 * Update database input
 */
export declare interface UpdateDatabase {
    name?: string;
    description?: string;
    image?: string;
    is_public?: boolean;
    public_port?: number;
    limits_memory?: string;
    limits_memory_swap?: string;
    limits_memory_swappiness?: number;
    limits_memory_reservation?: string;
    limits_cpus?: string;
    limits_cpuset?: string;
    limits_cpu_shares?: number;
}

/**
 * Update environment input
 */
export declare interface UpdateEnvironment {
    name?: string;
    description?: string;
}

/**
 * Update environment variable input
 */
export declare interface UpdateEnvironmentVariable {
    key?: string;
    value?: string;
    is_build_time?: boolean;
    is_preview?: boolean;
    is_literal?: boolean;
    is_multiline?: boolean;
    is_shown_once?: boolean;
}

/**
 * Update GitHub App input
 */
export declare interface UpdateGitHubApp {
    name?: string;
    organization?: string;
    app_id?: number;
    installation_id?: number;
    client_id?: string;
    client_secret?: string;
    webhook_secret?: string;
    private_key?: string;
    is_system_wide?: boolean;
}

/**
 * Update private key input
 */
export declare interface UpdatePrivateKey {
    name?: string;
    description?: string;
    private_key?: string;
}

/**
 * Update project input
 */
export declare interface UpdateProject {
    name?: string;
    description?: string;
}

/**
 * Update server input
 */
export declare interface UpdateServer {
    name?: string;
    description?: string;
    ip?: string;
    port?: number;
    user?: string;
    private_key_uuid?: UUID;
    is_build_server?: boolean;
}

/**
 * Update service input
 */
export declare interface UpdateService {
    name?: string;
    description?: string;
    docker_compose_raw?: string;
}

/**
 * UUID type for resource identifiers
 */
export declare type UUID = string;

/**
 * UUID response for creation operations
 */
export declare interface UuidResponse {
    uuid: string;
}

/**
 * Validate server response
 */
export declare interface ValidateServerResponse {
    message: string;
    status: ServerValidationStatus;
}

/**
 * System version response
 */
export declare interface VersionResponse {
    version: string;
}

export { }
