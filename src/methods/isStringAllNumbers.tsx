function isStringAllNumbers(str: string): boolean {
  return /^[0-9]+$/.test(str) || str === "";
}

function isStringAllCharacters(str: string): boolean {
  return true;
  // return /^[\p{L}\s]+$/.test(str) || str === "";
}

export { isStringAllNumbers, isStringAllCharacters };
