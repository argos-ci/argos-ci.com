import { PILLARS, type PillarSlug } from "@/lib/pillars";

import { Container } from "./Container";
import { TEXT_COLORS } from "./feature-section/colors";
import { FeatureGridFeatureSmall } from "./FeatureGrid";
import { PILLAR_ICONS } from "./pillar-icons";
import { SectionHeader, SectionHeaderTexts } from "./SectionHeader";
import { SectionDescription, SectionTitle } from "./Typography";

/**
 * The block a pillar page closes on: the three other pillars, in the site's
 * list order, so every page points at the rest of the platform the same way.
 */
export function PillarLinks(props: {
  /** The current page's pillar, left out of the grid. */
  exclude: PillarSlug;
  title?: React.ReactNode;
  description?: React.ReactNode;
}) {
  const {
    exclude,
    title = "One platform, from pull request to merge",
    description = "Argos follows every pull request through four steps: deploy it, diff what changed, review it together, and stabilize the tests behind it.",
  } = props;
  const pillars = PILLARS.filter((pillar) => pillar.slug !== exclude);
  return (
    <section className="border-b px-4">
      <Container className="border-x">
        <SectionHeader align="center" className="max-w-2xl container-gutter">
          <SectionHeaderTexts>
            <SectionTitle>{title}</SectionTitle>
            <SectionDescription>{description}</SectionDescription>
          </SectionHeaderTexts>
        </SectionHeader>
      </Container>
      <Container
        noGutter
        className="relative grid grid-cols-1 border-x max-md:divide-y md:grid-cols-3 md:divide-x"
      >
        {pillars.map((pillar) => (
          <FeatureGridFeatureSmall
            key={pillar.slug}
            title={pillar.name}
            description={pillar.description}
            href={pillar.href}
            icon={PILLAR_ICONS[pillar.slug]}
            iconClassName={TEXT_COLORS[pillar.color]}
            cta={`Explore ${pillar.name}`}
          />
        ))}
      </Container>
    </section>
  );
}
