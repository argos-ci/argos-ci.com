---
name: typefully-post
description: Draft Argos or Greg's social posts on Typefully through its API — running Typefully's CLI with the API key, generating and attaching the post image, creating a draft across X, LinkedIn and Bluesky, and the rules that keep publishing a human decision. Use whenever something needs announcing on social, on its own or as the last step of the changelog skill.
---

# Drafting on Typefully

Typefully holds the Argos social accounts. Everything here goes through the **Typefully API**, with Typefully's official CLI vendored in this repo (`.agents/skills/typefully/scripts/typefully.js`; its own `typefully` skill documents every command). Do not use the Typefully MCP server: in the Claude app it needs the company to approve it as a connector.

## Always draft, never publish

`drafts:create` can publish immediately. Do not.

- Leave the draft for a human to send.
- Use `--plan <datetime>` for a date: a planned draft shows on the queue and calendar at its date but is **inert** — it never auto-publishes until someone confirms it.
- Only use `--schedule`, `drafts:schedule` or `drafts:publish` if the user asks you to schedule or publish in that same message. They are the commands that create a publishing commitment.
- Same rule for `drafts:delete` and `drafts:update` on a draft you did not create in this session: ask first.

**Read the draft back before you report it.** The `status` in the create response is not the final word: a planned draft has been observed coming back as `scheduled` — armed to auto-publish — when its date landed on a queue slot. Always confirm with `drafts:get`, and if `status` is `scheduled` when the user did not ask for that, disarm it:

```bash
drafts:plan <social_set_id> <draft_id> --time "<the same datetime>"   # scheduled → planned
```

Planning a scheduled draft disarms it and keeps the date. Verify once more after disarming. Never tell the user a draft is "planned, not scheduled" on the strength of the create response alone.

## Run the CLI

The API key lives in **`TYPEFULLY_API_KEY`**, exported in `~/.zshrc`. Never print it, never paste it into a file or a command line, and never commit it.

Two things stand between the CLI and a working call, so run it like this:

```bash
cp .agents/skills/typefully/scripts/typefully.js /tmp/typefully.cjs
zsh -ic 'node /tmp/typefully.cjs social-sets:list'
```

- **`.cjs` copy** — the CLI is CommonJS, but this repo's `package.json` declares `"type": "module"`, so running it in place fails with `require is not defined in ES module scope`. Do not edit the vendored file: `skills-lock.json` tracks it.
- **`zsh -ic`** — `~/.zshrc` only runs for interactive shells, so a plain call does not see the key and answers "API key not found". Inside the double-quoted form, keep the arguments as literal words — `zsh` does not word-split `$variables` the way `bash` does.

Every command prints JSON. On "API key not found", "Authentication failed" or HTTP 401, stop and ask the user to check `TYPEFULLY_API_KEY`; do not look for credentials anywhere else.

## Pick the social set

`social-sets:list` returns two:

| Set          | `social_set_id` | Voice                                                                    |
| ------------ | --------------- | ------------------------------------------------------------------------ |
| `argos_ci`   | `146700`        | The product. What shipped, what a reader can now do.                     |
| `gregberge_` | `145185`        | Greg, first person. Why it was built this way, what he learned shipping. |

Post to the one the user named. A **changelog announcement goes to both** — the `changelog` skill proposes them as a pair. When posting to both, write them **separately** — the personal post reposting the brand's words is the failure mode. Keep the same facts and change the angle: the brand announces the capability, Greg says what was interesting about building it. Plan the personal one an hour after the brand one so they don't compete in the same feed.

`social-sets:get <social_set_id>` confirms which platforms are actually connected. Both sets currently have **X**, **LinkedIn** and **Bluesky**; enabling a platform that is not connected fails the call.

## Create the draft

One draft per account carries every platform: the X and Bluesky thread, and the LinkedIn post written for LinkedIn.

1. Build and upload the images first — see [Images](#images). Adding them after the draft exists means another `drafts:update` round-trip.
2. Write the thread to a file, posts separated by a line holding only `---`:
   - **X** — a thread. Post 1 is the hook: what shipped and why it matters, no link (links suppress reach). The middle posts take one capability each. The last post carries the URL.
   - **Bluesky** — the same thread. Its limit is 300 characters, so anything that fits X fits here.
3. Create the draft for both:

   ```bash
   zsh -ic "node /tmp/typefully.cjs drafts:create 146700 --platform x,bluesky --file /tmp/thread.txt --media <media_id> --plan 2026-08-10T09:00:00+02:00 --title 'Feature name'"
   ```

   `--media` goes on the first post, the hook. `--plan` takes an ISO 8601 datetime **with offset** — 09:00 Europe/Paris on the day the thing goes live, `+02:00` in summer and `+01:00` in winter; `next-free-slot` also works. Leave it out entirely if the date is not settled. `--title` names the draft in Typefully: use the feature's name, so the draft is findable next to whatever it announces.

4. Add the **LinkedIn** post to the same draft: a single post, 3–6 short paragraphs. Same substance, less clipped than X: a sentence of context, what shipped, who it helps, then the link.

   ```bash
   zsh -ic "node /tmp/typefully.cjs drafts:update 146700 <draft_id> --platform linkedin --file /tmp/linkedin.txt --media <media_id>"
   ```

5. Read it back with `drafts:get <social_set_id> <draft_id>`: `status` is `planned` (or `draft`, never `published` or `scheduled`), each platform has the posts you wrote, and the hook carries the image. Report the draft URL — `https://typefully.com/?d=<draft_id>&a=<social_set_id>` — to the user.

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

```bash
zsh -ic "node /tmp/typefully.cjs media:upload 146700 /path/to/image.jpg"
```

It waits until processing is done and prints the `media_id` with `status: ready`. The file must be a `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.mp4`, `.mov` or `.pdf`.

To add an image to a draft that already exists, `drafts:update` with `--text` or `--file` replaces that platform's posts, and `--media` lands on the first one. Verify by reading the draft back: each post carries a `media_ids` array, and an empty one means nothing attached.

### Review before attaching

Read every generated PNG back before it goes anywhere near a draft. Reject it if the concept is not legible in two seconds, if any letterform crept into a `social-image`, if a `code-card` is clipped on the right, or if it is simply not about the post.

## Queue and cadence

The queue schedule is a set of weekly slots; drafts sit in them. Two commands read it and one replaces it.

- `queue:schedule:get <social_set_id>` → the current rules, each `{ h, m, days: [...] }` in the social set's timezone (Europe/Paris).
- `queue:schedule:put <social_set_id> --rules '[…]'` → **full atomic replacement**. There is no add-one-slot call, so read the rules first and send back the whole set. Needs ADMIN access.
- `queue:get <social_set_id> --start-date <YYYY-MM-DD> --end-date <YYYY-MM-DD>` → the slots and the drafts occupying them between two dates, max 62 days per call. Check each `status`: `scheduled` will auto-publish, `planned` will not.

**Changing the rules does not move anything.** Existing drafts keep the exact datetime they already have — the new rules only govern slots that are still empty. Re-spacing an existing queue is a second, separate pass over the drafts.

### Re-spacing an existing queue

1. **Snapshot first.** Write every draft's `id`, `status` and `scheduled_date` to a file before touching them. There is no bulk undo, and putting 30 drafts back by hand is not a rollback.
2. Sort by current `scheduled_date` and keep that order — the sequence is editorial, only the spacing is changing.
3. Move each one with **`drafts:schedule <social_set_id> <draft_id> --time <datetime>`**, not `drafts:plan`. Both accept a new datetime, but planning disarms an armed draft, so using it here would quietly unschedule the entire queue. Assert each response still reads `scheduled`.
4. **Leave two kinds of draft alone**: anything due within the next few hours (a new slot earlier the same day is in the past), and anything whose date is tied to something external — a changelog going live, a launch. Reserve those days and let the sequence skip them.
5. Verify by reading the queue back: count drafts per day and assert the maximum is what the user asked for.

Dry-run the mapping and show it before writing. A list of `old → new` lines is how the user catches a date that should have been reserved.

## Post copy

Plain, specific, confident. Never a copy-paste of the source material.

- Lead with what a reader can now do. No "we're excited to announce", no superlatives.
- One concrete detail beats three adjectives. A command, a number, a name.
- No hashtags. At most one emoji, and only if it earns its place.
- Keep every X post under 280 characters so nothing is silently truncated. Count them before sending — the API will not.
- Never claim anything the source does not. The changelog entry, docs, or PR is the source of truth; the post is a summary of it, not an extension.

On the **`gregberge_`** set, the voice shifts but the rules don't. First person, and the hook is a builder's observation rather than a capability: what was surprising, what fell out of a decision made earlier, what he'd tell another engineer about it. Still no hype, still every fact traceable to the source.
