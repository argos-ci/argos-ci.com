import type { NextRequest } from "next/server";

import { getPendingPaths } from "@/lib/api/schedule";

export const dynamic = "force-dynamic";

/**
 * Publishes scheduled content. Articles and changelog entries dated in the
 * future are left out of the production build (see lib/api/schedule.ts); a
 * Vercel Cron Job (vercel.json) calls this route from 00:05 UTC, hourly until
 * 06:05, and it triggers a production deployment when content whose date has
 * elapsed is not live yet. Vercel crons are best effort and never retried, so
 * the later runs are retries: once the content is live, they do nothing.
 *
 * Requires two environment variables on the Vercel production environment:
 * - CRON_SECRET: Vercel sends it as a bearer token with each cron invocation.
 * - VERCEL_DEPLOY_HOOK_URL: a Deploy Hook on the `main` branch (Project
 *   Settings > Git > Deploy Hooks).
 *
 * The "Publish scheduled articles" GitHub workflow runs the same check daily
 * as a backstop.
 */
export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (
    !cronSecret ||
    request.headers.get("authorization") !== `Bearer ${cronSecret}`
  ) {
    return new Response("Unauthorized", { status: 401 });
  }

  const pending = await getPendingPaths();
  if (pending.length === 0) {
    return Response.json({ pending, deployed: false });
  }

  const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (!deployHookUrl) {
    throw new Error("VERCEL_DEPLOY_HOOK_URL is not set");
  }
  const response = await fetch(deployHookUrl, { method: "POST" });
  if (!response.ok) {
    throw new Error(`Deploy hook failed: ${response.status}`);
  }
  console.log(`Deploying to publish: ${pending.join(", ")}`);
  return Response.json({ pending, deployed: true });
}
