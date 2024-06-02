export const dollarFormatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
  maximumSignificantDigits: 10,
});

export const percentFormatter = new Intl.NumberFormat(undefined, {
  maximumSignificantDigits: 5,
  style: 'percent'
});