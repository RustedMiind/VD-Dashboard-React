import { Media } from "../Media";

export interface TenderFile {
  id: number; // Change the type according to your ID format (number, string, etc.)
  tender_id: number;
  name: string;
  discription: string | null; // Assuming the description can be a string or null
  card_image: string | null; // Assuming card_image is a string path or null
  created_at: string;
  updated_at: string;
  deleted_at: string | null; // Assuming deleted_at is a string or null
  pictures: string[]; // Assuming pictures is an array of string paths
  media: Media[];
}
