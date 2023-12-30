export function toggleItemInArray<T>(arr: T[], item: T): T[] {
  const index = arr.indexOf(item);
  if (index !== -1) {
    // Item exists in the array, remove it
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  } else {
    // Item doesn't exist, include it
    return [...arr, item];
  }
}
