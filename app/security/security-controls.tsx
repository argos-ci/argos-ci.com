import clsx from "clsx";
import "lucide-react";
import { CircleCheck } from "lucide-react";

import { Tooltip } from "../../components/Tooltip";

export type SecurityControlCategory = {
  title: string;
  controls: string[];
};

export const SECURITY_CONTROL_CATEGORIES: SecurityControlCategory[] = [
  {
    title: "Infrastructure Security",
    controls: [
      "CloudTrail with integrity validation enabled",
      "Intrusion detection system active (AWS)",
      "Firewall blocks all traffic by default",
    ],
  },
  {
    title: "Access Management",
    controls: [
      "MFA enforced on GitHub and infrastructure",
      "IAM user keys rotate every 90 days",
      "Access reviews completed regularly",
    ],
  },
  {
    title: "Data Protection",
    controls: [
      "Customer data deleted upon leaving",
      "Data encrypted at rest and in transit",
      "Daily backups performed (Heroku)",
    ],
  },
  {
    title: "Vulnerability Management",
    controls: [
      "Automated vulnerability scans performed",
      "Critical vulnerabilities promptly remediated",
      "Penetration tests conducted regularly",
    ],
  },
  {
    title: "Organizational Policies",
    controls: [
      "Cybersecurity insurance maintained",
      "Disaster recovery plans tested",
      "Asset disposal policies enforced",
    ],
  },
  {
    title: "Development Practices",
    controls: [
      "Branch protection rules enforced",
      "Code reviewed by a different author",
      "Private GitHub repositories",
    ],
  },
];

export const SecurityControls = ({
  categories,
}: {
  categories: SecurityControlCategory[];
}) => {
  const borderClass =
    "border-dashed max-sm:border-r-0 md:border-r md:max-lg:nth-[2n]:border-r-0 lg:nth-[3n]:border-r-0";
  const gridClass =
    "grid w-full grid-cols-1 text-left sm:grid-cols-2 md:max-w-7xl md:flex-row lg:grid-cols-3";
  return (
    <div>
      <div className={clsx(gridClass, "border-dashed md:border-b")}>
        <div className={clsx("hidden h-6 md:block", borderClass)} />
        <div className={clsx("hidden h-6 md:block", borderClass)} />
        <div className={clsx("hidden h-6 lg:block", borderClass)} />
      </div>
      <div className={gridClass}>
        {categories.map((category) => (
          <div
            key={category.title}
            className={clsx(
              "flex flex-col gap-4 p-4 md:p-10",
              "md:border-b",
              borderClass,
            )}
          >
            <h4 className="text-left text-xl">{category.title}</h4>
            <ul className="flex flex-col gap-4">
              {category.controls.map((control) => (
                <li key={control}>
                  <Tooltip content={control}>
                    <div className="flex gap-2">
                      <CircleCheck className="size-5 shrink-0 text-(--violet-8)" />
                      <div className="text-sm">{control}</div>
                    </div>
                  </Tooltip>
                </li>
              ))}
            </ul>
            <p className="text-sm">and more…</p>
          </div>
        ))}
      </div>
      <div className={gridClass}>
        <div className={clsx("hidden h-6 md:block", borderClass)} />
        <div className={clsx("hidden h-6 md:block", borderClass)} />
        <div className={clsx("hidden h-6 lg:block", borderClass)} />
      </div>
    </div>
  );
};
