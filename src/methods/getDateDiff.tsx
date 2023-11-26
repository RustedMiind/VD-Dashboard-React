export function getDateDiff(
  date1: Date | undefined,
  date2: Date | undefined
): number {
  if (date1 instanceof Date && date2 instanceof Date) {
    const diff = Math.abs(date1.getTime() - date2.getTime());
    return diff;
  } else return 0;
}
