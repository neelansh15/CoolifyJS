import type { UUID, Timestamps, ResourceStatus } from './common';

/**
 * Supported database types
 */
export type DatabaseType =
  | 'postgresql'
  | 'mysql'
  | 'mariadb'
  | 'mongodb'
  | 'redis'
  | 'dragonfly'
  | 'keydb'
  | 'clickhouse';

/**
 * Base database entity
 */
export interface Database extends Timestamps {
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
 * PostgreSQL specific fields
 */
export interface PostgreSQLDatabase extends Database {
  type: 'postgresql';
  postgres_user?: string;
  postgres_password?: string;
  postgres_db?: string;
  postgres_initdb_args?: string;
  postgres_host_auth_method?: string;
  postgres_conf?: string;
}

/**
 * MySQL specific fields
 */
export interface MySQLDatabase extends Database {
  type: 'mysql';
  mysql_user?: string;
  mysql_password?: string;
  mysql_database?: string;
  mysql_root_password?: string;
  mysql_conf?: string;
}

/**
 * MariaDB specific fields
 */
export interface MariaDBDatabase extends Database {
  type: 'mariadb';
  mariadb_user?: string;
  mariadb_password?: string;
  mariadb_database?: string;
  mariadb_root_password?: string;
  mariadb_conf?: string;
}

/**
 * MongoDB specific fields
 */
export interface MongoDBDatabase extends Database {
  type: 'mongodb';
  mongo_initdb_root_username?: string;
  mongo_initdb_root_password?: string;
  mongo_initdb_database?: string;
  mongo_conf?: string;
}

/**
 * Redis specific fields
 */
export interface RedisDatabase extends Database {
  type: 'redis';
  redis_password?: string;
  redis_conf?: string;
}

/**
 * Dragonfly specific fields
 */
export interface DragonflyDatabase extends Database {
  type: 'dragonfly';
  dragonfly_password?: string;
}

/**
 * KeyDB specific fields
 */
export interface KeyDBDatabase extends Database {
  type: 'keydb';
  keydb_password?: string;
  keydb_conf?: string;
}

/**
 * ClickHouse specific fields
 */
export interface ClickHouseDatabase extends Database {
  type: 'clickhouse';
  clickhouse_user?: string;
  clickhouse_password?: string;
  clickhouse_database?: string;
}

/**
 * Union type for all database types
 */
export type AnyDatabase =
  | PostgreSQLDatabase
  | MySQLDatabase
  | MariaDBDatabase
  | MongoDBDatabase
  | RedisDatabase
  | DragonflyDatabase
  | KeyDBDatabase
  | ClickHouseDatabase;

/**
 * Base create database input
 */
interface BaseCreateDatabase {
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
 * Create PostgreSQL database input
 */
export interface CreatePostgreSQLDatabase extends BaseCreateDatabase {
  postgres_user?: string;
  postgres_password?: string;
  postgres_db?: string;
  postgres_initdb_args?: string;
  postgres_host_auth_method?: string;
  postgres_conf?: string;
}

/**
 * Create MySQL database input
 */
export interface CreateMySQLDatabase extends BaseCreateDatabase {
  mysql_user?: string;
  mysql_password?: string;
  mysql_database?: string;
  mysql_root_password?: string;
  mysql_conf?: string;
}

/**
 * Create MariaDB database input
 */
export interface CreateMariaDBDatabase extends BaseCreateDatabase {
  mariadb_user?: string;
  mariadb_password?: string;
  mariadb_database?: string;
  mariadb_root_password?: string;
  mariadb_conf?: string;
}

/**
 * Create MongoDB database input
 */
export interface CreateMongoDBDatabase extends BaseCreateDatabase {
  mongo_initdb_root_username?: string;
  mongo_initdb_root_password?: string;
  mongo_initdb_database?: string;
  mongo_conf?: string;
}

/**
 * Create Redis database input
 */
export interface CreateRedisDatabase extends BaseCreateDatabase {
  redis_password?: string;
  redis_conf?: string;
}

/**
 * Create Dragonfly database input
 */
export interface CreateDragonflyDatabase extends BaseCreateDatabase {
  dragonfly_password?: string;
}

/**
 * Create KeyDB database input
 */
export interface CreateKeyDBDatabase extends BaseCreateDatabase {
  keydb_password?: string;
  keydb_conf?: string;
}

/**
 * Create ClickHouse database input
 */
export interface CreateClickHouseDatabase extends BaseCreateDatabase {
  clickhouse_user?: string;
  clickhouse_password?: string;
  clickhouse_database?: string;
}

/**
 * Update database input
 */
export interface UpdateDatabase {
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
 * Database backup entity
 */
export interface DatabaseBackup extends Timestamps {
  id: number;
  uuid: UUID;
  database_id: number;
  database_type: DatabaseType;
  status: 'pending' | 'success' | 'failed';
  filename?: string;
  size?: number;
}

/**
 * Create database backup input
 */
export interface CreateDatabaseBackup {
  /** S3 storage uuid if using external storage */
  s3_uuid?: UUID;
}
