import { Lock, LucideIcon, ShieldCheck, Target } from "lucide-react";

export type GdprFeature = {
  title: string;
  icon: LucideIcon;
  description: string;
};

export const GDPR_FEATURES: GdprFeature[] = [
  {
    title: "Data Encryption",
    icon: ShieldCheck,
    description:
      "All datastores are encrypted at rest. Sensitive information is encrypted at the application level.",
  },
  {
    title: "Access Control",
    icon: Lock,
    description:
      "We implement strict access controls to ensure that only authorized personnel can access sensitive data.",
  },
  {
    title: "Data Minimization",
    icon: Target,
    description:
      "We only collect and process the minimum amount of personal data necessary for our services.",
  },
];

export const GDPRFeatures = ({ features }: { features: GdprFeature[] }) => {
  return (
    <div className="container-gutter grid grid-cols-1 justify-center gap-12 text-left md:grid-cols-3">
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <div
            key={feature.title}
            className="flex flex-1 flex-col items-center gap-3 text-center md:items-start md:gap-2 md:text-left"
          >
            <Icon
              strokeWidth={1}
              className="side-4 shrink-0 text-(--primary-11)"
            />
            <div className="text-xl">{feature.title}</div>
            <p>{feature.description}</p>
          </div>
        );
      })}
    </div>
  );
};
