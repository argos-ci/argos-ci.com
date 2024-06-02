"use client";

import * as React from "react";

const SERVER_LOCALE = "en-US";

const IntlNumberFormat = ({
  initialOptions,
  value,
}: {
  initialOptions: Intl.NumberFormatOptions;
  value: number;
}) => {
  const initialOptionsRef = React.useRef(initialOptions);
  const [formatter, setFormatter] = React.useState(
    () => new Intl.NumberFormat(SERVER_LOCALE, initialOptionsRef.current),
  );

  React.useEffect(() => {
    setFormatter(
      () => new Intl.NumberFormat(undefined, initialOptionsRef.current),
    );
  }, []);

  return formatter.format(value);
};

export const LocalDollar = ({ value }: { value: number }) => {
  return (
    <IntlNumberFormat
      value={value}
      initialOptions={{
        style: "currency",
        currency: "USD",
        maximumSignificantDigits: 10,
      }}
    />
  );
};

export const LocalPercentage = ({ value }: { value: number }) => {
  return (
    <IntlNumberFormat
      value={value}
      initialOptions={{
        maximumSignificantDigits: 5,
        style: "percent",
      }}
    />
  );
};

export const LocalString = ({ value }: { value: number }) => {
  return <IntlNumberFormat value={value} initialOptions={{}} />;
};
