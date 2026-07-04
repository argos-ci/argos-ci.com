import {
  DatabaseIcon,
  EyeOffIcon,
  KeyRoundIcon,
  LockIcon,
  ScanEyeIcon,
  ShieldCheckIcon,
  type LucideIcon,
} from "lucide-react";

export type SecurityHighlight = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const SECURITY_HIGHLIGHTS: SecurityHighlight[] = [
  {
    icon: ScanEyeIcon,
    title: "Open source, auditable",
    description:
      "Every line of the platform and the SDKs is public. Read the code, verify our claims, and send a PR.",
  },
  {
    icon: KeyRoundIcon,
    title: "Encrypted access tokens",
    description:
      "Your GitHub and GitLab access tokens are encrypted at rest, never stored in plain text.",
  },
  {
    icon: DatabaseIcon,
    title: "Screenshots on secure S3",
    description:
      "Stored on AWS S3 in the US, encrypted at rest and in transit with modern protocols.",
  },
  {
    icon: ShieldCheckIcon,
    title: "SOC 2 Type II",
    description:
      "Independently audited controls across infrastructure, access management, and data protection.",
  },
  {
    icon: EyeOffIcon,
    title: "No source code access",
    description:
      "Argos never needs your source. An optional GitHub mode works without any content permission.",
  },
  {
    icon: LockIcon,
    title: "Least-privilege access",
    description:
      "Access to your data is role-based, logged, and monitored, and deleted when you leave.",
  },
];

export function SecurityHighlights(props: { highlights: SecurityHighlight[] }) {
  const { highlights } = props;
  return (
    <div className="-mb-px grid w-full grid-cols-1 border-t text-left sm:grid-cols-2 lg:grid-cols-3">
      {highlights.map((highlight) => {
        const Icon = highlight.icon;
        return (
          <div
            key={highlight.title}
            className="flex flex-col gap-3 border-b border-r p-6 max-sm:border-r-0 sm:max-lg:nth-[2n]:border-r-0 md:p-10 lg:nth-[3n]:border-r-0"
          >
            <div className="bg-app flex size-10 items-center justify-center rounded-lg border">
              <Icon className="size-5 text-(--violet-9)" strokeWidth={1.5} />
            </div>
            <h4 className="text-lg font-medium">{highlight.title}</h4>
            <p className="text-low text-sm leading-relaxed">
              {highlight.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
