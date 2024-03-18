import { Media } from "../Media";

export interface Story {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  end_date: string;
  stories?: StoryBanner[];
  first_gallery_media?: Media;
}

export interface StoryBanner {
  id: number;
  end_date: string;
  service_id?: number;
  category_service_id: number;
  created_at: string;
  updated_at: string;
  first_gallery_media: Media;
}
