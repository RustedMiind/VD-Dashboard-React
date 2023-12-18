// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const objectToFormData = (object: any): FormData => {
  const formData = new FormData();

  for (const key in object) {
    if (
      object.hasOwnProperty(key) &&
      object[key] !== null &&
      object[key] !== undefined
    ) {
      formData.append(key, object[key]);
    }
  }

  return formData;
};
