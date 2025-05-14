import { FAQQuestion } from "../../components/FAQAccordion";

export const SECURITY_QUESTIONS: FAQQuestion[] = [
  {
    name: "Are my builds and screenshots publicly visible?",
    answer: (
      <>
        <p>
          Open source projects on Argos are public by default, meaning their
          builds and screenshots are visible to anyone.
        </p>
        <p>
          For private projects, all builds and screenshots are accessible only
          to authorized users within your organization. All data is secured and
          access-controlled.
        </p>
      </>
    ),
    textAnswer:
      "Open source projects on Argos are public by default, meaning their builds and screenshots are visible to anyone. Private projects are accessible only to authorized users within your organization. All data is secured and access-controlled.",
  },
  {
    name: "How secure is Argos?",
    answer: (
      <>
        <p>
          Yes. Argos is <strong>SOC 2 Type II compliant</strong>, fully{" "}
          <strong>open source</strong>, and trusted by security-conscious
          companies, including cybersecurity firms and banks.
        </p>
        <p>
          Our commitment to transparency, security best practices, and rigorous
          operational controls makes Argos a reliable platform for safeguarding
          your visual testing data.
        </p>
      </>
    ),
    textAnswer:
      "Yes. Argos is SOC 2 Type II compliant, fully open source, and trusted by security-conscious companies, including cybersecurity firms and banks. We follow strong security practices and operate with full transparency.",
  },
  {
    name: "Where are screenshots stored?",
    answer: (
      <p>
        Screenshots are securely stored on AWS S3 in the United States. All data
        is encrypted at rest and in transit using modern encryption protocols.
      </p>
    ),
    textAnswer:
      "Screenshots are securely stored on AWS S3 in the United States. All data is encrypted at rest and in transit using modern encryption protocols.",
  },
  {
    name: "Can Argos access my builds?",
    answer: (
      <p>
        Only authorized Argos engineers can access builds for support or
        debugging purposes. Access is strictly role-based, logged, and
        monitored.
      </p>
    ),
    textAnswer:
      "Only authorized Argos engineers can access builds for support or debugging purposes. Access is strictly role-based, logged, and monitored.",
  },
  {
    name: "Is Argos open source?",
    answer: (
      <p>
        Yes. Argos is fully open source. You can audit our codebase at{" "}
        <a
          href="https://github.com/argos-ci"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-low underline"
        >
          github.com/argos-ci
        </a>
        .
      </p>
    ),
    textAnswer:
      "Yes. Argos is fully open source. You can audit our codebase at github.com/argos-ci.",
  },
  {
    name: "What data does Argos collect?",
    answer: (
      <>
        <p>
          Argos only processes the data necessary for visual testing. This
          includes:
        </p>
        <ul className="list-inside list-disc">
          <li>Screenshots you explicitly upload</li>
          <li>Commit metadata (e.g. SHA, branch name)</li>
          <li>Pull request information (if available)</li>
        </ul>
        <p>
          Argos does not collect analytics, behavioral data, or your source
          code.
        </p>
      </>
    ),
    textAnswer:
      "Argos collects only the data required for visual testing: screenshots you upload, commit metadata, and pull request information. It does not collect analytics, behavioral data, or source code.",
  },
  {
    name: "Can I delete my data from Argos?",
    answer: (
      <p>
        Yes. You can delete builds, screenshots, or entire projects at any time
        from the Argos dashboard. If you need to enforce full deletion for
        compliance purposes, you can contact our support team for assistance.
      </p>
    ),
    textAnswer:
      "Yes. You can delete builds, screenshots, or projects at any time from the Argos dashboard, or contact support for full data removal.",
  },
];
