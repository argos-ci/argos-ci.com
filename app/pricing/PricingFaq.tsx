import { FAQAccordion, FAQQuestion } from "@/components/FAQAccordion";
import { LocalString } from "@/components/IntlFormat";
import { Link } from "@/components/Link";
import { ARGOS_HOBBY_SCREENSHOT_COUNT } from "@/lib/constants";

export const PRICING_QUESTIONS: FAQQuestion[] = [
  {
    name: "Which Argos plan is right for me?",
    answer: (
      <>
        The Hobby plan is free for an individual developer, with up to{" "}
        <LocalString value={ARGOS_HOBBY_SCREENSHOT_COUNT} /> screenshots a
        month. It works with any repository, including private repositories
        owned by an organization, and you can use it for commercial work. Choose
        Pro when several people need to review and approve builds as a team, or
        when you need more screenshots: Hobby uploads pause at the limit, while
        Pro bills extra screenshots.
      </>
    ),
    textAnswer: `The Hobby plan is free for an individual developer, with up to ${ARGOS_HOBBY_SCREENSHOT_COUNT.toLocaleString("en-US")} screenshots a month. It works with any repository, including private repositories owned by an organization, and you can use it for commercial work. Choose Pro when several people need to review and approve builds as a team, or when you need more screenshots: Hobby uploads pause at the limit, while Pro bills extra screenshots.`,
  },
  {
    name: "Can I use the Hobby plan for commercial work or private repositories?",
    answer: (
      <>
        Yes. The Hobby plan allows commercial use, and it works with private
        repositories, including repositories owned by a GitHub organization.
        What separates Hobby from Pro is the hard limit of{" "}
        <LocalString value={ARGOS_HOBBY_SCREENSHOT_COUNT} /> screenshots a month
        and team collaboration: a Hobby account belongs to one person, so builds
        can&apos;t be reviewed and approved by several team members.
      </>
    ),
    textAnswer: `Yes. The Hobby plan allows commercial use, and it works with private repositories, including repositories owned by a GitHub organization. What separates Hobby from Pro is the hard limit of ${ARGOS_HOBBY_SCREENSHOT_COUNT.toLocaleString("en-US")} screenshots a month and team collaboration: a Hobby account belongs to one person, so builds can't be reviewed and approved by several team members.`,
  },
  {
    name: "Does Argos only test screenshots?",
    answer: (
      <>
        No. Beyond images, Argos does snapshot testing for any file: Markdown,
        JSON, HTML, and more — every capture, image or not, counts as one
        screenshot for billing. Argos also stores standalone{" "}
        <Link href="/media-sharing">media uploads</Link> (screenshots and
        recordings shared by link, outside any build): an uploaded image counts
        as 1 screenshot, an uploaded video as 25.
      </>
    ),
    textAnswer:
      "No. Beyond images, Argos does snapshot testing for any file: Markdown, JSON, HTML, and more — every capture, image or not, counts as one screenshot for billing. Argos also stores standalone media uploads (screenshots and recordings shared by link, outside any build): an uploaded image counts as 1 screenshot, an uploaded video as 25.",
  },
  {
    name: "Can AI agents use Argos?",
    answer: (
      <>
        Yes. Argos is 100% agent-ready. Agents inspect builds, read
        machine-readable diffs, and submit reviews from the CLI and REST API, so
        they can see what changed and fix their own mistakes before you merge.
        With <Link href="/media-sharing">media sharing</Link>, they also attach
        screenshots and recordings to pull requests. There is no separate charge
        for agent usage.
      </>
    ),
    textAnswer:
      "Yes. Argos is 100% agent-ready. Agents inspect builds, read machine-readable diffs, and submit reviews from the CLI and REST API, so they can see what changed and fix their own mistakes before you merge. With media sharing, they also attach screenshots and recordings to pull requests. There is no separate charge for agent usage.",
  },
  {
    name: "Can Argos be used for mobile app testing?",
    answer: (
      <>
        Yes, Argos can be used for mobile app testing. As long as you can send
        screenshots to Argos, it can be used to test your app.
      </>
    ),
    textAnswer:
      "Yes, Argos can be used for mobile app testing. As long as you can send screenshots to Argos, it can be used to test your app.",
  },
  {
    name: "Are my screenshots private?",
    answer: (
      <>
        Screenshots for open-source projects are public, while those for private
        repositories are restricted to team members. With the Pro plan, you can
        choose to restrict access to public repository screenshots to your team
        only.
      </>
    ),
    textAnswer:
      "Screenshots for open-source projects are public, while those for private repositories are restricted to team members. With the Pro plan, you can choose to restrict access to public repository screenshots to your team only.",
  },
  {
    name: "How does Argos determine usage?",
    answer: (
      <>
        Usage is the number of screenshots your builds upload. A build counts
        once its upload completes, including when its tests failed or its
        comparison errored. A build that never finishes uploading counts
        nothing.
      </>
    ),
    textAnswer:
      "Usage is the number of screenshots your builds upload. A build counts once its upload completes, including when its tests failed or its comparison errored. A build that never finishes uploading counts nothing.",
  },
  {
    name: "What happens if I exceed the plan's screenshot limit?",
    answer: (
      <ul className="list-inside list-disc">
        <li>
          <strong>Regular plans:</strong> you will not be able to upload any
          additional screenshots until your billing period renews.
        </li>
        <li>
          <strong>Usage-based plans:</strong> you will be charged for every
          additional screenshot.
        </li>
      </ul>
    ),
    textAnswer:
      "Regular plans: you will not be able to upload any additional screenshots until your billing period renews. Usage-based plans: you will be charged for every additional screenshot.",
  },
  {
    name: "How can I get support or provide feedback and feature requests?",
    answer: (
      <>
        For all plans, you can reach out to our customer support and provide
        feedback or request new features through our{" "}
        <Link href="https://argos-ci.com/discord" className="text-primary-300">
          Argos Discord channel
        </Link>
        . Additionally, you can submit feature requests and feedback by{" "}
        <Link
          href="https://github.com/argos-ci/argos/issues"
          className="text-primary-300"
        >
          creating a GitHub issue
        </Link>
        .
      </>
    ),
    textAnswer: `For all plans, you can reach out to our customer support and provide feedback or request new features through our <a href="https://argos-ci.com/discord">Argos Discord channel</a>. Additionally, you can submit feature requests and feedback by <a href="https://github.com/argos-ci/argos/issues">creating a GitHub issue</a>.`,
  },
];

export function FAQ() {
  return <FAQAccordion questions={PRICING_QUESTIONS} />;
}
