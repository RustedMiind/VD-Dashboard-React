export function getDateDiffNegativeAllowed(
  date1: Date | undefined,
  date2: Date | undefined
) {
  if (date1 instanceof Date && date2 instanceof Date) {
    const diff = date1.getTime() - date2.getTime();
    return diff;
  } else return 0;
}

export function getDateDiff(
  date1: Date | undefined,
  date2: Date | undefined
): number {
  return Math.abs(getDateDiffNegativeAllowed(date1, date2));
}
