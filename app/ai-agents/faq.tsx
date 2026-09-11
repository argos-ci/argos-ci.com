import { Code } from "@/components/Code";
import { FAQQuestion } from "@/components/FAQAccordion";
import { Link } from "@/components/Link";

export const AI_AGENTS_QUESTIONS: FAQQuestion[] = [
  {
    name: "Which AI clients and agents work with Argos?",
    answer: (
      <>
        <p>
          Any MCP client can connect to the Argos MCP server at{" "}
          <Code>mcp.argos-ci.com</Code>. The docs walk through Claude Code,
          Claude.ai and Claude for desktop, Cursor, VS Code with Copilot, Codex
          CLI, and Windsurf. Any agent with a terminal can use the CLI, locally
          or in CI, and the{" "}
          <Link href="/docs/agents/agent-skills">agent skills</Link> install
          into assistants that support skills, such as Claude Code, Codex, and
          Cursor.
        </p>
      </>
    ),
    textAnswer:
      'Any MCP client can connect to the Argos MCP server at mcp.argos-ci.com. The docs walk through Claude Code, Claude.ai and Claude for desktop, Cursor, VS Code with Copilot, Codex CLI, and Windsurf. Any agent with a terminal can use the CLI, locally or in CI, and the <a href="/docs/agents/agent-skills">agent skills</a> install into assistants that support skills, such as Claude Code, Codex, and Cursor.',
  },
  {
    name: "What can an agent do over MCP, and what limits it?",
    answer: (
      <>
        <p>
          The MCP server generates its tools from the REST API: every operation
          a user can call is a tool with the same name, parameters, and
          permissions. An agent can list builds and inspect diffs, approve or
          reject a build, request reviewers, read and post comments, investigate
          flaky tests and ignore their changes, configure projects and
          automations, administer a team, upload media, and read analytics and
          usage.
        </p>
        <p>
          What it may actually do is decided by the OAuth scopes you grant, such
          as <Code>projects:read</Code>, <Code>reviews:write</Code>,{" "}
          <Code>comments:write</Code>, or <Code>account:admin</Code>, and by
          your client&apos;s approval prompt on write actions. See{" "}
          <Link href="/docs/agents/mcp-server#available-tools">
            the available tools
          </Link>
          .
        </p>
      </>
    ),
    textAnswer:
      'The MCP server generates its tools from the REST API: every operation a user can call is a tool with the same name, parameters, and permissions. An agent can list builds and inspect diffs, approve or reject a build, request reviewers, read and post comments, investigate flaky tests and ignore their changes, configure projects and automations, administer a team, upload media, and read analytics and usage. What it may actually do is decided by the OAuth scopes you grant, such as projects:read, reviews:write, comments:write, or account:admin, and by your client\'s approval prompt on write actions. See <a href="/docs/agents/mcp-server#available-tools">the available tools</a>.',
  },
  {
    name: "Which token does my agent need?",
    answer: (
      <>
        <p>
          Uploads, deployments, and read-only commands such as{" "}
          <Code>build get</Code>, <Code>build snapshots</Code>,{" "}
          <Code>test list</Code>, <Code>test get</Code>, and{" "}
          <Code>test changes</Code> work with a project token, the one your CI
          already has. Anything attributed to a user, such as submitting a
          review, requesting reviewers, posting a comment, ignoring a change, or
          configuring a project, needs a personal access token, because the
          action is checked against that user&apos;s permissions. Locally,{" "}
          <Code>argos login</Code> stores one for you.
        </p>
        <p>
          The MCP server takes OAuth or a personal access token and does not
          accept project tokens. See{" "}
          <Link href="/docs/sdks-reference/argos-command-line-interface-cli#project-tokens-and-personal-access-tokens">
            project tokens and personal access tokens
          </Link>
          .
        </p>
      </>
    ),
    textAnswer:
      'Uploads, deployments, and read-only commands such as build get, build snapshots, test list, test get, and test changes work with a project token, the one your CI already has. Anything attributed to a user, such as submitting a review, requesting reviewers, posting a comment, ignoring a change, or configuring a project, needs a personal access token, because the action is checked against that user\'s permissions. Locally, argos login stores one for you. The MCP server takes OAuth or a personal access token and does not accept project tokens. See <a href="/docs/sdks-reference/argos-command-line-interface-cli#project-tokens-and-personal-access-tokens">project tokens and personal access tokens</a>.',
  },
  {
    name: "Does Argos use AI to decide whether a change is acceptable?",
    answer: (
      <>
        <p>
          No. Argos compares screenshots with deterministic pixel diffing, built
          on the open-source odiff library, and compares non-image files as
          text. Same input, same result, and the exact pixels that changed are
          visible. Agents use that build data as review evidence; they do not
          replace your team&apos;s ownership of review decisions. See{" "}
          <Link href="/docs/learn/platform-fundamentals/how-argos-detects-visual-differences">
            how Argos detects visual differences
          </Link>
          .
        </p>
      </>
    ),
    textAnswer:
      'No. Argos compares screenshots with deterministic pixel diffing, built on the open-source odiff library, and compares non-image files as text. Same input, same result, and the exact pixels that changed are visible. Agents use that build data as review evidence; they do not replace your team\'s ownership of review decisions. See <a href="/docs/learn/platform-fundamentals/how-argos-detects-visual-differences">how Argos detects visual differences</a>.',
  },
  {
    name: "Can an agent read this site and the documentation?",
    answer: (
      <>
        <p>
          Yes. Send <Code>Accept: text/markdown</Code> to a product page, or
          prefix its path with <Code>/md</Code>, and you get its Markdown twin.{" "}
          <Link href="/llms.txt">llms.txt</Link> maps the site and{" "}
          <Link href="/auth.md">auth.md</Link> explains how agents authenticate.
          Every documentation page exists as <Code>.md</Code>, indexed by{" "}
          <Code>/docs/llms.txt</Code> and <Code>/docs/llms-full.txt</Code>, and
          the docs expose a read-only MCP server at{" "}
          <Code>argos-ci.com/docs/~gitbook/mcp</Code>. In a browser with WebMCP,
          this site also registers read-only tools such as{" "}
          <Code>search_docs</Code> and <Code>get_pricing</Code>. See{" "}
          <Link href="/docs/agents/ai-ready-docs">AI-ready docs</Link>.
        </p>
      </>
    ),
    textAnswer:
      'Yes. Send Accept: text/markdown to a product page, or prefix its path with /md, and you get its Markdown twin. <a href="/llms.txt">llms.txt</a> maps the site and <a href="/auth.md">auth.md</a> explains how agents authenticate. Every documentation page exists as .md, indexed by /docs/llms.txt and /docs/llms-full.txt, and the docs expose a read-only MCP server at argos-ci.com/docs/~gitbook/mcp. In a browser with WebMCP, this site also registers read-only tools such as search_docs and get_pricing. See <a href="/docs/agents/ai-ready-docs">AI-ready docs</a>.',
  },
];
