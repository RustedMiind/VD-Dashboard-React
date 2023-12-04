function toValidId(id: string | number): number | null {
  let intId: number;

  switch (typeof id) {
    case "string":
      intId = parseInt(id);
      break;
    case "number":
      intId = id;
      break;
  }
  if (intId && intId > 0) {
    return intId;
  }
  return null;
}

export default toValidId;
