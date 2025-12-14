import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { createAuthClient } from 'better-auth/react';

import { db } from '@/lib/db';

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
});

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL!,
});
