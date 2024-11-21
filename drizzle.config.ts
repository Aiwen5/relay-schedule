import type { Config } from 'drizzle-kit';
import { config } from './database/client';

export default {
  dialect: 'turso',
  schema: './database/schema/*',
  out: './drizzle',
  dbCredentials: config,
} satisfies Config;
