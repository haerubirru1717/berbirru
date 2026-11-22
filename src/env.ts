export interface Env {
  DB: D1Database;
  MEDIA: R2Bucket;
  APP_NAME: string;
  APP_DOMAIN: string;
  RESEND_API_KEY?: string;
  RESEND_FROM?: string;
  TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  OWNER_EMAIL?: string;
  KERN_THEME_PRESET?: string;
}
