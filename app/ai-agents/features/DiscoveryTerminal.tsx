import { Badge } from "@/components/Badge";
import { CodeBlock } from "@/components/CodeBlock";
import { Terminal } from "@/components/Terminal";

const API_CODE = `# One base URL, one bearer token
API=https://api.argos-ci.com/v2
AUTH="Authorization: Bearer $ARGOS_TOKEN"

# A test's changes; a project token can read
curl -H "$AUTH" \\
  $API/projects/acme/app/tests/<testId>/changes

# The whole API, described in OpenAPI 3.1
curl $API/openapi.yaml`;

const MARKDOWN_CODE = `# Any product page as Markdown
curl https://argos-ci.com/md/review
curl -H "Accept: text/markdown" \\
  https://argos-ci.com/stabilize

# The site map, and how agents authenticate
curl https://argos-ci.com/llms.txt
curl https://argos-ci.com/auth.md

# Every docs page, and their index
curl https://argos-ci.com/docs/agents/mcp-server.md
curl https://argos-ci.com/docs/llms.txt`;

const VARIANTS = {
  api: { code: API_CODE, badge: "api.argos-ci.com/v2" },
  markdown: { code: MARKDOWN_CODE, badge: "text/markdown" },
} as const;

/**
 * Real requests, nothing invented: the REST endpoint is the one the docs give
 * for a test's changes, and every URL in the Markdown variant is served today.
 */
export function DiscoveryTerminal(props: { variant: keyof typeof VARIANTS }) {
  const { code, badge } = VARIANTS[props.variant];
  return (
    <Terminal
      title="Terminal"
      right={<Badge className="font-mono">{badge}</Badge>}
      className="w-full"
    >
      <CodeBlock
        code={code}
        lang="bash"
        className="text-xs [&_pre]:overflow-x-auto"
      />
    </Terminal>
  );
}
