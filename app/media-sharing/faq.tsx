import { FAQQuestion } from "@/components/FAQAccordion";
import { Link } from "@/components/Link";

export const MEDIA_SHARING_QUESTIONS: FAQQuestion[] = [
  {
    name: "How do AI agents attach screenshots to a GitHub pull request?",
    answer: (
      <>
        <p>
          GitHub has no public API for comment attachments — dragging an image
          into a pull request needs a signed-in browser session, which an agent
          or a CI job doesn&apos;t have. With Argos,{" "}
          <code>argos media upload --branch</code> stages the file from the
          terminal, and when a pull request opens for that branch, Argos posts
          it there in a managed comment, automatically.
        </p>
        <p>
          For an issue or a chat message, paste the Markdown line the command
          prints — it embeds the image anywhere Markdown renders.
        </p>
      </>
    ),
    textAnswer:
      "GitHub has no public API for comment attachments — dragging an image into a pull request needs a signed-in browser session, which an agent or a CI job doesn't have. With Argos, `argos media upload --branch` stages the file from the terminal, and when a pull request opens for that branch, Argos posts it there in a managed comment, automatically. For an issue or a chat message, paste the Markdown line the command prints.",
  },
  {
    name: "Is media sharing the same as visual testing?",
    answer: (
      <>
        <p>
          No. A media upload is compared to no baseline and gates no build — it
          is a file with a stable link. It complements{" "}
          <Link href="/visual-testing">visual testing</Link>: builds catch the
          changes nobody intended, media shows the result someone did intend,
          and both land on the same pull request.
        </p>
      </>
    ),
    textAnswer:
      "No. A media upload is compared to no baseline and gates no build — it is a file with a stable link. It complements Argos visual testing: builds catch the changes nobody intended, media shows the result someone did intend, and both land on the same pull request.",
  },
  {
    name: "What file formats and sizes does Argos media support?",
    answer: (
      <>
        <p>
          Images: PNG, JPEG, WebP, AVIF, and GIF. Videos: MP4, WebM, and MOV.
          SVG is deliberately excluded because it can carry scripts. A single
          file can be up to 50 MB on Hobby and 500 MB on Pro, and Argos verifies
          the actual bytes at upload — a file that isn&apos;t what it claims to
          be is rejected.
        </p>
      </>
    ),
    textAnswer:
      "Images: PNG, JPEG, WebP, AVIF, and GIF. Videos: MP4, WebM, and MOV. SVG is deliberately excluded because it can carry scripts. A single file can be up to 50 MB on Hobby and 500 MB on Pro, and Argos verifies the actual bytes at upload — a file that isn't what it claims to be is rejected.",
  },
  {
    name: "How much does a media upload cost?",
    answer: (
      <>
        <p>
          Uploads draw on the screenshot allowance you already have — no second
          quota. An image counts as 1 screenshot unit, a video as 25.
          Re-uploading a file whose bytes haven&apos;t changed costs nothing,
          and the usage detail breaks media out so recordings never read as
          unexplained screenshots. See <Link href="/pricing">pricing</Link>.
        </p>
      </>
    ),
    textAnswer:
      "Uploads draw on the screenshot allowance you already have — no second quota. An image counts as 1 screenshot unit, a video as 25. Re-uploading a file whose bytes haven't changed costs nothing, and the usage detail breaks media out so recordings never read as unexplained screenshots.",
  },
  {
    name: "Who can open a media share link?",
    answer: (
      <>
        <p>
          Visibility is per media: <strong>team</strong> (anyone signed in with
          access to the project — the default on Pro) or <strong>public</strong>{" "}
          (anyone holding the URL — the only option on Hobby). Links carry an
          unguessable token and share pages are never indexed. The file&apos;s
          bytes are always reachable at an unguessable CDN URL whatever the
          visibility — that is what lets GitHub&apos;s server-side image proxy
          render the embed — so don&apos;t upload what must never be reachable
          by URL.
        </p>
      </>
    ),
    textAnswer:
      "Visibility is per media: team (anyone signed in with access to the project — the default on Pro) or public (anyone holding the URL — the only option on Hobby). Links carry an unguessable token and share pages are never indexed. The file's bytes are always reachable at an unguessable CDN URL whatever the visibility — that is what lets GitHub's server-side image proxy render the embed — so don't upload what must never be reachable by URL.",
  },
  {
    name: "How does an agent read the feedback left on a screenshot?",
    answer: (
      <>
        <p>
          A reviewer pins a comment to a point on the image, and the pin is
          stored as normalized coordinates with the exact version it was written
          on. The agent runs <code>argos media list --branch</code> to find its
          uploads, <code>argos media comment list</code> to read the open
          threads, then replies and resolves each one from the same CLI —
          feedback a process that cannot see pixels can still act on.
        </p>
      </>
    ),
    textAnswer:
      "A reviewer pins a comment to a point on the image, and the pin is stored as normalized coordinates with the exact version it was written on. The agent runs `argos media list --branch` to find its uploads, `argos media comment list` to read the open threads, then replies and resolves each one from the same CLI — feedback a process that cannot see pixels can still act on.",
  },
];
