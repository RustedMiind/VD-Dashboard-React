import React from "react";

export function joinObjectValues(obj: Record<string, string[]>) {
  console.log(obj);

  let result: JSX.Element[] = [];
  if (typeof obj === "object") {
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
  } else return <React.Fragment>{obj}</React.Fragment>;
  return result;
}
