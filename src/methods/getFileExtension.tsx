export function getFileExtension(file: File): string | undefined {
  const fileName: string = file.name;
  const dotIndex: number = fileName.lastIndexOf(".");

  if (dotIndex !== -1) {
    return fileName.slice(dotIndex + 1).toLowerCase();
  } else {
    return undefined; // No extension found
  }
}
