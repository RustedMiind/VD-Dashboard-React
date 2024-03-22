import axios from "axios";
import { serialize } from "object-to-formdata";

export async function uploadFileInChunks(
  file: File | undefined,
  chunkSize: number,
  url: string,
  object?: Record<string, unknown>
): Promise<void> {
  if (!file) {
    try {
      const response = await axios.post(url, object);
    } catch (error) {
      console.error("Error:", error);
      return; // Stop uploading if an error occurs
    }
    return;
  }
  let start = 0;
  let end = Math.min(chunkSize, file.size);
  let chunkNumber = 1;
  const totalChunks = Math.ceil(file.size / chunkSize).toString();
  while (start < file.size) {
    const chunk = file.slice(start, end);

    console.log("Chunk", chunkNumber, totalChunks);
    let data: Record<string, unknown> = {};
    if (chunkNumber === parseInt(totalChunks)) {
      data = { ...object };
      data.fileName = file.name;
      data.fileType = file.type;
    }

    data.chunk = chunk;
    data.chunkNumber = chunkNumber.toString();
    data.totalChunks = totalChunks;

    try {
      const response = await axios.post(url, serialize(data));

      start = end;
      end = Math.min(start + chunkSize, file.size);
      chunkNumber++;
    } catch (error) {
      console.error("Error:", error);
      return; // Stop uploading if an error occurs
    }
  }

  console.log("File upload completed");
}
