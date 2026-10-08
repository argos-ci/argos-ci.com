import { expect, test } from "@playwright/test";

/**
 * The publish cron can trigger a production deployment: only Vercel Cron,
 * which sends CRON_SECRET as a bearer token, may call it.
 */
test.describe("Publish scheduled content cron", () => {
  test("rejects requests without the cron secret", async ({ request }) => {
    const response = await request.get("/api/cron/publish-scheduled");
    expect(response.status()).toBe(401);
  });

  test("rejects requests with a wrong cron secret", async ({ request }) => {
    const response = await request.get("/api/cron/publish-scheduled", {
      headers: { authorization: "Bearer wrong" },
    });
    expect(response.status()).toBe(401);
  });
});
