import React from "react";

export function joinObjectValues(obj: Record<string, string[]>) {
  let result: JSX.Element[] = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const values = obj[key];
      values.forEach((value) => {
        result.push(
          <React.Fragment key={`${key}-${value}`}>
            • {value}
            <br />
          </React.Fragment>
        );
      });
    }
  }
  return result;
}
