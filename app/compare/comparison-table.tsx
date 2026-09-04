import * as React from "react";

import {
  Check,
  THead,
  Table,
  Td,
  Th,
  ThMain,
  ThSub,
  ThSubLink,
  Tr,
  X,
} from "@/components/ComparisonTable";

import {
  ADDITIONAL_FEATURES_AFTER,
  type Comparison,
  FEATURE_DEFINITIONS,
  type FeatureRow,
} from "./features";

function FeatureTd(props: { value: string }) {
  return (
    <Td>
      {props.value === "✔️" ? (
        <Check />
      ) : props.value === "❌" ? (
        <X />
      ) : (
        props.value
      )}
    </Td>
  );
}

function FeatureTr(props: {
  title: string;
  description: string;
  href?: string;
  external?: boolean;
  feature: FeatureRow;
}) {
  return (
    <Tr>
      <Th>
        <ThMain>{props.title}</ThMain>
        {props.href ? (
          <ThSubLink
            href={props.href}
            target={props.external ? "_blank" : undefined}
          >
            {props.description}
          </ThSubLink>
        ) : (
          <ThSub>{props.description}</ThSub>
        )}
      </Th>
      <FeatureTd value={props.feature.argos} />
      <FeatureTd value={props.feature.competitor} />
    </Tr>
  );
}

export function ComparisonTable(props: {
  comparison: Comparison;
  logoSrc: string;
  logoSrcDark?: string;
}) {
  const { comparison } = props;
  return (
    <Table>
      <THead
        title={comparison.name}
        logoSrc={props.logoSrc}
        logoSrcDark={props.logoSrcDark}
      />

      <tbody>
        {FEATURE_DEFINITIONS.map(({ key, ...row }) => {
          const feature = comparison.features[key];
          if (!feature) {
            return null;
          }
          return (
            <React.Fragment key={key}>
              <FeatureTr {...row} feature={feature} />
              {key === ADDITIONAL_FEATURES_AFTER
                ? comparison.additionalFeatures?.map((additional) => (
                    <FeatureTr
                      key={additional.title}
                      title={additional.title}
                      description={additional.description}
                      href={additional.href}
                      feature={additional}
                    />
                  ))
                : null}
            </React.Fragment>
          );
        })}
      </tbody>
    </Table>
  );
}
