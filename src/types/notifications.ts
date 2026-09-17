/**
 * Coolify supports six team-scoped notification channels. Each channel exposes
 * GET/PATCH endpoints for reading and updating settings. Payloads are treated
 * as loose records because the underlying schema varies and evolves per channel;
 * consumers can pass any subset of provider-specific fields.
 */
export type NotificationChannel =
  | 'email'
  | 'discord'
  | 'slack'
  | 'telegram'
  | 'pushover'
  | 'webhook';

/**
 * Generic notification settings payload. Encrypted secrets are only
 * returned when the API token has the `read:sensitive` (or `root`) scope
 * and the caller is a team admin/owner.
 */
export type NotificationSettings = Record<string, unknown>;

/**
 * Generic update payload for notification settings.
 */
export type UpdateNotificationSettings = Record<string, unknown>;
