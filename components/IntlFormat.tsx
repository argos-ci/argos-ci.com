"use client";

import * as React from "react";

const SERVER_LOCALE = "en-US";

function IntlNumberFormat(props: {
  initialOptions: Intl.NumberFormatOptions;
  value: number;
}) {
  const [initialOptions] = React.useState(props.initialOptions);
  const formatterRef = React.useRef(
    new Intl.NumberFormat(undefined, initialOptions),
  );
  const [value, setValue] = React.useState(() =>
    new Intl.NumberFormat(SERVER_LOCALE, initialOptions).format(props.value),
  );

  React.useEffect(() => {
    setValue(formatterRef.current.format(props.value));
  }, [props.value]);

  return value;
}

export function LocalDollar(props: { value: number }) {
  return (
    <IntlNumberFormat
      value={props.value}
      initialOptions={{
        style: "currency",
        currency: "USD",
        maximumSignificantDigits: 10,
      }}
    />
  );
}

export function LocalPercentage(props: { value: number }) {
  return (
    <IntlNumberFormat
      value={props.value}
      initialOptions={{
        maximumSignificantDigits: 5,
        style: "percent",
      }}
    />
  );
}

export function LocalString(props: { value: number }) {
  return <IntlNumberFormat value={props.value} initialOptions={{}} />;
}
