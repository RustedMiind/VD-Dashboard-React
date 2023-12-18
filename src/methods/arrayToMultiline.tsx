export function ArrayToMultiline(
  strings: string[] | undefined,
  options?: Partial<OptionsType>
): string {
  if (strings) {
    const bulletPoints = strings
      .map(
        (str) =>
          `${
            !options?.disableBullets ? options?.bulletsString || "•" : ""
          } ${str}`
      )
      .join("\n");
    return bulletPoints;
  }
  return "";
}

type OptionsType = {
  disableBullets: boolean;
  bulletsString: string;
};
