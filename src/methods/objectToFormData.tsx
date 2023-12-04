// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const objectToFormData = (object: any): FormData => {
  const formData = new FormData();

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      formData.append(key, object[key]);
    }
  }
  console.log(object);

  return formData;
};
