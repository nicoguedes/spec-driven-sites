'use client';

import { useEffect } from 'react';

/**
 * Error monitoring — env-gated and a NO-OP unless a DSN is provided.
 *
 *   NEXT_PUBLIC_ERROR_DSN=<your provider DSN>
 *
 * A DSN is a secret and MUST come from the environment — never hardcode one in
 * source (that's how DSNs leak in public repos). When unset, nothing initializes
 * and `captureError` just logs to the console.
 *
 * This file deliberately ships NO monitoring SDK dependency. To actually report
 * errors, install your provider's browser SDK (e.g. @sentry/browser) and replace
 * the marked TODO with its `init()` / `captureException()` calls, reading the DSN
 * from `dsn` below.
 */

const dsn = process.env.NEXT_PUBLIC_ERROR_DSN || null;
let initialized = false;

/** Mount once near the root. No-op without NEXT_PUBLIC_ERROR_DSN. */
export function ErrorMonitor() {
  useEffect(() => {
    if (initialized || !dsn) return;
    initialized = true;
    // TODO: initialize your monitoring SDK here using `dsn`, e.g.:
    //   import * as Sentry from '@sentry/browser';
    //   Sentry.init({ dsn, environment: location.hostname === 'localhost' ? 'dev' : 'production' });
  }, []);
  return null;
}

/** Call in catch blocks. Logs locally; forwards to the SDK if one is wired up. */
export function captureError(err: unknown, context?: Record<string, string>) {
  // eslint-disable-next-line no-console
  console.error(err, context);
  if (!dsn) return;
  // TODO: forward to your monitoring SDK, e.g. Sentry.captureException(err, { tags: context }).
}
