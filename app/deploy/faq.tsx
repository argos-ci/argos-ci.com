import { Code } from "@/components/Code";
import type { FAQQuestion } from "@/components/FAQAccordion";
import { Link } from "@/components/Link";

export const DEPLOY_QUESTIONS: FAQQuestion[] = [
  {
    name: "What can I deploy to Argos?",
    answer: (
      <p>
        Any directory of static files. Storybook is the common case (
        <Code>storybook-static</Code>), and a Vite build, a Next.js export, a
        docs site, or plain HTML work the same way:{" "}
        <Code>argos deploy ./dist</Code> uploads the files and serves them on a
        unique URL. There is no server to configure and nothing to host on your
        side.
      </p>
    ),
    textAnswer:
      "Any directory of static files. Storybook is the common case (storybook-static), and a Vite build, a Next.js export, a docs site, or plain HTML work the same way: `argos deploy ./dist` uploads the files and serves them on a unique URL. There is no server to configure and nothing to host on your side.",
  },
  {
    name: "Do preview deployments expire?",
    answer: (
      <p>
        No. A deployment is a permanent, immutable record: it stays reachable at
        its deployment URL for as long as the project exists, and it never
        counts toward your screenshot quota. What moves is the branch URL, which
        follows the latest deployment on that branch, and the production domain,
        which follows the latest promoted build. Individual deployments
        can&apos;t be deleted; removing them all means deleting the project.
      </p>
    ),
    textAnswer:
      "No. A deployment is a permanent, immutable record: it stays reachable at its deployment URL for as long as the project exists, and it never counts toward your screenshot quota. What moves is the branch URL, which follows the latest deployment on that branch, and the production domain, which follows the latest promoted build. Individual deployments can't be deleted; removing them all means deleting the project.",
  },
  {
    name: "Is deploying to Argos free?",
    answer: (
      <p>
        Yes. The Hobby plan includes Storybook and static deployments. The Pro
        plan adds private deployment protection and custom domains. Deployments
        don&apos;t consume screenshots, so they never affect your quota. See{" "}
        <Link href="/pricing">pricing</Link>.
      </p>
    ),
    textAnswer:
      'Yes. The Hobby plan includes Storybook and static deployments. The Pro plan adds private deployment protection and custom domains. Deployments don\'t consume screenshots, so they never affect your quota. See <a href="/pricing">pricing</a>.',
  },
  {
    name: "What is the difference between a preview and a production deployment?",
    answer: (
      <p>
        A preview is the default: it gets its own deployment URL and a branch
        URL, and it never replaces production. A deployment becomes production
        when its branch matches the project&apos;s production branch pattern
        (your repository&apos;s default branch unless you change it in Settings
        → Deployments) or when you pass{" "}
        <Code className="whitespace-nowrap">--prod</Code>. A new production
        deployment is promoted immediately: the production domain, and your
        custom domain, start serving it, while earlier production builds stay
        reachable on their own URLs.
      </p>
    ),
    textAnswer:
      "A preview is the default: it gets its own deployment URL and a branch URL, and it never replaces production. A deployment becomes production when its branch matches the project's production branch pattern (your repository's default branch unless you change it in Settings → Deployments) or when you pass `--prod`. A new production deployment is promoted immediately: the production domain, and your custom domain, start serving it, while earlier production builds stay reachable on their own URLs.",
  },
  {
    name: "Can I serve production from my own domain?",
    answer: (
      <p>
        Yes. Add the domain in Settings → Deployments → Domains, create a{" "}
        <Code>CNAME</Code> record pointing at <Code>cname.argos-ci.live</Code>{" "}
        (a root domain needs an <Code>ALIAS</Code> record instead), and Argos
        issues the TLS certificate once the record resolves. A custom domain
        serves production deployments only; previews keep their{" "}
        <Code>argos-ci.live</Code> URLs. Once it is active, the links Argos
        posts to GitHub use your domain. Custom domains are included in paid
        plans and require a team.
      </p>
    ),
    textAnswer:
      "Yes. Add the domain in Settings → Deployments → Domains, create a CNAME record pointing at cname.argos-ci.live (a root domain needs an ALIAS record instead), and Argos issues the TLS certificate once the record resolves. A custom domain serves production deployments only; previews keep their argos-ci.live URLs. Once it is active, the links Argos posts to GitHub use your domain. Custom domains are included in paid plans and require a team.",
  },
];
