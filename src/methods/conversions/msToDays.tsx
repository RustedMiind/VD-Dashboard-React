export function convertMsToDays(
  milliseconds: number,
  decimalPlaces: number = 0
): number {
  const millisecondsInDay: number = 1000 * 60 * 60 * 24;
  const days: number = milliseconds / millisecondsInDay;
  return +days.toFixed(decimalPlaces);
}
