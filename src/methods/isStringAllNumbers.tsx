function isStringAllNumbers(str: string): boolean {
  return /^[0-9]+$/.test(str) || str === "";
}

export { isStringAllNumbers };
