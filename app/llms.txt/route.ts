import { markdownHeaders } from "@/lib/agents";

export const dynamic = "force-static";

/**
 * llms.txt (https://llmstxt.org/): a curated markdown map of Argos for AI
 * agents. The documentation has its own, exhaustive /docs/llms.txt (served by
 * GitBook); this one covers the whole site and points to the machine-readable
 * surfaces.
 */
const llmsTxt = `# Argos

> Argos is a visual testing platform: CI uploads screenshots as "builds", Argos diffs them against a baseline, and your team reviews and approves or rejects the detected changes. It keeps product quality high while teams and AI agents ship faster — visual & snapshot testing for Playwright and Storybook.

Pages on argos-ci.com are also available as markdown: send \`Accept: text/markdown\` and the response is \`Content-Type: text/markdown\` (HTML stays the default).

## Documentation

- [Documentation](https://argos-ci.com/docs): guides, SDK references, and concepts
- [Documentation for LLMs](https://argos-ci.com/docs/llms.txt): the full docs map in markdown (every docs page also exists as .md)
- [API reference](https://argos-ci.com/docs/api-reference): the Argos REST API at https://api.argos-ci.com/v2
- [OpenAPI description](https://api.argos-ci.com/v2/openapi.yaml): machine-readable API spec
- [Agents](https://argos-ci.com/docs/agents): MCP server, CLI, and agent skills

## Agent surfaces

- [MCP server](https://argos-ci.com/docs/agents/mcp-server): official remote MCP server at https://mcp.argos-ci.com (Streamable HTTP, OAuth or personal access token)
- [MCP server card](https://argos-ci.com/.well-known/mcp/server-card.json): machine-readable server description
- [API catalog](https://argos-ci.com/.well-known/api-catalog): RFC 9727 linkset of Argos APIs
- [auth.md](https://argos-ci.com/auth.md): how agents register and authenticate
- [OAuth protected resource metadata](https://argos-ci.com/.well-known/oauth-protected-resource): RFC 9728

## Product

- [Homepage](https://argos-ci.com/): product overview
- [Visual testing](https://argos-ci.com/visual-testing): screenshot testing with Playwright
- [Test debugging](https://argos-ci.com/test-debugging): debug CI failures with screenshots and traces
- [Flaky test management](https://argos-ci.com/flaky-management): detect and mute flaky changes
- [Pricing](https://argos-ci.com/pricing): Hobby (free) and Pro plans

## News

- [Blog](https://argos-ci.com/blog): guides and engineering posts
- [Changelog](https://argos-ci.com/changelog): product updates

## Company

- [About](https://argos-ci.com/about)
- [Security](https://argos-ci.com/security): SOC 2, GDPR
- [Status](https://argos.openstatus.dev): uptime and incidents
`;

export function GET() {
  return new Response(llmsTxt, { headers: markdownHeaders(llmsTxt) });
}
