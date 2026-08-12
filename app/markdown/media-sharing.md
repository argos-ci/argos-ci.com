# Media Sharing: see what your agents built

> Upload a standalone screenshot or screen recording to Argos from the CLI, SDK, REST API, or MCP and get a share link with ready-to-paste Markdown. Media staged on a branch lands on the pull request automatically, in a single managed comment.

Canonical: https://argos-ci.com/media-sharing
Documentation: https://argos-ci.com/docs/learn/media

**Media sharing** is standalone image and video upload for Argos: no build, no
test run, no baseline, just a file with a stable share URL and Markdown ready
to paste. It
exists because GitHub has no public API for comment attachments: dragging an
image into a pull request needs a signed-in browser session, which an agent or
a CI job does not have. Media sharing is how a process working from a terminal
puts a screenshot or a demo recording in front of a reviewer.

It is not visual testing: nothing is compared to a baseline and nothing gates
a build. It complements
[visual testing](https://argos-ci.com/visual-testing): builds catch the changes
nobody intended, media shows the result someone did intend.

A live example, public and real:
https://github.com/argos-ci/snkr-shop/pull/5 is a pull request whose branch
had two before/after pairs staged; Argos posted them in the single managed
comment when the pull request opened.
https://app.argos-ci.com/m/mp21qmkhpekfx1v4ot7r is the share page for one of
them, opening on the before/after compare view.

## How it works

- A **media** is an identity (what the picture is of), and every upload is a
  **version** of it. Re-uploading the same name adds a version under the same
  media: the share URL never changes, Markdown already pasted in a pull
  request shows the newest upload, and the version a reviewer commented on
  survives in the history. Re-uploading identical bytes adds no version and
  costs nothing.
- Attach media to a **branch** (`--branch`, staged) or a **pull request**
  (`--pr`, published). Staged media is shareable from the moment it is
  registered; when a pull request opens for that branch, Argos publishes
  everything staged there and posts a **single managed comment** listing it,
  edited in place on every change.
- **Before/after pairs**: files named `name-before.png` and `name-after.png`
  (or uploaded with `--state`) share one identity: one comment row, one share
  page comparing both sides with synced pan and zoom.
- **Pinned feedback**: reviewers pin comments to a point on the image. Pins
  store normalized coordinates and the media version they were written on, so
  an agent reads the spot from the CLI, fixes it, replies, and resolves the
  thread.
- The CLI compresses PNG and JPEG to WebP client-side before upload (a 252 KB
  screenshot typically travels at a tenth of the size); `--no-compress` opts
  out. Argos never rewrites the stored file server-side, so a media is usable
  the moment the upload finishes.
- A **video** embeds as a thumbnail linked to the share page, the only form
  GitHub renders. The thumbnail is a poster frame derived from the video itself
  and available immediately.

## Quickstart

```bash
npm i --save-dev @argos-ci/cli
ARGOS_TOKEN=<project-token> npx argos media upload after.png --branch my-branch
```

The command prints the share URL and the exact Markdown to paste. Reading
feedback back:

```bash
argos media list --branch my-branch
argos media comment list <media-id>
argos media comment resolve <media-id> <comment-id>
```

## For agents

- Every media endpoint is an MCP tool on https://mcp.argos-ci.com, under the
  `media:read` and `media:write` OAuth scopes (comments under `comments:read`
  and `comments:write`).
- The `argos-upload` agent skill teaches a coding agent when to attach media,
  how to stage it on the working branch, and how to embed it so it renders.
  Install: `npx skills add https://argos-ci.com`
- REST surface: `POST /media` (+ `/finalize`), `GET/PATCH/DELETE /media/{id}`,
  `GET /media/{id}/versions`, `GET /projects/{owner}/{project}/media`, and the
  full comment surface under `/media/{id}/comments/…`. See
  https://argos-ci.com/docs/api-reference

## Formats, limits, visibility, billing

- Images: PNG, JPEG, WebP, AVIF, GIF. Videos: MP4, WebM, MOV. SVG is refused
  (it can carry scripts). Bytes are verified at finalize.
- Max file size: 50 MB (Hobby), 500 MB (Pro).
- Visibility governs the share page: `team` (Pro default, sign-in with project
  access required) or `public` (anyone with the URL; the only option on Hobby).
  Links carry unguessable tokens and are never indexed. The file bytes
  themselves are always reachable at an unguessable CDN URL whatever the
  visibility, as GitHub's server-side image proxy requires. Don't upload what
  must never be reachable by URL.
- Retention, per version: 30 days (Hobby), 1 year (Pro).
- Billing draws on the existing screenshot allowance: an image is 1 screenshot
  unit, a video is 25. See https://argos-ci.com/pricing

## Learn more

- [Media sharing overview](https://argos-ci.com/docs/learn/media)
- [Upload media from the CLI, SDK, API, or an agent](https://argos-ci.com/docs/learn/media/standalone-media-upload)
- [Share links, retention and limits](https://argos-ci.com/docs/learn/media/share-links-retention-and-limits)
- [Argos for AI agents](https://argos-ci.com/ai-agents)
