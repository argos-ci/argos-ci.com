"use client";

import * as React from "react";

const SERVER_LOCALE = "en-US";

export function IntlNumberFormat(props: {
  initialOptions: Intl.NumberFormatOptions;
  value: number;
}) {
  const initialOptionsRef = React.useRef(props.initialOptions);
  const formatterRef = React.useRef(
    new Intl.NumberFormat(undefined, initialOptionsRef.current),
  );
  const [value, setValue] = React.useState(() =>
    new Intl.NumberFormat(SERVER_LOCALE, initialOptionsRef.current).format(
      props.value,
    ),
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
