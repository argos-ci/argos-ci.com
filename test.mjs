import { existsSync, readFileSync } from "node:fs";

const { env } = process;

function readEventPayload() {
  if (!env.GITHUB_EVENT_PATH) {
    throw new Error("GITHUB_EVENT_PATH not defined");
  }
  if (!existsSync(env.GITHUB_EVENT_PATH)) {
    throw new Error(`No event found at ${env.GITHUB_EVENT_PATH}`);
  }
  return JSON.parse(readFileSync(env.GITHUB_EVENT_PATH, "utf-8"));
}

console.log(JSON.stringify(readEventPayload(), null, 2));
