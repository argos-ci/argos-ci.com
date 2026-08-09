import {
  API_DOCS_URL,
  API_URL,
  MCP_DOCS_URL,
  MCP_URL,
  OAUTH_ISSUER,
  OAUTH_SCOPES,
  markdownHeaders,
} from "@/lib/agents";

export const dynamic = "force-static";

/**
 * auth.md (https://workos.com/auth-md): how agents obtain credentials for
 * Argos. Everything here mirrors the OAuth authorization server metadata at
 * https://app.argos-ci.com/.well-known/oauth-authorization-server — the
 * endpoints are real, keep them in sync with the argos backend.
 */
const authMd = `# Argos auth.md

This document describes how AI agents and automated clients authenticate to
[Argos](https://argos-ci.com), the visual testing platform.

## Who this is for

Agents that want to call the [Argos REST API](${API_DOCS_URL})
(\`${API_URL}\`) or connect to the
[Argos MCP server](${MCP_DOCS_URL}) (\`${MCP_URL}\`).

Both resources accept the same bearer tokens, issued by the Argos OAuth 2.1
authorization server at \`${OAUTH_ISSUER}\`. Argos accounts belong to humans:
an agent always acts on behalf of a user who signs in and grants it access.

## Discovery

- Authorization server metadata (RFC 8414): \`${OAUTH_ISSUER}/.well-known/oauth-authorization-server\`
- Protected resource metadata (RFC 9728): \`https://api.argos-ci.com/.well-known/oauth-protected-resource\` and \`${MCP_URL}/.well-known/oauth-protected-resource\`
- API catalog (RFC 9727): \`https://argos-ci.com/.well-known/api-catalog\`
- MCP server card: \`https://argos-ci.com/.well-known/mcp/server-card.json\`

## Method 1: OAuth 2.1 (recommended)

The authorization server supports **dynamic client registration** (RFC 7591) —
agents can register themselves without a human pre-creating a client:

1. \`POST ${OAUTH_ISSUER}/oauth/register\` with your client metadata to obtain a \`client_id\`.
2. Run the authorization code flow with PKCE (\`S256\`) at \`${OAUTH_ISSUER}/oauth/authorize\`. A browser opens and the user signs in, picks the organizations to share, and grants scopes.
3. Exchange the code at \`${OAUTH_ISSUER}/oauth/token\`. Refresh tokens are supported.

MCP clients (Claude Code, Claude.ai, Cursor, VS Code, Codex, Windsurf…) do all
of this automatically per the MCP authorization spec — just add
\`${MCP_URL}\` as an HTTP MCP server:

\`\`\`bash
claude mcp add --transport http argos ${MCP_URL}
\`\`\`

## Method 2: Personal access token

For clients where OAuth is impractical, a user can create a personal access
token in their Argos settings ([app.argos-ci.com](https://app.argos-ci.com))
and hand it to the agent. See the
[API reference](${API_DOCS_URL}) for details.

## Using tokens

Send the token as a bearer credential:

\`\`\`http
Authorization: Bearer <token>
\`\`\`

## Scopes

${OAUTH_SCOPES.map((scope) => `- \`${scope}\``).join("\n")}

Broadly: \`projects:*\` covers project configuration, \`builds:write\` and
\`reviews:write\` cover build review, \`comments:*\` covers build comments, and
\`account:admin\` covers team administration.

## Revocation

- Tokens can be revoked at \`${OAUTH_ISSUER}/oauth/revoke\` (RFC 7009).
- Users can revoke any agent's access at any time from **Authorized
  applications** in their Argos settings.

## Rate limits and support

The API is rate limited; see [rate limits](${API_DOCS_URL}/rate-limits).
Questions: contact@argos-ci.com or https://argos-ci.com/discord.
`;

export function GET() {
  return new Response(authMd, { headers: markdownHeaders(authMd) });
}
