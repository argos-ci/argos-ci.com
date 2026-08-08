---
name: typefully-post
description: Draft Argos or Greg's social posts on Typefully through its MCP server — connecting the server, generating and attaching the post image, creating a draft across X, LinkedIn and Bluesky, and the rules that keep publishing a human decision. Use whenever something needs announcing on social, on its own or as the last step of the changelog skill.
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

## Pick the social set

`typefully_list_social_sets` returns two:

| Set          | `social_set_id` | Voice                                                                    |
| ------------ | --------------- | ------------------------------------------------------------------------ |
| `argos_ci`   | `146700`        | The product. What shipped, what a reader can now do.                     |
| `gregberge_` | `145185`        | Greg, first person. Why it was built this way, what he learned shipping. |

Post to the one the user named. When they ask for both, write them **separately** — the personal post reposting the brand's words is the failure mode. Keep the same facts and change the angle: the brand announces the capability, Greg says what was interesting about building it. Plan the personal one an hour after the brand one so they don't compete in the same feed.

`typefully_get_social_set_details` confirms which platforms are actually connected. Both sets currently have **X**, **LinkedIn** and **Bluesky**; enabling a platform that is not connected fails the call.

## Create the draft

1. Build the images first — see [Images](#images). Uploading after the draft exists means a second `typefully_edit_draft` round-trip.
2. `typefully_create_draft` with one `requestBody.platforms` entry per platform, each `{ enabled: true, posts: [...] }`:
   - **`x`** — a thread. Post 1 is the hook: what shipped and why it matters, no link (links suppress reach). The middle posts take one capability each. The last post carries the URL.
   - **`bluesky`** — the same thread. Its limit is 300 characters, so anything that fits X fits here.
   - **`linkedin`** — a single post, 3–6 short paragraphs. Same substance, less clipped than X: a sentence of context, what shipped, who it helps, then the link.
3. `plan_at` takes an ISO 8601 datetime **with offset** — `2026-08-10T09:00:00+02:00`, i.e. 09:00 Europe/Paris on the day the thing goes live. `"next-free-slot"` also works. Omit it entirely if the date is not settled.
4. `draft_title` names the draft in Typefully. Use the feature's name, so the draft is findable next to whatever it announces.
5. Report the `private_url` from the response back to the user, and confirm `status` came back as `planned` (or `draft`) — never `published`.

## Images

**Every draft carries at least one image.** A bare text post is the exception, not the default — an image is what stops the scroll, and a post that ships without one has to be edited later to add it.

### Choose the image

Three skills generate them. Pick by what the post is actually about, never by what is easiest:

| The post is about…                              | Use                                                                     |
| ----------------------------------------------- | ----------------------------------------------------------------------- |
| A command, a config snippet, an API call        | **`code-card`** — the snippet _is_ the message                          |
| An abstract idea: a workflow, a tradeoff, scale | **`social-image`** — dark-indigo editorial scene                        |
| A changelog entry that already has an image     | **Reuse the entry's own illustration** from `public/assets/changelogs/` |

That last row matters. A changelog announcement should carry the same picture as the entry it links to — generating a second, different image for the same feature makes the post and the page look unrelated. Reuse it on the lead post, and add a `code-card` on the post that shows the commands. Do **not** generate a fresh `social-image` in the pastel changelog style, or a `changelog-image` for anything that is not a changelog entry: the two looks are separate systems.

A thread wants one or two images, not five. The hook post and the one concrete post that earns a picture.

### Upload it

Media is scoped to a social set, so the same file uploads once **per set** — a brand post and a personal post about the same thing each need their own upload.

1. `typefully_create_media_upload` with `{ social_set_id, requestBody: { file_name } }` → returns a `media_id` and a presigned S3 URL. The filename must end in `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.mp4`, `.mov` or `.pdf`.
2. `PUT` the raw bytes to that URL with **no headers at all**. The signature was calculated without them, so adding `Content-Type` or `Authorization` gives `403 SignatureDoesNotMatch`. Use `curl -T <file> "<url>"`, or `fetch(url, { method: "PUT", body: buffer })` — not `--data-binary`. Success is `200` or `204`.
3. Poll `typefully_get_media_status` until `status` is `ready`. The upload URL expires after an hour; a media that never received its file goes to `failed` and needs a new upload.
4. Put the id on the post it belongs to: `{ text: "…", media_ids: ["<media_id>"] }`. Up to 10 per post.

To add an image to a draft that already exists, `typefully_edit_draft` replaces a platform's `posts` list wholesale — read the draft back with `typefully_get_draft`, map the existing `text` values through, and add `media_ids` where they belong. Verify by reading it back: each post carries a `media_ids` array, and an empty one means nothing attached.

### Review before attaching

Read every generated PNG back before it goes anywhere near a draft. Reject it if the concept is not legible in two seconds, if any letterform crept into a `social-image`, if a `code-card` is clipped on the right, or if it is simply not about the post.

## Post copy

Plain, specific, confident. Never a copy-paste of the source material.

- Lead with what a reader can now do. No "we're excited to announce", no superlatives.
- One concrete detail beats three adjectives. A command, a number, a name.
- No hashtags. At most one emoji, and only if it earns its place.
- Keep every X post under 280 characters so nothing is silently truncated. Count them before sending — the API will not.
- Never claim anything the source does not. The changelog entry, docs, or PR is the source of truth; the post is a summary of it, not an extension.

On the **`gregberge_`** set, the voice shifts but the rules don't. First person, and the hook is a builder's observation rather than a capability: what was surprising, what fell out of a decision made earlier, what he'd tell another engineer about it. Still no hype, still every fact traceable to the source.
