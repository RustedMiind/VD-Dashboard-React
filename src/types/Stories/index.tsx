import { Media } from "../Media";

export interface Story {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  end_date: string;
  first_gallery_media?: Media;
}
