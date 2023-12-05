function stringOrNumbertoNumber(number: number | string): number | null {
  let converted: number;

  switch (typeof number) {
    case "number":
      converted = number;
      break;
    case "string":
      converted = parseInt(number);
      break;
  }

  return converted || null;
}

export default stringOrNumbertoNumber;
