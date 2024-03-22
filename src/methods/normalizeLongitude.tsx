export function normalizeLongitude(lon: number): number {
  if (lon < 180 && lon > -180) return lon;
  return (((lon % 360) + 540) % 360) - 180;
}
