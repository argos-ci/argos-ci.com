import { FAQAccordion, FAQQuestion } from "@/components/FAQAccordion";
import { LocalString } from "@/components/IntlFormat";
import { Link } from "@/components/Link";
import { ARGOS_HOBBY_SCREENSHOT_COUNT } from "@/lib/constants";

const questions: FAQQuestion[] = [
  {
    name: "Which Argos plan is right for me?",
    answer: (
      <>
        The Hobby plan is designed for personal GitHub repositories, providing
        up to <LocalString value={ARGOS_HOBBY_SCREENSHOT_COUNT} /> screenshots.
        If you're seeking to collaborate as a team, need a higher screenshot
        limit, or wish to use Argos on a repository within a private GitHub
        organization, our Pro plan is the necessary choice.
      </>
    ),
    textAnswer: `The Hobby plan is designed for personal GitHub repositories, providing up to ${ARGOS_HOBBY_SCREENSHOT_COUNT} screenshots. If you're seeking to collaborate as a team, need a higher screenshot limit, or wish to use Argos on a repository within a private GitHub organization, our Pro plan is the necessary choice.`,
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
        Usage is calculated based on the number of screenshots uploaded during
        successful builds. Screenshots uploaded during failed builds are not
        counted towards your usage.
      </>
    ),
    textAnswer:
      "Usage is calculated based on the number of screenshots uploaded during successful builds. Screenshots uploaded during failed builds are not counted towards your usage.",
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
  return <FAQAccordion questions={questions} />;
}
