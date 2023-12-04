import { conversions } from ".";

function idOrNullToInt(id: string | number | null): number {
  if (!id) return -1;

  const intId = conversions.stringOrNumbertoNumber(id);

  return intId || -1;
}

export default idOrNullToInt;
