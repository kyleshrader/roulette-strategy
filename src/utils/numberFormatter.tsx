const NUMBER_FORMATTER = new Intl.NumberFormat("en-US", {
  maximumSignificantDigits: 4,
});

export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number);
}
