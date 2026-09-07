import { markdownHeaders } from "@/lib/agents";
import { PILLARS } from "@/lib/pillars";
import { WEBMCP_TOOLS } from "@/lib/webmcp-tools";

export const dynamic = "force-static";

const pillarBullets = PILLARS.map(
  (pillar) =>
    `- [${pillar.name}](https://argos-ci.com${pillar.href}): ${pillar.description}`,
).join("\n");

const webMcpToolNames = WEBMCP_TOOLS.map((tool) => tool.name).join(", ");

/**
 * llms.txt (https://llmstxt.org/): a curated markdown map of Argos for AI
 * agents. The documentation has its own, exhaustive /docs/llms.txt (served by
 * GitBook); this one covers the whole site and points to the machine-readable
 * surfaces.
 */
const llmsTxt = `# Argos

> Argos follows every pull request through four steps. Deploy: free preview URLs for your Storybook or static site on every PR. Diff: deterministic diffs of any file, not just pixels — screenshots, Markdown, JSON, YAML, HTML, ARIA snapshots. Review: one place for humans and agents to approve what changed, with the verdict on the PR. Stabilize: kill flakes and debug failures with full per-test history. Everything is reachable from the CLI, the MCP server and the REST API, so AI agents use it end to end.

Pages on argos-ci.com are also available as markdown: send \`Accept: text/markdown\` and the response is \`Content-Type: text/markdown\` (HTML stays the default), or read \`/md/<path>\` directly.

## Product

- [Homepage](https://argos-ci.com/): product overview
${pillarBullets}
- [For AI agents](https://argos-ci.com/ai-agents): MCP server, CLI, agent skills, REST API, and how agents use each pillar
- [Media sharing](https://argos-ci.com/media-sharing): standalone image and video upload with share links, ready-to-paste Markdown, and automatic pull request comments
- [Pricing](https://argos-ci.com/pricing): Hobby (free) and Pro plans

## Documentation

- [Documentation](https://argos-ci.com/docs): guides, SDK references, and concepts
- [Documentation for LLMs](https://argos-ci.com/docs/llms.txt): the full docs map in markdown (every docs page also exists as .md)
- [API reference](https://argos-ci.com/docs/api-reference): the Argos REST API at https://api.argos-ci.com/v2
- [OpenAPI description](https://api.argos-ci.com/v2/openapi.yaml): machine-readable API spec
- [Agents](https://argos-ci.com/docs/agents): MCP server, CLI, and agent skills

## Agent surfaces

- [Argos for AI agents](https://argos-ci.com/ai-agents): the entry point for agents, with the commands for each pillar
- [MCP server](https://argos-ci.com/docs/agents/mcp-server): official remote MCP server at https://mcp.argos-ci.com (Streamable HTTP, OAuth or personal access token)
- [Agent skills](https://argos-ci.com/docs/agents/agent-skills): \`npx skills add https://argos-ci.com\` installs the argos-cli, argos-pr-review and argos-upload skills
- [Media sharing](https://argos-ci.com/media-sharing): upload screenshots and recordings from the CLI/SDK/API/MCP, get a share link + Markdown, and let Argos post them on the pull request
- [MCP server card](https://argos-ci.com/.well-known/mcp/server-card.json): machine-readable server description
- [API catalog](https://argos-ci.com/.well-known/api-catalog): RFC 9727 linkset of Argos APIs
- [auth.md](https://argos-ci.com/auth.md): how agents register and authenticate
- [OAuth protected resource metadata](https://argos-ci.com/.well-known/oauth-protected-resource): RFC 9728
- WebMCP: every page registers read-only tools for browser agents on \`document.modelContext\` — ${webMcpToolNames}

## Compare

- [Argos vs Applitools](https://argos-ci.com/compare/applitools)
- [Argos vs Percy](https://argos-ci.com/compare/percy)
- [Argos vs Chromatic](https://argos-ci.com/compare/chromatic)
- [Argos vs BackstopJS](https://argos-ci.com/compare/backstopjs)
- [Argos vs Playwright screenshots](https://argos-ci.com/compare/playwright): Playwright's built-in toHaveScreenshot() vs Argos

## News

- [Blog](https://argos-ci.com/blog): guides and engineering posts
- [Changelog](https://argos-ci.com/changelog): product updates

## Company

- [About](https://argos-ci.com/about)
- [Security](https://argos-ci.com/security): SOC 2, GDPR
- [Terms of service](https://argos-ci.com/terms): the agreement governing use of Argos
- [Privacy policy](https://argos-ci.com/privacy): what personal information Argos handles, and its subprocessors
- [Data Processing Agreement](https://argos-ci.com/dpa): GDPR Article 28 terms, subprocessors, international transfers, audit rights
- [Status](https://argos.openstatus.dev): uptime and incidents
`;

export function GET() {
  return new Response(llmsTxt, { headers: markdownHeaders(llmsTxt) });
}
