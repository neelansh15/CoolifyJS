import type { HttpClient } from '../http';
import type {
  NotificationSettings,
  UpdateNotificationSettings,
} from '../types/notifications';

/**
 * Notifications resource for managing team notification channels.
 *
 * Each channel (email, Discord, Slack, Telegram, Pushover, webhook) exposes
 * a getter and an updater. Encrypted secrets are only surfaced to admins
 * on tokens with the `read:sensitive` scope.
 */
export class NotificationsResource {
  constructor(private readonly http: HttpClient) {}

  /** Get email notification settings for the current team. */
  async getEmail(): Promise<NotificationSettings> {
    return this.http.get<NotificationSettings>('/notifications/email');
  }

  /** Update email notification settings for the current team. */
  async updateEmail(data: UpdateNotificationSettings): Promise<NotificationSettings> {
    return this.http.patch<NotificationSettings>('/notifications/email', data);
  }

  /** Get Discord notification settings for the current team. */
  async getDiscord(): Promise<NotificationSettings> {
    return this.http.get<NotificationSettings>('/notifications/discord');
  }

  /** Update Discord notification settings for the current team. */
  async updateDiscord(data: UpdateNotificationSettings): Promise<NotificationSettings> {
    return this.http.patch<NotificationSettings>('/notifications/discord', data);
  }

  /** Get Slack notification settings for the current team. */
  async getSlack(): Promise<NotificationSettings> {
    return this.http.get<NotificationSettings>('/notifications/slack');
  }

  /** Update Slack notification settings for the current team. */
  async updateSlack(data: UpdateNotificationSettings): Promise<NotificationSettings> {
    return this.http.patch<NotificationSettings>('/notifications/slack', data);
  }

  /** Get Telegram notification settings for the current team. */
  async getTelegram(): Promise<NotificationSettings> {
    return this.http.get<NotificationSettings>('/notifications/telegram');
  }

  /** Update Telegram notification settings for the current team. */
  async updateTelegram(data: UpdateNotificationSettings): Promise<NotificationSettings> {
    return this.http.patch<NotificationSettings>('/notifications/telegram', data);
  }

  /** Get Pushover notification settings for the current team. */
  async getPushover(): Promise<NotificationSettings> {
    return this.http.get<NotificationSettings>('/notifications/pushover');
  }

  /** Update Pushover notification settings for the current team. */
  async updatePushover(data: UpdateNotificationSettings): Promise<NotificationSettings> {
    return this.http.patch<NotificationSettings>('/notifications/pushover', data);
  }

  /** Get webhook notification settings for the current team. */
  async getWebhook(): Promise<NotificationSettings> {
    return this.http.get<NotificationSettings>('/notifications/webhook');
  }

  /** Update webhook notification settings for the current team. */
  async updateWebhook(data: UpdateNotificationSettings): Promise<NotificationSettings> {
    return this.http.patch<NotificationSettings>('/notifications/webhook', data);
  }
}
