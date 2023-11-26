export function msToHoursMinutes(ms: number): {
  hours: number;
  minutes: number;
} {
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  return { hours, minutes: remainingMinutes };
}
