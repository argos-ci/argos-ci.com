# argos-ci.com

The Argos marketing website: Next.js (App Router), React, Tailwind CSS v4
(CSS-first — the theme lives in `styles/globals.css`, there is no
`tailwind.config`), MDX content, TypeScript. Deployed on Vercel.

## Commands

Use `corepack pnpm`, not plain `pnpm` (the repo pins the version).

```bash
corepack pnpm dev --port 3100   # port 3000 is the Argos app backend — never take or kill it
corepack pnpm build             # production build; the reliable check for content changes
corepack pnpm check-types       # tsc --noEmit
corepack pnpm exec oxlint       # lint (call the binary; do not go through npm "lint" wrappers)
corepack pnpm exec oxfmt        # format — also sorts Tailwind classes; run before committing
corepack pnpm knip              # unused files/exports; CI fails on new dead code
corepack pnpm test              # Playwright against a build (visual tests upload to Argos)
```

Stale `.next/dev/types` can break `check-types` after deleting a route:
`rm -rf .next` and rebuild. A stale `next start` serves an old build and looks
like a code bug.

## The rule that is easiest to break: markdown twins

Most user-facing copy exists twice — once as HTML/JSX, once as markdown served
to agents and LLMs. **Whenever you change page copy, update the markdown twin
in the same commit.** The twins:

| HTML surface                                                                                  | Markdown twin                                                                                                                             |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Homepage (`app/homepage.tsx`, `app/home/**`)                                                  | `app/markdown/home.md` (curated by hand)                                                                                                  |
| `/pricing` (`app/pricing/**`)                                                                 | `getPricingMarkdown()` in `lib/markdown.ts` (hand-written)                                                                                |
| Pillar pages `/deploy`, `/diff`, `/review`, `/stabilize`, plus `/ai-agents`, `/media-sharing` | `app/markdown/<slug>.md` (curated by hand, no FAQ inside) + the page's `faq.tsx` questions, appended by `getCuratedPageMarkdown()`        |
| Blog & changelog                                                                              | derived automatically from their MDX, nothing to do                                                                                       |
| `/compare/*` (`app/compare/*/page.tsx`)                                                       | derived from `app/compare/*/comparison.ts` + `faq.tsx` by `getCompareMarkdown()` in `lib/markdown.ts`, keep hero copy in the data module  |
| `/security` (`app/security/page.tsx`)                                                         | `getSecurityMarkdown()` in `lib/markdown.ts`: prose hand-written, lists from the page's data modules                                      |
| Site overview for agents                                                                      | `app/llms.txt/route.ts` (curated link map)                                                                                                |

Two more lockstep spots:

- `app/pricing/PricingFaq.tsx` and every `faq.tsx` store each answer twice:
  `answer` (JSX) and `textAnswer` (string, feeds FAQPage JSON-LD and the
  markdown twin). Edit both.
- Pricing numbers come from `lib/constants.ts`; never hardcode them in copy.

### Which pages have a markdown variant

`lib/markdown-pages.ts` is the single source of truth (`MARKDOWN_PAGES`). Four
consumers must agree; the file's doc comment explains them. Adding a page:

1. Add the entry to `MARKDOWN_PAGES` (`section: true` covers descendants).
2. Add a resolver in `lib/markdown.ts` — the compiler forces this.
3. Add the path to the `matcher` literal in `proxy.ts` — hand-maintained;
   `tests/markdown-pages.spec.ts` fails if it drifts.
4. If the resolver reads a curated file, put it in `app/markdown/`
   (already shipped via `outputFileTracingIncludes`). Pages with a FAQ use
   `getCuratedPageMarkdown(file, QUESTIONS)` so the FAQ is rendered from the
   same array as the page.

Verify with `curl -H "Accept: text/markdown" http://localhost:3100/<path>` and
`curl http://localhost:3100/md/<path>`.

## WebMCP tools for browser agents

`components/WebMcp.tsx` registers the read-only tools defined in
`lib/webmcp-tools.ts` on `document.modelContext` (falling back to the
deprecated `navigator.modelContext`). Tools fetch the markdown twins or the
docs' `.md` pages, so a new tool usually only needs a twin to read.
`tests/webmcp.spec.ts` stubs the API and asserts the tool list — update
`EXPECTED_TOOLS` when adding one. Chrome exposes the API only behind
`chrome://flags/#enable-webmcp-testing` or an origin trial token: set
`WEBMCP_ORIGIN_TRIAL_TOKEN` (rendered as a meta tag by `app/layout.tsx`) from
the registration at developer.chrome.com/origintrials. Inspect registrations in
DevTools → Application → WebMCP.

## The four pillars

The product is told as one flow, in this order: **Deploy → Diff → Review →
Stabilize** (`/deploy`, `/diff`, `/review`, `/stabilize`). `lib/pillars.ts` is
the registry (slug, href, name, one-liners, color) read by the navbar, the
footer, the homepage, `PillarLinks` and `llms.txt`; icons are in
`components/pillar-icons.ts`. Claimed colors: deploy=teal, diff=blue,
review=pink, stabilize=amber, `/ai-agents`=violet (agents everywhere),
`/media-sharing`=plum.

Every pillar page follows the same skeleton, built from shared blocks:
`PillarHero` → `TrustedBy` → feature sections → `AgentSection` (the
"For AI agents" block, anchored `#agents`) → `QuoteBlock` → `FAQSection` →
`PillarLinks` → `CallToActionSection`. `/ai-agents` is a lean hub (no
`TrustedBy`, no `PillarLinks`) that deep-links into each pillar's `#agents`.
The homepage has one `FeatureSection` per pillar (`app/home/<pillar>/`), which
imports illustrations from the pillar's `features/` folder.

Old routes (`/visual-testing`, `/deployments`, `/collaborative-reviews`,
`/flaky-management`, `/test-debugging`, `/playwright`) redirect permanently in
`next.config.ts`; never reuse them.

## Adding a page

Registration points, all required unless noted:

1. `app/<slug>/page.tsx` (+ `app/<slug>/features/*.tsx` illustrations).
   Metadata via `getMetadata({ …, pathname })` from `lib/metadata.tsx`.
2. `app/navbar.tsx`: a `LinkCard` in the right dropdown column (pillars
   render from `lib/pillars.ts`; other pages are hand-listed).
3. `app/footer.tsx`: a `FooterLink` (Product column for feature pages).
4. `tests/screenshot-pages.spec.ts`: add to `FOOTER_LINKS`; the key is the
   route, the value must equal the footer link's visible label (the test
   navigates by clicking it, and `getByRole` matches substrings, so no two
   footer labels may contain each other).
5. `public/main-sitemap.xml`: hand-add the `<url>` entry.
6. `app/llms.txt/route.ts`: add a bullet so agents can discover the page.
7. `app/markdown/home.md`: mention it if the homepage copy does.
8. Cross-link it: pillar pages close on `PillarLinks`; other pages hand-roll
   a 3-up grid of `FeatureGridFeatureSmall`.
9. Pages own a `FeatureColor` (`components/feature-section/colors.tsx`);
   pick one not already claimed (see the list above).
10. Markdown variant: see the section above. Product pages should have one.

## Content: blog, changelog, social

Authoring conventions live in skills — follow them, don't improvise:

- `.claude/skills/changelog/SKILL.md` — entry structure, frontmatter, voice,
  and the Typefully hand-off. Images via `.claude/skills/changelog-image/`.
- Blog frontmatter is validated by `FrontmatterSchema` in `lib/api/blog.tsx`
  (`author: greg|jeremy`, `category: company|guides|engineering`, `image:
./main.jpg` + `imageAlt`). Hero images: `.claude/skills/social-image/`
  (2048×1024 JPEG, committed next to `index.mdx`).
- Social posts: `.claude/skills/typefully-post/` (drafts only — publishing is
  a human decision). Code screenshots: `.claude/skills/code-card/`.

**Scheduling:** content is published by dating it. Future-dated changelog
folders (`YYYY-MM-DD__slug/`) and articles are hidden from production builds
and go live automatically once the date passes (a daily cron redeploys).
Preview scheduled content with `SHOW_SCHEDULED_ARTICLES=true corepack pnpm
build`. Note: `/changelog` 500s in the dev server (known bug) — check
changelog work against the production build.

Cross-linking scheduled content is safe: links to not-yet-published pages
render as plain text until they exist (`createMdxAnchor` in
`lib/api/common.tsx`).

## Design conventions

- Copy an existing pillar page (`app/deploy/page.tsx` is the cleanest)
  rather than inventing a new layout. Shared blocks live in `components/`.
- Illustrations are hand-built React components in the page's `features/`
  folder — `Card` + `Badge`/`Chip` + Radix step tokens (`text-(--violet-11)`,
  `bg-(--danger-2)`), `border-[0.5px]` inside illustrations, `text-xxs`/
  `text-xxxs` type, `mask-b-from-70%` bottom fades. No static illustration
  images, no framer-motion (CSS + SVG SMIL only).
- Dark mode is automatic when you use semantic/Radix tokens — avoid `dark:`
  branches except for raster images (`ThemeImage`).
- Entry animation: `animate-slide-up-fade animate-duration-500 fill-mode-both
motion-reduce:animate-fade-in`, staggered with `animate-delay-*`.
- Check every change at mobile (375px) and desktop widths, in light and dark.

## Facts and fact-checking

Never invent product capabilities, limits, or prices. Ground truth:

- Docs: https://argos-ci.com/docs (repo: `argos-ci/docs`)
- App & API: `argos-ci/argos` · CLI & SDKs: `argos-ci/argos-javascript`
- Machine-readable facts (OAuth, MCP, API URLs) are owned by the backend and
  proxied here — `/.well-known/*` redirects and `/auth.md` rewrites to
  app.argos-ci.com. Keep it that way; this repo owns only its own content.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
