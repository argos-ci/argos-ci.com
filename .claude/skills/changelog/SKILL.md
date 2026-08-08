---
name: changelog
description: Write a changelog entry for argos-ci.com — file structure, frontmatter, and the Argos editorial style (inspired by Linear and Vercel changelogs). Hands the social announcement to the typefully-post skill. Use when asked to write, announce, or draft a changelog entry.
---

# Writing an Argos changelog entry

## File structure

Each entry is a folder in `changelogs/` named `YYYY-MM-DD__slug/` containing a single `index.mdx`. The date prefix in the folder name controls publication: future-dated entries are hidden from the production build and appear automatically once the date passes (a daily cron redeploys the site — see `lib/api/changelog.tsx`). Dating an entry tomorrow is the normal way to schedule it.

The illustration lives in `public/assets/changelogs/<slug>/<slug>.jpg` and is referenced as `/assets/changelogs/<slug>/<slug>.jpg`. Generate it with the `changelog-image` skill.

## Frontmatter

Validated by `FrontmatterSchema` in `lib/api/changelog.tsx`:

```yaml
---
title: Vitest SDK # short noun phrase, the feature's name (Linear-style)
homeTitle: Visual testing in Vitest with the new Argos SDK # optional; longer benefit-led headline for the changelog home
description: Capture screenshots in Vitest browser tests and snapshot any value — JSON, HTML, Markdown — with @argos-ci/vitest, stable today.
slug: vitest-sdk # must match the folder slug (after the __)
date: 2026-07-09 # must match the folder date prefix
image: /assets/changelogs/vitest-sdk/vitest-sdk.jpg
---
```

- `title`: 1–4 words, names the feature ("Deployments", "Vitest SDK", "SAML SSO"). No verbs, no hype.
- `homeTitle`: a fuller headline stating the benefit, Vercel-style plain and specific ("Deploy Storybook and static builds on every pull request"). Skip it only if `title` already reads well as a headline.
- `description`: one sentence, concrete and self-contained — it doubles as the meta description and social preview text.

## Body structure

1. `![alt text](/assets/changelogs/<slug>/<slug>.jpg)` — the image always comes first.
2. **Opening paragraph** — 1–3 sentences. Linear-style: establish the problem or context first, then introduce the feature in bold on first mention. Example: "Analytics used to tell you how much you tested. Now it tells you how visual testing is going."
3. **Bulleted capabilities** — 3–5 bullets, each starting with a **bold lead-in** naming the capability, followed by an em-dash or colon and a concrete explanation. This is the scannable core of the entry.
4. **Code block** when the feature has a CLI/API/config surface — show the real command or snippet a user would type. Keep it minimal and copy-pasteable.
5. Optional `##` section for a secondary angle (e.g. "Built for humans and agents", "Analytics in the API and CLI"). One `##` max for most entries; never start with a heading.
6. **Closing links** — end with links to the docs, and optionally the blog post. Pattern: "Learn more in the [X documentation](https://argos-ci.com/docs/...)." A `👉 [Get started in the docs](...)` line is a good closer for onboarding-heavy features.

Target length: 150–300 words. It's a changelog, not a blog post — if there's a bigger story, link to a blog article.

## Voice and style

- **Plain, specific, confident.** State what shipped and what it does. No "we're excited to announce", no superlatives. Vercel-style directness: "Runtime logs now show cache reasons."
- **Benefit before mechanism.** Say what the user can now do, then how it works.
- **Present tense, active voice.** "Argos picks the baseline from your Git history", not "the baseline will be picked".
- **Bold sparingly**: feature name on first mention, bullet lead-ins, UI element names (**Copy prompt**). Backticks for commands, packages, paths.
- **Fact-check everything.** Never invent capabilities, limits, or pricing — verify against the docs repo (`/Users/gregberge/projects/docs`) and the feature's PR. Every docs link must resolve (docs live under `https://argos-ci.com/docs/...`).
- Em-dashes and short sentences are house style; avoid comma-spliced walls of text.

## Announce it on Typefully

Every entry ships with matching social drafts. Do this once the `index.mdx` is written and fact-checked — the posts are derived from it, so writing them earlier means writing them twice.

Use the **`typefully-post`** skill: it owns the MCP connection, the draft-creation calls, and the rule that publishing stays a human decision. What it needs from this skill:

- **Source** — the finished entry. The posts summarize it and must not claim anything it does not.
- **Structure** — the X and Bluesky thread follows the entry's shape: the opening paragraph becomes the hook, the bullets become one post each, the closing link becomes the last post.
- **Image** — the entry's own illustration, already generated and reviewed at `public/assets/changelogs/<slug>/<slug>.jpg`. It goes on the hook post so the post and the page look like the same thing. Do not generate a second image for the same entry; a `code-card` on the post that shows commands is the one worthwhile addition.
- **`plan_at`** — the entry's publication date at 09:00 Europe/Paris, e.g. `2026-08-10T09:00:00+02:00`. Omit it if the date is not settled.
- **`draft_title`** — the changelog `title`, so the draft is findable next to the entry.
- **Link** — `https://argos-ci.com/changelog/<slug>`, the same slug as the folder and the frontmatter.

## Checklist before finishing

- [ ] Folder `changelogs/YYYY-MM-DD__slug/index.mdx`; date and slug consistent between folder and frontmatter.
- [ ] Image generated (see `changelog-image` skill) at `public/assets/changelogs/<slug>/<slug>.jpg` and referenced both in frontmatter and as the first body element.
- [ ] All links verified against the docs.
- [ ] Read it aloud: opening states why it matters, bullets scan, ending tells the reader where to go next.
- [ ] Verify it builds: `SHOW_SCHEDULED_ARTICLES=true corepack pnpm build` and check the entry appears under `.next/server/app/changelog/` (use `corepack pnpm`, not plain pnpm). Note: as of 2026-07, `/changelog` routes 500 in the dev server for all entries (pre-existing bug) — the production build is the reliable check.
- [ ] Typefully draft created with the `typefully-post` skill, planned (never scheduled or published) on the entry's date, and its URL reported to the user.
