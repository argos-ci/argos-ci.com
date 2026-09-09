import { Badge } from "@/components/Badge";
import { Chip } from "@/components/Chip";
import { CodeBlock } from "@/components/CodeBlock";
import { Terminal } from "@/components/Terminal";

const MCP_JSON = `{
  "mcpServers": {
    "argos": {
      "url": "https://mcp.argos-ci.com"
    }
  }
}`;

const MCP_ADD = `# Claude Code
claude mcp add --transport http \\
  argos https://mcp.argos-ci.com

# Codex CLI
codex mcp add argos --url https://mcp.argos-ci.com`;

/** The clients the docs walk through, in the docs' order. */
const CLIENTS = [
  "Claude Code",
  "Claude.ai and Claude for desktop",
  "Cursor",
  "VS Code with Copilot",
  "Codex CLI",
  "Windsurf",
];

/**
 * The two ways in: the JSON block for clients that read an `mcp.json`, and
 * the one-line command for the CLIs. There is nothing to install (the server
 * is remote and speaks streamable HTTP), so each client only needs the URL and
 * an OAuth sign-in.
 */
export function McpSetup() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="grid w-full items-start justify-items-center gap-6 md:grid-cols-2">
        <Terminal
          title="mcp.json"
          right={<Badge>mcp.argos-ci.com</Badge>}
          className="animate-slide-up-fade animate-duration-500 fill-mode-both motion-reduce:animate-fade-in"
        >
          <CodeBlock
            code={MCP_JSON}
            lang="json"
            className="text-xs [&_pre]:overflow-x-auto"
          />
        </Terminal>
        <Terminal
          title="Terminal"
          right={<Badge>OAuth</Badge>}
          className="animate-slide-up-fade animate-delay-150 animate-duration-500 fill-mode-both motion-reduce:animate-fade-in"
        >
          <CodeBlock
            code={MCP_ADD}
            lang="bash"
            className="text-xs [&_pre]:overflow-x-auto"
          />
        </Terminal>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="mr-1 font-medium text-low">Works with</span>
        {CLIENTS.map((client) => (
          <Chip key={client}>{client}</Chip>
        ))}
      </div>
    </div>
  );
}
