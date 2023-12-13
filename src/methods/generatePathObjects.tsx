export interface PathObject {
  name: string;
  path: string;
}

export function generatePathObjects(pathname: string): PathObject[] {
  const paths = pathname.split("/").filter(Boolean);
  const pathObjects: PathObject[] = [];

  let currentPath = "";
  paths.forEach((path, index) => {
    currentPath += `/${path}`;
    pathObjects.push({ name: path, path: currentPath });
  });

  return pathObjects;
}

export interface Translation {
  path: string;
  ar: string;
}

export function translatePathObjects(
  translations: Translation[],
  pathObjects: PathObject[]
): PathObject[] {
  return pathObjects.filter((pathObj) => {
    const translation = translations.find(
      (trans) => trans.path === pathObj.name
    );
    if (translation) {
      pathObj.name = translation.ar;
      return true;
    }
    return false;
  });
}
