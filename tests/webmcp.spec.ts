import { expect, type Page, test } from "@playwright/test";

/**
 * The WebMCP tools (components/WebMcp.tsx) register against
 * `document.modelContext`, which only exists in Chrome with the origin trial
 * or the WebMCP flag. Playwright's Chromium has neither, so these tests
 * install a stub before the page loads and check what the site registers.
 * That is the failure mode a browser can't show: a wrong property name or a
 * throwing tool means agents silently get nothing.
 */

type RegisteredTool = {
  name: string;
  description: string;
  inputSchema: { type?: string };
  annotations?: { readOnlyHint?: boolean };
  execute: (
    input: Record<string, unknown>,
    options?: { signal?: AbortSignal },
  ) => Promise<{ content: { type: string; text: string }[] }>;
};

declare global {
  interface Window {
    __webmcpTools?: RegisteredTool[];
  }
}

const EXPECTED_TOOLS = [
  "compare_with",
  "estimate_monthly_cost",
  "get_argos_overview",
  "get_docs_page",
  "get_latest_changelog",
  "get_mcp_connection_info",
  "get_page",
  "get_pricing",
  "get_quickstart",
  "get_security_compliance",
  "get_service_status",
  "search_docs",
];

/** A minimal ModelContext, installed where the spec (or old Chrome) puts it. */
function installModelContext(page: Page, target: "document" | "navigator") {
  return page.addInitScript((target) => {
    const tools: RegisteredTool[] = [];
    const modelContext = {
      registerTool(tool: RegisteredTool, options?: { signal?: AbortSignal }) {
        tools.push(tool);
        options?.signal?.addEventListener("abort", () => {
          const index = tools.indexOf(tool);
          if (index !== -1) {
            tools.splice(index, 1);
          }
        });
      },
      getTools: () => tools,
    };
    Object.defineProperty(
      target === "document" ? document : navigator,
      "modelContext",
      { value: modelContext, configurable: true },
    );
    window.__webmcpTools = tools;
  }, target);
}

function readToolNames(page: Page) {
  return page.evaluate(() =>
    (window.__webmcpTools ?? []).map((tool) => tool.name).sort(),
  );
}

async function openWithTools(
  page: Page,
  path: string,
  target: "document" | "navigator" = "document",
) {
  await installModelContext(page, target);
  await page.goto(path);
  await expect.poll(() => readToolNames(page)).toEqual(EXPECTED_TOOLS);
}

/** Run a registered tool in the page and return its text output. */
function runTool(
  page: Page,
  name: string,
  input: Record<string, unknown> = {},
) {
  return page.evaluate(
    async ([name, input]) => {
      const tool = (window.__webmcpTools ?? []).find(
        (tool) => tool.name === name,
      );
      if (!tool) {
        throw new Error(`Tool ${name} is not registered`);
      }
      const result = await tool.execute(input);
      return result.content.map((content) => content.text).join("\n");
    },
    [name, input] as const,
  );
}

const DOCS_INDEX = `# Argos Docs

## Documentation

- [Overview](https://argos-ci.com/docs/overview.md): Learn how Argos works and where to start.
- [Playwright Quickstart](https://argos-ci.com/docs/quickstart/playwright-quickstart.md): Set up visual testing in your Playwright tests with the Argos Playwright SDK.
- [Cypress Quickstart](https://argos-ci.com/docs/quickstart/cypress-quickstart.md): Set up visual testing in your Cypress tests with the Argos Cypress SDK.
- [Baseline build](https://argos-ci.com/docs/learn/platform-fundamentals/baseline-build.md): Argos compares screenshots to a chosen baseline build.
`;

test.describe("WebMCP tools", () => {
  test("registers every tool on document.modelContext, read-only", async ({
    page,
  }) => {
    await openWithTools(page, "/pricing");
    const tools = await page.evaluate(() =>
      (window.__webmcpTools ?? []).map((tool) => ({
        name: tool.name,
        description: tool.description,
        schemaType: tool.inputSchema.type,
        readOnly: tool.annotations?.readOnlyHint,
      })),
    );
    for (const tool of tools) {
      expect(tool.readOnly, tool.name).toBe(true);
      expect(tool.schemaType, tool.name).toBe("object");
      expect(tool.description.length, tool.name).toBeGreaterThan(40);
    }
  });

  test("still registers through the deprecated navigator.modelContext", async ({
    page,
  }) => {
    await openWithTools(page, "/", "navigator");
  });

  test("estimate_monthly_cost prices like the pricing slider", async ({
    page,
  }) => {
    await openWithTools(page, "/pricing");
    const estimate = await runTool(page, "estimate_monthly_cost", {
      screenshots: 50_000,
      storybookScreenshots: 10_000,
      githubSso: true,
    });
    // $100 flat + 15,000 extra × $0.004 + 10,000 Storybook × $0.0015 + $50 SSO.
    expect(estimate).toContain("Estimated total on Pro: $225/month");
    expect(estimate).toContain("GitHub Single Sign-On add-on: $50/month");

    const hobby = await runTool(page, "estimate_monthly_cost", {
      screenshots: 1_000,
      mediaVideos: 10,
    });
    expect(hobby).toContain("250 screenshots");
    expect(hobby).toContain("Hobby plan: free");
  });

  test("get_page, compare_with and get_security_compliance read the markdown twins", async ({
    page,
  }) => {
    await openWithTools(page, "/");
    expect(await runTool(page, "get_page", { path: "/pricing" })).toContain(
      "# Argos Pricing",
    );
    expect(
      await runTool(page, "get_page", { path: "https://argos-ci.com/terms" }),
    ).toContain("# Terms of service");
    expect(await runTool(page, "get_page", { path: "/about" })).toContain(
      "has no markdown version",
    );

    const percy = await runTool(page, "compare_with", { competitor: "percy" });
    expect(percy).toContain("# Percy vs Argos");
    expect(percy).toContain("| Feature | Argos | Percy |");
    expect(percy).toContain("## Pricing");
    expect(percy).toContain("## Frequently asked questions");

    const security = await runTool(page, "get_security_compliance");
    expect(security).toContain("# Security you can audit");
    expect(security).toContain("SOC 2 Type II");
  });

  test("search_docs ranks the documentation index and get_docs_page reads a page", async ({
    page,
  }) => {
    await page.route("**/docs/llms.txt", (route) =>
      route.fulfill({ contentType: "text/markdown", body: DOCS_INDEX }),
    );
    await page.route("**/docs/quickstart/playwright-quickstart.md", (route) =>
      route.fulfill({
        contentType: "text/markdown",
        body: "# Playwright Quickstart\n\nInstall @argos-ci/playwright.",
      }),
    );
    await openWithTools(page, "/");

    const results = await runTool(page, "search_docs", {
      query: "playwright quickstart",
    });
    const first = results.split("\n").find((line) => line.startsWith("- "));
    expect(first).toContain("Playwright Quickstart");
    expect(first).not.toContain("Cypress");

    expect(
      await runTool(page, "get_docs_page", {
        path: "https://argos-ci.com/docs/quickstart/playwright-quickstart",
      }),
    ).toContain("# Playwright Quickstart");
    expect(
      await runTool(page, "get_quickstart", { framework: "playwright" }),
    ).toContain("Install @argos-ci/playwright");
    expect(
      await runTool(page, "get_page", {
        path: "/docs/quickstart/playwright-quickstart.md",
      }),
    ).toContain("# Playwright Quickstart");
  });

  test("get_service_status reports the status API", async ({ page }) => {
    await page.route("**/api/openstatus", (route) =>
      route.fulfill({ json: { status: "operational" } }),
    );
    await openWithTools(page, "/");
    expect(await runTool(page, "get_service_status")).toContain(
      "All systems operational",
    );
  });
});
