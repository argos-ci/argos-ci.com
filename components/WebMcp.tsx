"use client";

import * as React from "react";

import { WEBMCP_TOOLS, type WebMcpTool } from "@/lib/webmcp-tools";

/**
 * WebMCP (https://webmachinelearning.github.io/webmcp/): expose the site's
 * key information as read-only tools to browser-embedded AI agents.
 *
 * The API lives on `document.modelContext`. `navigator.modelContext` is the
 * original name, which Chrome 150 kept as a deprecated alias and Chrome 153
 * drops, so it is only a fallback. Chrome exposes the API behind
 * chrome://flags/#enable-webmcp-testing or an origin trial token (see
 * app/layout.tsx); everywhere else this is a no-op. Inspect the registered
 * tools in DevTools → Application → WebMCP.
 */

type ModelContext = {
  registerTool?: (
    tool: WebMcpTool,
    options?: { signal?: AbortSignal },
  ) => unknown;
  /** Early implementations, before registration took an abort signal. */
  unregisterTool?: (name: string) => void;
  /** Early implementations, which took the whole tool list at once. */
  provideContext?: (context: { tools: WebMcpTool[] }) => void;
};

type WithModelContext = { modelContext?: ModelContext };

function getModelContext(): ModelContext | undefined {
  return (
    (document as Document & WithModelContext).modelContext ??
    (navigator as Navigator & WithModelContext).modelContext
  );
}

export function WebMcp() {
  React.useEffect(() => {
    const modelContext = getModelContext();
    if (!modelContext) {
      return undefined;
    }
    if (typeof modelContext.registerTool === "function") {
      const controller = new AbortController();
      for (const tool of WEBMCP_TOOLS) {
        modelContext.registerTool(tool, { signal: controller.signal });
      }
      return () => {
        controller.abort();
        if (typeof modelContext.unregisterTool === "function") {
          for (const tool of WEBMCP_TOOLS) {
            try {
              modelContext.unregisterTool(tool.name);
            } catch {
              // Already gone through the signal.
            }
          }
        }
      };
    }
    if (typeof modelContext.provideContext === "function") {
      modelContext.provideContext({ tools: WEBMCP_TOOLS });
    }
    return undefined;
  }, []);
  return null;
}
