---
name: typefully-post
description: Draft Argos social posts on Typefully through its MCP server — connecting the server, creating a draft across X, LinkedIn and Bluesky, and the rules that keep publishing a human decision. Use whenever something needs announcing on social, on its own or as the last step of the changelog skill.
---

# Drafting on Typefully

Typefully holds the Argos social accounts. Everything here goes through its **MCP server**, never through the Typefully REST API directly.

## Always draft, never publish

`typefully_create_draft` can publish immediately. Do not.

- Leave the draft for a human to send.
- Use `plan_at` for a date: a planned draft shows on the queue and calendar at its date but is **inert** — it never auto-publishes until someone confirms it.
- Only set `publish_at` if the user asks you to schedule or publish in that same message. It is the one field that creates a publishing commitment.
- Same rule for `typefully_delete_draft` and `typefully_edit_draft` on a draft you did not create in this session: ask first.

## Connect the MCP server

The server URL lives in the **`TYPEFULLY_MCP`** environment variable. It embeds the API key, so never print it, never paste it into a file, and never commit it.

1. Check whether it is already connected:

   ```bash
   claude mcp list | grep typefully
   ```

2. If it is missing, add it **by reference**, so the config stores the placeholder and not the key:

   ```bash
   claude mcp add --transport http --scope local typefully '${TYPEFULLY_MCP}'
   ```

   Single quotes matter — the shell must not expand it.

3. Confirm it connects. If `claude mcp list` reports `Missing environment variables: TYPEFULLY_MCP`, the variable is set in the user's terminal but not in the environment Claude Code inherits — `~/.zshrc` only runs for interactive shells. Tell the user to either move the `export` to `~/.zshenv`, which every zsh reads, or start Claude Code from a terminal. Do not work around it by pasting the expanded URL into the config.

4. A server added mid-session is not live until the session reconnects. If the `typefully_*` tools are still missing after adding it, tell the user to run `/mcp` or restart the session, and pick the announcement back up from there.

## Create the draft

1. `typefully_list_social_sets` → take the **Argos** social set's `social_set_id` (`argos_ci`, not the personal account). Every other call needs it.
2. `typefully_get_social_set_details` → check which platforms are actually connected before enabling them. Argos currently has **X**, **LinkedIn** and **Bluesky**; enabling a platform that is not connected fails the call.
3. `typefully_create_draft` with one `requestBody.platforms` entry per platform, each `{ enabled: true, posts: [...] }`:
   - **`x`** — a thread. Post 1 is the hook: what shipped and why it matters, no link (links suppress reach). The middle posts take one capability each. The last post carries the URL.
   - **`bluesky`** — the same thread. Its limit is 300 characters, so anything that fits X fits here.
   - **`linkedin`** — a single post, 3–6 short paragraphs. Same substance, less clipped than X: a sentence of context, what shipped, who it helps, then the link.
4. `plan_at` takes an ISO 8601 datetime **with offset** — `2026-08-10T09:00:00+02:00`, i.e. 09:00 Europe/Paris on the day the thing goes live. `"next-free-slot"` also works. Omit it entirely if the date is not settled.
5. `draft_title` names the draft in Typefully. Use the feature's name, so the draft is findable next to whatever it announces.
6. Report the `private_url` from the response back to the user, and confirm `status` came back as `planned` (or `draft`) — never `published`.

## Post copy

Argos house voice: plain, specific, confident. Never a copy-paste of the source material.

- Lead with what a reader can now do. No "we're excited to announce", no superlatives.
- One concrete detail beats three adjectives. A command, a number, a name.
- No hashtags. At most one emoji, and only if it earns its place.
- Keep every X post under 280 characters so nothing is silently truncated. Count them before sending — the API will not.
- Never claim anything the source does not. The changelog entry, docs, or PR is the source of truth; the post is a summary of it, not an extension.
