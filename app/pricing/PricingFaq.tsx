import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import { Link } from "@/components/Link";

export const FAQ = ({
  hobbyPlanScreenshotCount,
}: {
  hobbyPlanScreenshotCount: number;
}) => (
  <Accordion type="single" collapsible className="w-full max-w-2xl text-left">
    <AccordionItem value="apart">
      <AccordionTrigger>
        What sets Argos apart from other visual testing tools?
      </AccordionTrigger>
      <AccordionContent>
        Argos focuses on providing a user-friendly experience with simplicity at
        its core. Currently, our unique features include managing flaky tests,
        and we are working on offering zero-configuration visual testing.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="argos-plan">
      <AccordionTrigger>Which Argos plan is right for me?</AccordionTrigger>
      <AccordionContent>
        The Hobby plan is designed for personal GitHub repositories, providing
        up to {hobbyPlanScreenshotCount.toLocaleString()} screenshots. If you're
        seeking to collaborate as a team, need a higher screenshot limit, or
        wish to use Argos on a repository within a private GitHub organization,
        our Pro plan is the necessary choice.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="mobile-testing">
      <AccordionTrigger>
        Can Argos be used for mobile app testing?
      </AccordionTrigger>
      <AccordionContent>
        Yes, Argos can be used for mobile app testing. As long as you can send
        screenshots to Argos, it can be used to test your app.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="private">
      <AccordionTrigger>Are my screenshots private?</AccordionTrigger>
      <AccordionContent>
        Screenshots for open-source projects are public, while those for private
        repositories are restricted to team members. With the Pro plan, you can
        choose to restrict access to public repository screenshots to your team
        only.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="usage">
      <AccordionTrigger>How does Argos determine usage?</AccordionTrigger>
      <AccordionContent>
        Usage is calculated based on the number of screenshots uploaded during
        successful builds. Screenshots uploaded during failed builds are not
        counted towards your usage.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="limit">
      <AccordionTrigger>
        What happens if I exceed the plan's screenshot limit?
      </AccordionTrigger>
      <AccordionContent>
        <ul className="list-inside list-disc">
          <li>
            <span className="font-semibold">Regular plans: </span> you will not
            be able to upload any additional screenshots until your billing
            period renews.
          </li>
          <li>
            <span className="font-semibold">Usage-based plans:</span> you will
            be charged for every additional screenshot.
          </li>
        </ul>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="feedback">
      <AccordionTrigger>
        How can I get support or provide feedback and feature requests?
      </AccordionTrigger>
      <AccordionContent>
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
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
