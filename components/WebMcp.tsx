"use client";

import * as React from "react";

import {
  ARGOS_HOBBY_SCREENSHOT_COUNT,
  ARGOS_PRO_FLAT_PRICE,
  ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
  ARGOS_SCREENSHOT_PRICE,
  ARGOS_STORYBOOK_SCREENSHOT_PRICE,
} from "@/lib/constants";

/**
 * WebMCP (https://webmachinelearning.github.io/webmcp/): expose the site's
 * key information as tools to browser-embedded AI agents. No-op in browsers
 * without `navigator.modelContext`.
 */

type ToolContent = { type: "text"; text: string };

type WebMcpTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (args: Record<string, unknown>) => Promise<{
    content: ToolContent[];
  }>;
};

type ModelContext = {
  registerTool?: (tool: WebMcpTool) => { unregister?: () => void } | void;
  provideContext?: (context: { tools: WebMcpTool[] }) => void;
};

const NO_ARGS_SCHEMA = {
  type: "object",
  properties: {},
  additionalProperties: false,
};

function text(content: string): { content: ToolContent[] } {
  return { content: [{ type: "text", text: content }] };
}

async function fetchText(url: string, accept?: string): Promise<string> {
  const response = await fetch(url, {
    headers: accept ? { accept } : undefined,
  });
  if (!response.ok) {
    throw new Error(`Fetching ${url} failed with status ${response.status}`);
  }
  return response.text();
}

const tools: WebMcpTool[] = [
  {
    name: "get_argos_overview",
    description:
      "Get an overview of Argos (visual testing platform): what it does, integrations, and links to docs, API, and MCP server, as markdown.",
    inputSchema: NO_ARGS_SCHEMA,
    execute: async () => text(await fetchText("/llms.txt")),
  },
  {
    name: "get_pricing",
    description:
      "Get Argos pricing. Optionally pass screenshotsPerMonth to estimate the monthly cost of the Pro plan for that usage.",
    inputSchema: {
      type: "object",
      properties: {
        screenshotsPerMonth: {
          type: "number",
          description: "Expected number of screenshots uploaded per month.",
        },
      },
      additionalProperties: false,
    },
    execute: async (args) => {
      const lines = [
        `Hobby: free, up to ${ARGOS_HOBBY_SCREENSHOT_COUNT.toLocaleString("en-US")} screenshots/month.`,
        `Pro: $${ARGOS_PRO_FLAT_PRICE}/month flat, includes ${ARGOS_PRO_FLAT_SCREENSHOT_COUNT.toLocaleString("en-US")} screenshots, then $${ARGOS_SCREENSHOT_PRICE} per extra screenshot ($${ARGOS_STORYBOOK_SCREENSHOT_PRICE} for Storybook screenshots).`,
        `Enterprise: custom volume, SLA, and SSO — https://argos-ci.com/contact/sale.`,
      ];
      const count = args.screenshotsPerMonth;
      if (typeof count === "number" && Number.isFinite(count) && count >= 0) {
        const extra = Math.max(0, count - ARGOS_PRO_FLAT_SCREENSHOT_COUNT);
        const price = ARGOS_PRO_FLAT_PRICE + extra * ARGOS_SCREENSHOT_PRICE;
        lines.push(
          `Estimate for ${count.toLocaleString("en-US")} screenshots/month on Pro: $${price.toFixed(2)}/month.`,
        );
      }
      lines.push("Details: https://argos-ci.com/pricing");
      return text(lines.join("\n"));
    },
  },
  {
    name: "get_latest_changelog",
    description:
      "Get the Argos changelog (recent product updates and new features) as markdown.",
    inputSchema: NO_ARGS_SCHEMA,
    execute: async () => text(await fetchText("/changelog", "text/markdown")),
  },
  {
    name: "get_mcp_connection_info",
    description:
      "How to connect an AI agent to Argos: MCP server endpoint, authentication methods, and API endpoints.",
    inputSchema: NO_ARGS_SCHEMA,
    execute: async () => text(await fetchText("/auth.md")),
  },
];

export function WebMcp() {
  React.useEffect(() => {
    const modelContext = (
      navigator as Navigator & { modelContext?: ModelContext }
    ).modelContext;
    if (!modelContext) {
      return undefined;
    }
    if (typeof modelContext.registerTool === "function") {
      const registrations = tools.map((tool) =>
        modelContext.registerTool!(tool),
      );
      return () => {
        for (const registration of registrations) {
          registration?.unregister?.();
        }
      };
    }
    if (typeof modelContext.provideContext === "function") {
      modelContext.provideContext({ tools });
    }
    return undefined;
  }, []);
  return null;
}
